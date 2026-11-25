import os, sys, shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy.ndimage import label

CANVAS_W = 1000
CANVAS_H = 1150
CANVAS_SIZE = (CANVAS_W, CANVAS_H)

# Standardized frame geometry matching the card proportions
FRAME_LEFT = 80
FRAME_TOP = 80
FRAME_RIGHT = CANVAS_W - 80
FRAME_BOTTOM = CANVAS_H - 70
frame_radius = 65
frame_stroke = 8

frame_w = FRAME_RIGHT - FRAME_LEFT
frame_h = FRAME_BOTTOM - FRAME_TOP

def extract_cutout(w):
    # Specialized handling for images that have superior clean source files
    if w == 'ruchi-aggarwal':
        img = Image.open('frontend/public/images/desktop-photos/Ruchi Aggarwal.png').convert('RGB')
        arr = np.array(img)
        # Clear only isolated background leaves/flower without cutting any hair:
        arr[:15, 380:425] = 255
        arr[:40, :355] = 255
        arr[:50, 700:] = 255
        is_white = (arr[:, :, 0] > 248) & (arr[:, :, 1] > 248) & (arr[:, :, 2] > 248)
        labeled, _ = label(is_white)
        border_mask = np.zeros(is_white.shape, dtype=bool)
        border_mask[0, :] = True
        border_mask[:, 0] = True
        border_mask[:, -1] = True
        bg_labels = np.unique(labeled[border_mask & is_white])
        is_bg = np.isin(labeled, bg_labels)
        is_person = ~is_bg
        y_idx, x_idx = np.where(is_person)
        rgba = np.dstack([arr, (is_person * 255).astype(np.uint8)])
        return Image.fromarray(rgba, 'RGBA').crop((x_idx.min(), y_idx.min(), x_idx.max() + 1, y_idx.max() + 1))
        
    if w == 'shikha-mehra':
        # Full uncut photo from desktop with complete hands, wrists, and jacket
        img = Image.open('frontend/public/images/desktop-photos/Shikha Mehra.png').convert('RGB')
        arr = np.array(img)
        is_white = (arr[:, :, 0] > 245) & (arr[:, :, 1] > 245) & (arr[:, :, 2] > 245)
        labeled, _ = label(is_white)
        border_mask = np.zeros(is_white.shape, dtype=bool)
        border_mask[0, :] = True
        border_mask[:, 0] = True
        border_mask[:, -1] = True
        bg_labels = np.unique(labeled[border_mask & is_white])
        is_bg = np.isin(labeled, bg_labels)
        is_person = ~is_bg
        y_idx, x_idx = np.where(is_person)
        rgba = np.dstack([arr, (is_person * 255).astype(np.uint8)])
        return Image.fromarray(rgba, 'RGBA').crop((x_idx.min(), y_idx.min(), x_idx.max() + 1, y_idx.max() + 1))

    if w == 'dr-seema-yadav':
        img = Image.open('frontend/public/images/winners-cutout/test_seema_standard.png').convert('RGBA')
        arr = np.array(img)
        alpha = arr[:, :, 3] > 10
        y_idx, x_idx = np.where(alpha)
        return img.crop((x_idx.min(), y_idx.min(), x_idx.max() + 1, y_idx.max() + 1))

    # Full resolution studio desktop photos (uncut head, hair, and body)
    desktop_map = {
        'adv-ashwini-c': 'Adv Ashwini C.png',
        'pallavi-walia-raj': 'Pallavi Walia Raj.png',
        'meghana-mojjada': 'Meghana Mojjada.png',
        'naisargi-shah': 'Naisargi Shah.png',
        'shweta-raval': 'Shweta Raval.png',
        'kanisha-patel': 'Kanisha patel.png',
        'dr-ishani-hanspal': 'Dr. Ishani Hanspal.png',
        'belaa-mitthani': 'Belaa Mitthani.png',
        'nancy-jain': 'Nancy jain.png',
        'angel-foundation': 'Angel Foundation.png',
        'dr-shalini-guggnani': 'Dr. Shalini Guggnani.png',
        'rekha-jayesh-saluja': 'Rekha Jayesh Saluja.png',
        'namrata-shah': 'Namrata shah.png',
        'janki-raina': 'Janki Raina.png',
    }
    if w in desktop_map:
        desk_path = os.path.join('frontend/public/images/desktop-photos', desktop_map[w])
        img = Image.open(desk_path).convert('RGB')
        arr = np.array(img)
        is_white = (arr[:, :, 0] > 245) & (arr[:, :, 1] > 245) & (arr[:, :, 2] > 245)
        labeled, _ = label(is_white)
        border_mask = np.zeros(is_white.shape, dtype=bool)
        border_mask[0, :] = True
        border_mask[:, 0] = True
        border_mask[:, -1] = True
        bg_labels = np.unique(labeled[border_mask & is_white])
        is_bg = np.isin(labeled, bg_labels)
        is_person = ~is_bg
        y_idx, x_idx = np.where(is_person)
        rgba = np.dstack([arr, (is_person * 255).astype(np.uint8)])
        return Image.fromarray(rgba, 'RGBA').crop((x_idx.min(), y_idx.min(), x_idx.max() + 1, y_idx.max() + 1))

    # Fallback to backup portraits for group-cropped honorees
    backup_path = f'frontend/public/images/winners-2022-popout-backup/{w}.png'
    img = Image.open(backup_path).convert('RGB')
    arr = np.array(img)
    is_white = (arr[:, :, 0] > 245) & (arr[:, :, 1] > 245) & (arr[:, :, 2] > 245)
    labeled, _ = label(is_white)
    
    border_mask = np.zeros(is_white.shape, dtype=bool)
    border_mask[0, :] = True
    border_mask[:, 0] = True
    border_mask[:, -1] = True
    
    bg_labels = np.unique(labeled[border_mask & is_white])
    is_bg = np.isin(labeled, bg_labels)
    is_person = ~is_bg
    
    y_idx, x_idx = np.where(is_person)
    rgba = np.dstack([arr, (is_person * 255).astype(np.uint8)])
    cutout = Image.fromarray(rgba, 'RGBA')
    return cutout.crop((x_idx.min(), y_idx.min(), x_idx.max() + 1, y_idx.max() + 1))

