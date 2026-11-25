import os, sys, shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy.ndimage import label

CANVAS_W = 1000
CANVAS_H = 1150
CANVAS_SIZE = (CANVAS_W, CANVAS_H)

frame_box = [80, 220, CANVAS_W - 80, CANVAS_H - 40]
frame_radius = 80
frame_stroke = 10

def process_image(src_path, out_path, dist_path=None):
    img = Image.open(src_path).convert('RGB')
    arr = np.array(img)
    
    is_white = (arr[:, :, 0] > 240) & (arr[:, :, 1] > 240) & (arr[:, :, 2] > 240)
    labeled, num = label(is_white)
    
    border_mask = np.zeros(is_white.shape, dtype=bool)
    border_mask[0, :] = True
    border_mask[:, 0] = True
    border_mask[:, -1] = True
    
    bg_labels = np.unique(labeled[border_mask & is_white])
    is_bg = np.isin(labeled, bg_labels)
    is_person = ~is_bg
    
    rgba = np.dstack([arr, (is_person * 255).astype(np.uint8)])
    cutout = Image.fromarray(rgba, 'RGBA')
    
    y_idx, x_idx = np.where(is_person)
    if len(y_idx) == 0:
        print(f"Warning: No person found in {src_path}")
        return False
        
    crop_box = (x_idx.min(), y_idx.min(), x_idx.max() + 1, y_idx.max() + 1)
    cutout = cutout.crop(crop_box)
    
    target_h = 1020
    scale = target_h / cutout.height
    target_w = int(cutout.width * scale)
    cutout_scaled = cutout.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    person_x = (CANVAS_W - target_w) // 2
    person_y = frame_box[3] - target_h
    
    canvas = Image.new('RGB', CANVAS_SIZE, (255, 255, 255))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle(frame_box, radius=frame_radius, fill=(255, 255, 255), outline=(0, 0, 0), width=frame_stroke)
    
    canvas_rgba = canvas.convert('RGBA')
    
    # Drop shadow directly behind cutout (no white halo)
    cutout_alpha = cutout_scaled.split()[-1]
    shadow_mask = cutout_alpha.filter(ImageFilter.GaussianBlur(14))
    shadow_img = Image.new('RGBA', cutout_scaled.size, (0, 0, 0, 75))
    shadow_img.putalpha(shadow_mask)
    
    shadow_canvas = Image.new('RGBA', CANVAS_SIZE, (0, 0, 0, 0))
    shadow_canvas.paste(shadow_img, (person_x, person_y + 4), shadow_img)
    
    clip_mask = Image.new('L', CANVAS_SIZE, 255)
    clip_draw = ImageDraw.Draw(clip_mask)
    clip_draw.rectangle([0, frame_box[3] - 2, CANVAS_W, CANVAS_H], fill=0)
    shadow_canvas.putalpha(Image.composite(shadow_canvas.split()[-1], Image.new('L', CANVAS_SIZE, 0), clip_mask))
    
    canvas_rgba = Image.alpha_composite(canvas_rgba, shadow_canvas)
    
    # Paste person directly without white border mask
    person_canvas = Image.new('RGBA', CANVAS_SIZE, (0, 0, 0, 0))
    person_canvas.paste(cutout_scaled, (person_x, person_y), cutout_scaled)
    person_canvas.putalpha(Image.composite(person_canvas.split()[-1], Image.new('L', CANVAS_SIZE, 0), clip_mask))
    canvas_rgba = Image.alpha_composite(canvas_rgba, person_canvas)
    
    draw_final = ImageDraw.Draw(canvas_rgba)
    draw_final.rounded_rectangle(frame_box, radius=frame_radius, fill=None, outline=(0, 0, 0, 255), width=frame_stroke)
    
    head_h = min(target_h, frame_box[1] - person_y + 35)
    if head_h > 0:
        head_crop = cutout_scaled.crop((0, 0, target_w, head_h))
        canvas_rgba.paste(head_crop, (person_x, person_y), head_crop)
        
    res = canvas_rgba.convert('RGB')
    res.save(out_path, quality=95)
    if dist_path and os.path.exists(os.path.dirname(dist_path)):
        res.save(dist_path, quality=95)
    return True

def main():
    backup_dir = 'frontend/public/images/winners-2022-popout-backup'
    out_dir = 'frontend/public/images/winners-2022'
    dist_dir = 'frontend/dist/images/winners-2022'

    all_winners = [
        'adv-ashwini-c', 'ami-shah', 'angel-foundation', 'belaa-mitthani',
        'dr-ishani-hanspal', 'dr-seema-yadav', 'dr-shalini-guggnani', 'hema-shantharam',
        'janki-raina', 'kanisha-patel', 'madhusatta-chaudhury', 'meghana-mojjada',
        'naisargi-shah', 'namrata-shah', 'nancy-jain', 'nidhi-virmani',
        'pallavi-walia-raj', 'rekha-jayesh-saluja', 'ruchi-aggarwal', 'rutu-sunil-sangani',
        'shikha-mehra', 'shweta-raval', 'susmita-das-gupta', 'toral-shah',
        'vimal-s-shah'
    ]

    for idx, w in enumerate(all_winners):
        if w == 'dr-seema-yadav':
            src = 'frontend/public/images/winners-cutout/test_seema_standard.png'
        else:
            src = os.path.join(backup_dir, f'{w}.png')
            
        target_pub = os.path.join(out_dir, f'{w}.png')
        target_dist = os.path.join(dist_dir, f'{w}.png')
        ok = process_image(src, target_pub, target_dist)
        status = "OK" if ok else "FAILED"
        print(f"[{idx+1}/{len(all_winners)}] {w}: {status}")

    print("ALL WINNERS PROCESSED WITHOUT WHITE OUTLINE SUCCESSFULLY!")

if __name__ == '__main__':
    main()
