import re, json

with open('e:/FEMPRENEUR WEB/FEMPRENEUR web/frontend/src/data/winnersData.js', 'r', encoding='utf-8') as f:
    text = f.read()

images = set(re.findall(r'image:\s*[\'"]([^\'"]+)[\'"]', text))
print('Count:', len(images))
for img in sorted(images):
    print(img)
