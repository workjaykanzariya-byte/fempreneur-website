import os
from PIL import Image, ImageFilter
import numpy as np

# Output dimensions: 800 wide by 950 high (standard portrait aspect ratio)
TARGET_W = 800
TARGET_H = 950

desktop = r'C:/Users/Dell/Desktop/Fempreneur web phpoto'
composite_vimal = os.path.join(desktop, 'Vimal S Shah,Madhusatta Chaudhury,Toral Shah (Cutistic Gifts),Susmita Das Gupta,Toral Shah (Cutistic Gifts),Hema Shantharam.png')
composite_ami = os.path.join(desktop, 'Ami Shah,Nidhi Virmani.png')

def crop_and_standardize(im, crop_box=None, head_top_bias=0.0):
    """
    Crops the image to target aspect ratio (800:950) with bias towards the top
    (so the head/face is near the top edge) and resizes to (TARGET_W, TARGET_H).
    """
    if crop_box:
        im = im.crop(crop_box)
    
    im = im.convert('RGB')
    w, h = im.size
    target_ratio = TARGET_W / TARGET_H  # ~0.842
    current_ratio = w / h
    
    if current_ratio > target_ratio:
        # Image is wider than target: crop left & right (center horizontally)
        new_w = int(h * target_ratio)
        x0 = (w - new_w) // 2
        x1 = x0 + new_w
        y0 = 0
        y1 = h
    else:
        # Image is taller than target: crop bottom (keep top so head is near the top!)
        new_h = int(w / target_ratio)
        # head_top_bias can shift down slightly if hair touches absolute top
        max_y0 = h - new_h
        y0 = max(0, min(max_y0, int(max_y0 * head_top_bias)))
        y1 = y0 + new_h
        x0 = 0
        x1 = w
        
    cropped = im.crop((x0, y0, x1, y1))
    return cropped.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)

def process_dr_seema():
    # Use the full Dr. Seema Yadav image
    full_path = r'frontend/public/images/winners-2022/Dr. Seema Yadav.png'
    if not os.path.exists(full_path):
        full_path = os.path.join(desktop, 'Dr. Seema Yadav.png')
    
    im = Image.open(full_path).convert('RGB')
    w, h = im.size
    
    # 1. Optimal crop focusing on Dr. Seema Yadav with head near top
    # Dr. Seema Yadav is in x: 120 to 920, y: 30 to 980
    crop_box = (140, 25, 940, 975)
    cropped = im.crop(crop_box).resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)
    arr = np.array(cropped)
    
    # 2. Cleanly remove the green logo line and "IJAY F" banner on the right
    # Dark banner background color is around [46, 37, 36]
    # The logo region is at x >= 710, y: 90 to 340
    # Let's paint over this region with the dark banner background
    for y in range(85, 345):
        for x in range(710, TARGET_W):
            # Banner background with subtle realistic texture
            noise = (int(x * 17 + y * 23) % 7) - 3
            arr[y, x, 0] = max(0, min(255, 46 + noise))
            arr[y, x, 1] = max(0, min(255, 37 + noise))
            arr[y, x, 2] = max(0, min(255, 36 + noise))
            
    # Smooth the boundary transition
    cleaned = Image.fromarray(arr)
    return cleaned

