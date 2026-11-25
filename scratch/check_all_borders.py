import os
from PIL import Image
import numpy as np

winners_dir = 'frontend/public/images/winners-2022'
all_winners = [
    'adv-ashwini-c', 'dr-seema-yadav', 'pallavi-walia-raj', 'meghana-mojjada',
    'rutu-sunil-sangani', 'nidhi-virmani', 'ami-shah', 'shikha-mehra',
    'naisargi-shah', 'shweta-raval', 'ruchi-aggarwal', 'kanisha-patel',
    'dr-ishani-hanspal', 'belaa-mitthani', 'nancy-jain', 'angel-foundation',
    'dr-shalini-guggnani', 'rekha-jayesh-saluja', 'namrata-shah', 'hema-shantharam',
    'susmita-das-gupta', 'toral-shah', 'madhusatta-chaudhury', 'vimal-s-shah',
    'janki-raina'
]

for w in all_winners:
    p = os.path.join(winners_dir, f'{w}.png')
    if not os.path.exists(p):
        print(f'{w}: FILE NOT FOUND')
        continue
    im = Image.open(p)
    arr = np.array(im)
    c1 = arr[500, 80][:3] if arr.shape[0] > 500 and arr.shape[1] > 80 else 'OOB'
    c2 = arr[500, 920][:3] if arr.shape[0] > 500 and arr.shape[1] > 920 else 'OOB'
    print(f'{w} ({im.size}): left-border={c1}, right-border={c2}')
