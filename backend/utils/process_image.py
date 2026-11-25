import os, sys, math
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
import rembg

TEMPLATE_W = 800
TEMPLATE_H = 950
ref_w, ref_h = 309, 359
sx = TEMPLATE_W / ref_w
sy = TEMPLATE_H / ref_h

bx0 = int(7 * sx) # 18
by0 = int(7 * sy) # 18
bx1 = int(299 * sx) # 774
by1 = int(354 * sy) # 936
FRAME_RECT = [bx0, by0, bx1, by1]

FRAME_RADIUS = int(24 * sx) # 62
BORDER_WIDTH = max(2, int(2.2 * sx)) # 6
BORDER_COLOR = (88, 38, 120, 255) # Ref [83, 40, 112]

FRAME_W = bx1 - bx0
FRAME_H = by1 - by0

_cached_template = None
_cached_session = None

def get_template():
    """Generates and returns the exact reference template (800x950 RGBA)."""
    global _cached_template
    if _cached_template is not None:
        return _cached_template.copy()
        
    im = Image.new('RGBA', (TEMPLATE_W, TEMPLATE_H), (255, 255, 255, 255))
    inner = Image.new('RGBA', (TEMPLATE_W, TEMPLATE_H), (0, 0, 0, 0))

    # 1. Base Lavender Gradient
    inner_arr = np.zeros((TEMPLATE_H, TEMPLATE_W, 4), dtype=np.uint8)
    for y in range(TEMPLATE_H):
        t = y / TEMPLATE_H
        r = int(224 * (1 - t) + 208 * t)
        g = int(204 * (1 - t) + 185 * t)
        b = int(242 * (1 - t) + 234 * t)
        inner_arr[y, :, 0] = r
        inner_arr[y, :, 1] = g
        inner_arr[y, :, 2] = b
        inner_arr[y, :, 3] = 255
    inner = Image.fromarray(inner_arr, 'RGBA')

    # 2. Diagonal radiating curved lines
    lines_layer = Image.new('RGBA', (TEMPLATE_W, TEMPLATE_H), (0, 0, 0, 0))
    d_lines = ImageDraw.Draw(lines_layer)
    cx = int(-50 * sx)
    cy = int(-30 * sy)
    for r in range(int(100 * sx), int(420 * sx), int(8 * sx)):
        bbox = [cx - r, cy - r, cx + r, cy + r]
        d_lines.arc(bbox, start=290, end=380, fill=(245, 235, 252, 150), width=int(1.8 * sx))
    lines_layer = lines_layer.filter(ImageFilter.GaussianBlur(1.0))
    inner = Image.alpha_composite(inner, lines_layer)

    # 3. Wave 1: Right Upper Wave (Soft Lavender Wave)
    wave1 = Image.new('RGBA', (TEMPLATE_W, TEMPLATE_H), (0, 0, 0, 0))
    d_w1 = ImageDraw.Draw(wave1)
    pts1 = [(bx0, TEMPLATE_H)]
    for x in range(bx0, bx1 + 1):
        nx = (x - bx0) / (bx1 - bx0)
        ny = 0.82 - 0.46 * (nx ** 1.35)
        pts1.append((x, int(ny * TEMPLATE_H)))
    pts1.append((bx1, TEMPLATE_H))
    d_w1.polygon(pts1, fill=(202, 168, 226, 255))
    inner = Image.alpha_composite(inner, wave1)

    # 4. Wave 2: Right Mid Wave (Vibrant Purple Arc)
    wave2 = Image.new('RGBA', (TEMPLATE_W, TEMPLATE_H), (0, 0, 0, 0))
    d_w2 = ImageDraw.Draw(wave2)
    pts2 = [(bx0, TEMPLATE_H)]
    for x in range(bx0, bx1 + 1):
        nx = (x - bx0) / (bx1 - bx0)
        ny = 0.88 - 0.41 * (nx ** 1.8)
        pts2.append((x, int(ny * TEMPLATE_H)))
    pts2.append((bx1, TEMPLATE_H))
    d_w2.polygon(pts2, fill=(166, 112, 202, 255))
    inner = Image.alpha_composite(inner, wave2)

    # 5. Wave 3: Bottom-Left Deep Purple Wave
    wave3 = Image.new('RGBA', (TEMPLATE_W, TEMPLATE_H), (0, 0, 0, 0))
    d_w3 = ImageDraw.Draw(wave3)
    pts3 = [(bx0, TEMPLATE_H)]
    for x in range(bx0, bx1 + 1):
        nx = (x - bx0) / (bx1 - bx0)
        ny = 0.70 + 0.26 * math.sin(nx * 1.5)
        pts3.append((x, int(ny * TEMPLATE_H)))
    pts3.append((bx1, TEMPLATE_H))
    d_w3.polygon(pts3, fill=(128, 66, 166, 255))
    inner = Image.alpha_composite(inner, wave3)

    # 6. Inner White Margin
    margin_px = int(2.5 * sx)
    inner_rect = [bx0 + margin_px, by0 + margin_px, bx1 - margin_px, by1 - margin_px]
    inner_radius = FRAME_RADIUS - margin_px

    inner_mask = Image.new('L', (TEMPLATE_W, TEMPLATE_H), 0)
    d_imask = ImageDraw.Draw(inner_mask)
    d_imask.rounded_rectangle(inner_rect, radius=inner_radius, fill=255)

    composite_bg = Image.composite(inner, im, inner_mask)

    # 7. Draw outer purple border
    d_final = ImageDraw.Draw(composite_bg)
    d_final.rounded_rectangle(FRAME_RECT, radius=FRAME_RADIUS, outline=BORDER_COLOR, width=BORDER_WIDTH)

    _cached_template = composite_bg
    return _cached_template.copy()