def generate_all():
    out_dir = r'frontend/public/images/winners-2022'
    os.makedirs(out_dir, exist_ok=True)
    
    configs = [
        # 1. Adv Ashwini C: zoom in so head is at top and scale matches Pallavi
        ('adv-ashwini-c', os.path.join(desktop, 'Adv Ashwini C.png'), (180, 80, 1080, 1150), 0.0),
        
        # 2. Dr. Seema Yadav: custom handler with green line removal and head at top
        ('dr-seema-yadav', 'CUSTOM_DR_SEEMA', None, 0.0),
        
        # 3. Pallavi Walia Raj: already well-framed, ensure 800x950
        ('pallavi-walia-raj', os.path.join(desktop, 'Pallavi Walia Raj.png'), (180, 10, 1080, 1080), 0.0),
        
        # 4. Meghana Mojjada: zoom in slightly so face matches and head near top
        ('meghana-mojjada', os.path.join(desktop, 'Meghana Mojjada.png'), (240, 20, 1140, 1090), 0.0),
        
        # 5. Rutu Sunil Sangani: crop to 800:950 and upscale nicely
        ('rutu-sunil-sangani', os.path.join(desktop, 'Rutu Sunil Sangani.png'), (10, 0, 190, 181), 0.0),
        
        # 6. Nidhi Virmani: right half of composite
        ('nidhi-virmani', composite_ami, (930, 0, 1720, 887), 0.0),
        
        # 7. Ami Shah: left half of composite
        ('ami-shah', composite_ami, (50, 0, 840, 887), 0.0),
        
        # 8. Shikha Mehra
        ('shikha-mehra', os.path.join(desktop, 'Shikha Mehra.png'), (50, 20, 910, 1035), 0.0),
        
        # 9. Naisargi Shah
        ('naisargi-shah', os.path.join(desktop, 'Naisargi Shah.png'), (0, 0, 1004, 1190), 0.0),
        
        # 10. Shweta Raval
        ('shweta-raval', os.path.join(desktop, 'Shweta Raval.png'), (50, 20, 986, 1118), 0.0),
        
        # 11. Ruchi Aggarwal
        ('ruchi-aggarwal', os.path.join(desktop, 'Ruchi Aggarwal.png'), (0, 0, 1017, 1205), 0.0),
        
        # 12. Kanisha patel
        ('kanisha-patel', os.path.join(desktop, 'Kanisha patel.png'), (30, 20, 1137, 1335), 0.0),
        
        # 13. Dr. Ishani Hanspal
        ('dr-ishani-hanspal', os.path.join(desktop, 'Dr. Ishani Hanspal.png'), (20, 20, 1166, 1326), 0.0),
        
        # 14. Belaa Mitthani
        ('belaa-mitthani', os.path.join(desktop, 'Belaa Mitthani.png'), (20, 20, 1088, 1288), 0.0),
        
        # 15. Nancy jain
        ('nancy-jain', os.path.join(desktop, 'Nancy jain.png'), (150, 20, 1150, 1193), 0.0),
        
        # 16. Angel Foundation
        ('angel-foundation', os.path.join(desktop, 'Angel Foundation.png'), (0, 0, 1073, 1272), 0.0),
        
        # 17. Dr. Shalini Guggnani
        ('dr-shalini-guggnani', os.path.join(desktop, 'Dr. Shalini Guggnani.png'), (100, 20, 1180, 1229), 0.0),
        
        # 18. Rekha Jayesh Saluja
        ('rekha-jayesh-saluja', os.path.join(desktop, 'Rekha Jayesh Saluja.png'), (250, 20, 1196, 1087), 0.0),
        
        # 19. Namrata shah
        ('namrata-shah', os.path.join(desktop, 'Namrata shah.png'), (180, 20, 1162, 1172), 0.0),
        
        # 20. Hema Shantharam (from composite)
        ('hema-shantharam', composite_vimal, (0, 0, 600, 712), 0.0),
        
        # 21. Susmita Das Gupta (from composite)
        ('susmita-das-gupta', composite_vimal, (600, 0, 1200, 440), 0.0),
        
        # 22. Toral Shah (from composite)
        ('toral-shah', composite_vimal, (1200, 440, 1774, 887), 0.0),
        
        # 23. Madhusatta Chaudhury (from composite)
        ('madhusatta-chaudhury', composite_vimal, (600, 440, 1200, 887), 0.0),
        
        # 24. Janki Raina
        ('janki-raina', os.path.join(desktop, 'Janki Raina.png'), (20, 20, 1153, 1341), 0.0),
    ]
    
    results = []
    for name, src, crop_box, bias in configs:
        if src == 'CUSTOM_DR_SEEMA':
            im_std = process_dr_seema()
        else:
            if not os.path.exists(src):
                print(f"File not found: {src}")
                continue
            im = Image.open(src)
            im_std = crop_and_standardize(im, crop_box, bias)
            
        out_path = os.path.join(out_dir, f'{name}.png')
        im_std.save(out_path)
        print(f"Saved {name}.png: size={im_std.size}")
        results.append((name, im_std))
        
    # Generate a preview contact sheet of all 24 standardized images
    cols = 6
    rows = 4
    cw, ch = 200, 238
    sheet = Image.new('RGB', (cols * cw, rows * ch), (255, 255, 255))
    for i, (name, im) in enumerate(results):
        r_col = i % cols
        r_row = i // cols
        thumb = im.resize((cw, ch), Image.Resampling.LANCZOS)
        sheet.paste(thumb, (r_col * cw, r_row * ch))
        
    sheet.save(r'frontend/public/images/standardized_contact_sheet.jpg', quality=95)
    print("Standardized contact sheet saved to frontend/public/images/standardized_contact_sheet.jpg")

if __name__ == '__main__':
    generate_all()
