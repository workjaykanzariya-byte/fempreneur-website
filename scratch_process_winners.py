import os
import gc
from PIL import Image
import numpy as np
import scipy.ndimage as ndi

desktop = r'C:/Users/Dell/Desktop/Fempreneur web phpoto'
composite_vimal = os.path.join(desktop, 'Vimal S Shah,Madhusatta Chaudhury,Toral Shah (Cutistic Gifts),Susmita Das Gupta,Toral Shah (Cutistic Gifts),Hema Shantharam.png')
composite_ami = os.path.join(desktop, 'Ami Shah,Nidhi Virmani.png')

CANVAS_W = 800
CANVAS_H = 950
HEAD_TOP_Y = 15

targets = [
    ('adv-ashwini-c', os.path.join(desktop, 'Adv Ashwini C.png'), None, [320, 530, 860, 920], None),
    ('dr-seema-yadav', os.path.join(desktop, 'Dr. Seema Yadav.png'), None, None, None),
    ('pallavi-walia-raj', os.path.join(desktop, 'Pallavi Walia Raj.png'), None, None, None),
    ('meghana-mojjada', os.path.join(desktop, 'Meghana Mojjada.png'), None, None, None),
    ('rutu-sunil-sangani', os.path.join(desktop, 'Rutu Sunil Sangani.png'), None, None, 5.0),
    ('ami-shah', composite_ami, (0, 0, 887, 887), None, 1.05),
    ('nidhi-virmani', composite_ami, (887, 0, 1774, 887), None, 1.2),
    ('angel-foundation', os.path.join(desktop, 'Angel Foundation.png'), None, None, None),
    ('belaa-mitthani', os.path.join(desktop, 'Belaa Mitthani.png'), None, None, None),
    ('dr-ishani-hanspal', os.path.join(desktop, 'Dr. Ishani Hanspal.png'), None, None, None),
    ('dr-shalini-guggnani', os.path.join(desktop, 'Dr. Shalini Guggnani.png'), None, None, None),
    ('janki-raina', os.path.join(desktop, 'Janki Raina.png'), None, None, None),
    ('kanisha-patel', os.path.join(desktop, 'Kanisha patel.png'), None, None, None),
    ('naisargi-shah', os.path.join(desktop, 'Naisargi Shah.png'), None, None, None),
    ('namrata-shah', os.path.join(desktop, 'Namrata shah.png'), None, None, None),
    ('nancy-jain', os.path.join(desktop, 'Nancy jain.png'), None, None, None),
    ('rekha-jayesh-saluja', os.path.join(desktop, 'Rekha Jayesh Saluja.png'), None, None, None),
    ('ruchi-aggarwal', os.path.join(desktop, 'Ruchi Aggarwal.png'), None, None, 1.15),
    ('shikha-mehra', os.path.join(desktop, 'Shikha Mehra.png'), None, None, 0.95),
    ('shweta-raval', os.path.join(desktop, 'Shweta Raval.png'), None, None, 1.0),
    ('hema-shantharam', composite_vimal, (0, 0, 600, 887), None, 1.15),
    ('susmita-das-gupta', composite_vimal, (600, 0, 1200, 440), None, 1.45),
    ('madhusatta-chaudhury', composite_vimal, (600, 468, 1200, 887), None, 1.5),
    ('toral-shah', composite_vimal, (1200, 475, 1774, 887), None, 1.35),
]

def process_one(name, src_path, crop, clean_patch, override_scale):
    im = Image.open(src_path)
    if crop:
        im = im.crop(crop)
    arr = np.array(im.convert('RGBA'))
    h, w = arr.shape[:2]
    
    r = arr[:, :, 0].astype(int)
    g = arr[:, :, 1].astype(int)
    b = arr[:, :, 2].astype(int)
    
    if clean_patch:
        y1, y2, x1, x2 = clean_patch
        arr[y1:y2, x1:x2, 3] = 0
        
    if name == 'toral-shah':
        arr[:50, :200, 3] = 0
    if name == 'madhusatta-chaudhury':
        arr[:30, 350:, 3] = 0
        
    is_white = (r > 220) & (g > 220) & (b > 220)
    border_mask = np.zeros((h, w), dtype=bool)
    border_mask[0, :] = True
    border_mask[-1, :] = True
    border_mask[:, 0] = True
    border_mask[:, -1] = True
    
    labeled, num = ndi.label(is_white)
    seed_labels = np.unique(labeled[border_mask & is_white])
    seed_labels = seed_labels[seed_labels > 0]
    bg_mask = np.isin(labeled, seed_labels)
    arr[bg_mask, 3] = 0
    
    del is_white, labeled, border_mask, seed_labels, bg_mask
    
    if 'Meghana' not in src_path:
        is_green = (g > 45) & (g > r + 12) & (g > b + 12)
        arr[is_green & (np.arange(h)[:, None] < int(h * 0.65)), 3] = 0
        del is_green
        
    del r, g, b
    
    alpha = arr[:, :, 3]
    y_idx, x_idx = np.where(alpha > 20)
    if len(y_idx) == 0:
        del arr
        gc.collect()
        return Image.new('RGBA', (CANVAS_W, CANVAS_H), (0,0,0,0))
        
    ymin, ymax = y_idx.min(), y_idx.max()
    xmin, xmax = x_idx.min(), x_idx.max()
    person_img = Image.fromarray(arr[ymin:ymax+1, xmin:xmax+1])
    pw, ph = person_img.size
    
    del arr
    gc.collect()
    
    if override_scale:
        scale = override_scale
    else:
        scale = min(760.0 / pw, (CANVAS_H - HEAD_TOP_Y - 20) / ph)
        
    nw = int(pw * scale)
    nh = int(ph * scale)
    person_scaled = person_img.resize((nw, nh), Image.Resampling.BILINEAR)
    
    canvas = Image.new('RGBA', (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    paste_x = (CANVAS_W - nw) // 2
    paste_y = HEAD_TOP_Y
    canvas.paste(person_scaled, (paste_x, paste_y), person_scaled)
    
    del person_img, person_scaled
    gc.collect()
    
    return canvas

def main():
    cols = 6
    rows = 4
    cell_w, cell_h = 200, 240
    contact = Image.new('RGB', (cols * cell_w, rows * cell_h), (250, 250, 250))

    out_dir = r'e:/FEMPRENEUR WEB/FEMPRENEUR web/frontend/public/images/winners-2022'
    os.makedirs(out_dir, exist_ok=True)

    for i, (name, src, crop, patch, scale) in enumerate(targets):
        c = process_one(name, src, crop, patch, scale)
        out_path = os.path.join(out_dir, f'{name}.png')
        c.save(out_path)
        print(f'Saved ({i+1}/24): {out_path}')
        
        thumb = c.copy()
        thumb.thumbnail((cell_w - 10, cell_h - 10))
        x = (i % cols) * cell_w + (cell_w - thumb.width) // 2
        y = (i // cols) * cell_h + (cell_h - thumb.height) // 2
        bg = Image.new('RGBA', thumb.size, (255, 255, 255, 255))
        bg.paste(thumb, (0, 0), thumb)
        contact.paste(bg.convert('RGB'), (x, y))
        del c, thumb, bg
        gc.collect()

    contact.save(r'e:/FEMPRENEUR WEB/FEMPRENEUR web/frontend/public/images/test_processed_contact.jpg', quality=90)
    print('All done! Contact sheet saved.')

if __name__ == '__main__':
    main()