def render_contained_portrait(w, out_path, dist_path=None):
    cutout = extract_cutout(w)
    
    # Target height so headroom is balanced below FRAME_TOP
    headroom = 75
    if w == 'shikha-mehra':
        headroom = 70
    elif w == 'ruchi-aggarwal':
        headroom = 75
        
    target_h = frame_h - headroom
    scale = target_h / cutout.height
    tw = int(cutout.width * scale)
    th = int(target_h)
    
    # If tw is too wide, scale down slightly so shoulders aren't overly cropped
    if tw > frame_w + 140:
        scale = (frame_w + 140) / cutout.width
        tw = int(cutout.width * scale)
        th = int(cutout.height * scale)
        
    cutout_scaled = cutout.resize((tw, th), Image.Resampling.LANCZOS)
    
    # Position: bottom sits flush at FRAME_BOTTOM, centered horizontally inside frame
    px = FRAME_LEFT + (frame_w - tw) // 2
    if w == 'shikha-mehra':
        py = FRAME_BOTTOM - th - 6
    else:
        py = FRAME_BOTTOM - th
    
    # Clean pure white canvas
    canvas = Image.new('RGBA', CANVAS_SIZE, (255, 255, 255, 255))
    
    # Inner clip mask for frame (ensures person NEVER spills outside)
    inner_mask = Image.new('L', CANVAS_SIZE, 0)
    draw_mask = ImageDraw.Draw(inner_mask)
    draw_mask.rounded_rectangle([FRAME_LEFT, FRAME_TOP, FRAME_RIGHT, FRAME_BOTTOM], radius=frame_radius, fill=255)
    
    # Layer for person with subtle, soft natural shadow
    person_layer = Image.new('RGBA', CANVAS_SIZE, (0, 0, 0, 0))
    cutout_alpha = cutout_scaled.split()[-1]
    shadow_mask = cutout_alpha.filter(ImageFilter.GaussianBlur(10))
    shadow_img = Image.new('RGBA', cutout_scaled.size, (0, 0, 0, 40))
    shadow_img.putalpha(shadow_mask)
    person_layer.paste(shadow_img, (px, py + 3), shadow_img)
    person_layer.paste(cutout_scaled, (px, py), cutout_scaled)
    
    # Clip person strictly inside the frame
    clipped_person = Image.composite(person_layer, Image.new('RGBA', CANVAS_SIZE, (0, 0, 0, 0)), inner_mask)
    canvas = Image.alpha_composite(canvas, clipped_person)
    
    # Draw frame outline strictly on top around the perimeter (website brand purple #6A1B9A)
    draw_final = ImageDraw.Draw(canvas)
    draw_final.rounded_rectangle([FRAME_LEFT, FRAME_TOP, FRAME_RIGHT, FRAME_BOTTOM], radius=frame_radius, fill=None, outline=(106, 27, 154, 255), width=frame_stroke)
    
    # Save as high quality RGB image
    res = canvas.convert('RGB')
    res.save(out_path, quality=95)
    if dist_path and os.path.exists(os.path.dirname(dist_path)):
        res.save(dist_path, quality=95)
    return True

def main():
    out_dir = 'frontend/public/images/winners-2022'
    dist_dir = 'frontend/dist/images/winners-2022'
    os.makedirs(out_dir, exist_ok=True)
    os.makedirs(dist_dir, exist_ok=True)
    
    all_winners = [
        'adv-ashwini-c', 'dr-seema-yadav', 'pallavi-walia-raj', 'meghana-mojjada',
        'rutu-sunil-sangani', 'nidhi-virmani', 'ami-shah', 'shikha-mehra',
        'naisargi-shah', 'shweta-raval', 'ruchi-aggarwal', 'kanisha-patel',
        'dr-ishani-hanspal', 'belaa-mitthani', 'nancy-jain', 'angel-foundation',
        'dr-shalini-guggnani', 'rekha-jayesh-saluja', 'namrata-shah', 'hema-shantharam',
        'susmita-das-gupta', 'toral-shah', 'madhusatta-chaudhury', 'vimal-s-shah',
        'janki-raina'
    ]
    
    print(f"Generating contained portraits for {len(all_winners)} winners...")
    for idx, w in enumerate(all_winners):
        pub_path = os.path.join(out_dir, f'{w}.png')
        dist_path = os.path.join(dist_dir, f'{w}.png')
        ok = render_contained_portrait(w, pub_path, dist_path)
        print(f"[{idx+1}/{len(all_winners)}] {w}: {'OK' if ok else 'FAIL'}")
        
    print("ALL 25 WINNER PORTRAITS CONTAINED SUCCESSFULLY!")

if __name__ == '__main__':
    main()