def remove_background(img_pil):
    """Cleanly removes original background using rembg neural network."""
    global _cached_session
    if _cached_session is None:
        _cached_session = rembg.new_session('u2net')
    return rembg.remove(img_pil, session=_cached_session)

def process_woman_image(input_img, target_height_ratio=0.88):
    """
    Takes an input image (PIL Image or file path), removes background,
    and composites onto the exact reference background template.
    Returns RGB PIL Image ready for saving.
    """
    if isinstance(input_img, str):
        img = Image.open(input_img).convert('RGB')
    else:
        img = input_img.convert('RGB')
        
    # 1. AI Background Removal
    cutout = remove_background(img)
    
    # 2. Extract bounding box of person
    arr = np.array(cutout)
    alpha = arr[:, :, 3]
    y_idx, x_idx = np.where(alpha > 12)
    
    if len(y_idx) == 0 or len(x_idx) == 0:
        cropped_cutout = cutout
    else:
        cropped_cutout = cutout.crop((x_idx.min(), y_idx.min(), x_idx.max() + 1, y_idx.max() + 1))
        
    # 3. Scale person to fit inside frame with natural headroom
    target_h = int(FRAME_H * target_height_ratio)
    scale = target_h / cropped_cutout.height
    tw = int(cropped_cutout.width * scale)
    th = int(target_h)
    
    if tw > FRAME_W:
        scale = FRAME_W / cropped_cutout.width
        tw = int(FRAME_W)
        th = int(cropped_cutout.height * scale)
        
    person_scaled = cropped_cutout.resize((tw, th), Image.Resampling.LANCZOS)
    
    # 4. Position person inside frame
    px = bx0 + (FRAME_W - tw) // 2
    py = by1 - th
    
    template = get_template()
    
    # Frame clipping mask (ensures person never spills outside border)
    margin_px = int(2.5 * sx)
    inner_rect = [bx0 + margin_px, by0 + margin_px, bx1 - margin_px, by1 - margin_px]
    inner_radius = FRAME_RADIUS - margin_px
    frame_mask = Image.new('L', (TEMPLATE_W, TEMPLATE_H), 0)
    d_m = ImageDraw.Draw(frame_mask)
    d_m.rounded_rectangle(inner_rect, radius=inner_radius, fill=255)
    
    person_layer = Image.new('RGBA', (TEMPLATE_W, TEMPLATE_H), (0, 0, 0, 0))
    p_alpha = person_scaled.split()[-1]
    shadow_mask = p_alpha.filter(ImageFilter.GaussianBlur(8))
    shadow_img = Image.new('RGBA', person_scaled.size, (0, 0, 0, 35))
    shadow_img.putalpha(shadow_mask)
    
    person_layer.paste(shadow_img, (px, py + 2), shadow_img)
    person_layer.paste(person_scaled, (px, py), person_scaled)
    
    clipped_person = Image.composite(person_layer, Image.new('RGBA', (TEMPLATE_W, TEMPLATE_H), (0, 0, 0, 0)), frame_mask)
    final_composite = Image.alpha_composite(template, clipped_person)
    
    # 5. Draw rounded border on top
    d_final = ImageDraw.Draw(final_composite)
    d_final.rounded_rectangle(FRAME_RECT, radius=FRAME_RADIUS, outline=BORDER_COLOR, width=BORDER_WIDTH)
    
    return final_composite.convert('RGB')

def process_file_in_place(file_path):
    try:
        processed = process_woman_image(file_path)
        ext = os.path.splitext(file_path)[1].lower()
        if ext in ['.jpg', '.jpeg']:
            processed.save(file_path, format='JPEG', quality=95)
        else:
            processed.save(file_path, format='PNG')
        return True
    except Exception as e:
        print(f"Error in process_file_in_place for {file_path}: {e}")
        return False

if __name__ == '__main__':
    if len(sys.argv) > 1:
        target_path = sys.argv[1]
        ok = process_file_in_place(target_path)
        if ok:
            print(f"SUCCESS: Processed {target_path}")
            sys.exit(0)
        else:
            print(f"FAILED: Could not process {target_path}")
            sys.exit(1)
    else:
        print("Usage: python process_image.py <image_path>")
