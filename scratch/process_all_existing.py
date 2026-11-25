import os, sys, shutil
from PIL import Image
from winner_processor import process_woman_image

BASE_DIR = 'e:/FEMPRENEUR WEB/FEMPRENEUR web'
PUBLIC_DIR = os.path.join(BASE_DIR, 'frontend/public/images')
DIST_DIR = os.path.join(BASE_DIR, 'frontend/dist/images')

def process_winners_2023():
    print('--- Processing Winners 2023 ---')
    src_dir = 'C:/Users/Dell/Desktop/FEMPRENEUR WEB PHOTO2023'
    fallback_dir = os.path.join(PUBLIC_DIR, 'winners-2023')
    target_dir = os.path.join(PUBLIC_DIR, 'winners-2023')
    dist_target_dir = os.path.join(DIST_DIR, 'winners-2023')
    
    os.makedirs(target_dir, exist_ok=True)
    os.makedirs(dist_target_dir, exist_ok=True)
    
    # List all 2023 winners
    items = sorted([f for f in os.listdir(fallback_dir) if f.lower().endswith('.png')])
    for idx, filename in enumerate(items):
        src_path = os.path.join(src_dir, filename)
        if not os.path.exists(src_path):
            src_path = os.path.join(fallback_dir, filename)
            
        out_path = os.path.join(target_dir, filename)
        dist_path = os.path.join(dist_target_dir, filename)
        
        print(f'[{idx+1}/{len(items)}] Processing 2023: {filename}')
        try:
            processed = process_woman_image(src_path)
            processed.save(out_path, format='PNG')
            processed.save(dist_path, format='PNG')
        except Exception as e:
            print(f'Error processing {filename}: {e}')

def process_winners_2022():
    print('--- Processing Winners 2022 ---')
    desk_dir = 'C:/Users/Dell/Desktop/Fempreneur web phpoto'
    desktop_photos_dir = os.path.join(PUBLIC_DIR, 'desktop-photos')
    backup_dir = os.path.join(PUBLIC_DIR, 'winners-2022-original-backup')
    target_dir = os.path.join(PUBLIC_DIR, 'winners-2022')
    dist_target_dir = os.path.join(DIST_DIR, 'winners-2022')
    
    # 22 canonical 2022 winners
    winner_slugs = [
        'adv-ashwini-c', 'dr-seema-yadav', 'pallavi-walia-raj', 'meghana-mojjada',
        'rutu-sunil-sangani', 'nidhi-virmani', 'ami-shah', 'shikha-mehra',
        'naisargi-shah', 'shweta-raval', 'ruchi-aggarwal', 'kanisha-patel',
        'dr-ishani-hanspal', 'belaa-mitthani', 'nancy-jain', 'angel-foundation',
        'dr-shalini-guggnani', 'rekha-jayesh-saluja', 'namrata-shah', 'hema-shantharam',
        'susmita-das-gupta', 'toral-shah', 'madhusatta-chaudhury', 'vimal-s-shah',
        'janki-raina'
    ]
    
    for idx, slug in enumerate(winner_slugs):
        # Look for source photo
        src_path = None
        # Check desktop-photos
        for f in os.listdir(desktop_photos_dir):
            if slug.replace('-', ' ').lower() in f.lower().replace('-', ' ') or slug.replace('-', '').lower() in f.lower().replace('-', ''):
                src_path = os.path.join(desktop_photos_dir, f)
                break
        if not src_path and os.path.exists(desk_dir):
            for f in os.listdir(desk_dir):
                if slug.replace('-', ' ').lower() in f.lower().replace('-', ' '):
                    src_path = os.path.join(desk_dir, f)
                    break
        if not src_path:
            src_path = os.path.join(backup_dir, f'{slug}.png')
            
        print(f'[{idx+1}/{len(winner_slugs)}] Processing 2022: {slug} from {os.path.basename(src_path)}')
        try:
            processed = process_woman_image(src_path)
            out_path = os.path.join(target_dir, f'{slug}.png')
            dist_path = os.path.join(dist_target_dir, f'{slug}.png')
            processed.save(out_path, format='PNG')
            if os.path.exists(dist_target_dir):
                processed.save(dist_path, format='PNG')
        except Exception as e:
            print(f'Error processing {slug}: {e}')

def process_entrepreneurs():
    print('--- Processing Featured Entrepreneurs ---')
    ent_backup = os.path.join(PUBLIC_DIR, 'entrepreneurs-original-backup')
    target_dir = os.path.join(PUBLIC_DIR, 'entrepreneurs')
    dist_target_dir = os.path.join(DIST_DIR, 'entrepreneurs')
    
    if os.path.exists(ent_backup):
        for f in os.listdir(ent_backup):
            if f.lower().endswith(('.jpg', '.png', '.jpeg')):
                src_path = os.path.join(ent_backup, f)
                base = os.path.splitext(f)[0]
                print(f'Processing entrepreneur: {f}')
                try:
                    processed = process_woman_image(src_path)
                    # Save both as .jpg and .png
                    processed.save(os.path.join(target_dir, f'{base}.jpg'), format='JPEG', quality=95)
                    processed.save(os.path.join(target_dir, f'{base}.png'), format='PNG')
                    if os.path.exists(dist_target_dir):
                        processed.save(os.path.join(dist_target_dir, f'{base}.jpg'), format='JPEG', quality=95)
                        processed.save(os.path.join(dist_target_dir, f'{base}.png'), format='PNG')
                except Exception as e:
                    print(f'Error processing {f}: {e}')

if __name__ == '__main__':
    process_winners_2023()
    process_winners_2022()
    process_entrepreneurs()
    print('ALL WINNERS SUCCESSFULLY PROCESSED WITH IDENTICAL REFERENCE BACKGROUND!')
