from PIL import Image
import numpy as np

im = Image.open('frontend/public/images/winners-2022/adv-ashwini-c.png')
arr = np.array(im)

# Let's find pixels where R!=255 or G!=255 or B!=255
non_white = np.where((arr[:, :, 0] < 250) | (arr[:, :, 1] < 250) | (arr[:, :, 2] < 250))
print('Y min, max:', non_white[0].min(), non_white[0].max())
print('X min, max:', non_white[1].min(), non_white[1].max())

# Let's check a column near x=non_white[1].min()
x_left = non_white[1].min()
print(f'Leftmost non-white x={x_left}')
for y in range(400, 420):
    print(f'y={y}, x={x_left}..{x_left+5}: {arr[y, x_left:x_left+5, :3]}')

# What about the outer frame box?
# In fix_popout_no_white_outline.py: frame_box = [80, 220, CANVAS_W - 80, CANVAS_H - 40]
print(f'At (80, 500): {arr[500, 80, :3]}')
print(f'At (920, 500): {arr[500, 920, :3]}')
