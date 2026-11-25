from PIL import Image
import numpy as np

im = Image.open('frontend/public/images/winners-2022/adv-ashwini-c.png')
arr = np.array(im)
# Find border pixels that are not white (255, 255, 255) and not inside the person
# Let's inspect a horizontal slice around y=200, near x=80
print('adv-ashwini-c slice around x=75..90, y=200:')
for x in range(75, 90):
    print(f'x={x}, color={arr[200, x]}')

im_pallavi = Image.open('frontend/public/images/winners-2022/pallavi-walia-raj.png')
arr_p = np.array(im_pallavi)
print('\npallavi slice around x=75..90, y=200:')
for x in range(75, 90):
    print(f'x={x}, color={arr_p[200, x]}')
