import json, re

with open('e:/FEMPRENEUR WEB/FEMPRENEUR web/frontend/src/data/winnersData.js', 'r', encoding='utf-8') as f:
    text = f.read()

with open('e:/FEMPRENEUR WEB/FEMPRENEUR web/scratch/parsed_2023_sheet.json', 'r', encoding='utf-8') as jf:
    sheet_data = json.load(jf)

# Create lookup dict by normalized name
sheet_dict = {}
for item in sheet_data:
    key = item['name'].strip().lower()
    sheet_dict[key] = item

print(f"Loaded {len(sheet_dict)} sheet items.")

# Now let's see which names match
lines = text.splitlines()
in_2023 = False
count_matched = 0

for idx, line in enumerate(lines):
    if '// 2023 Final Winners List' in line:
        in_2023 = True
    elif '// 2022 Honorees' in line:
        in_2023 = False
    
    if in_2023 and 'name:' in line:
        m = re.search(r"name:\s*['\"]([^'\"]+)['\"]", line)
        if m:
            n = m.group(1).strip()
            norm = n.lower()
            if norm in sheet_dict:
                count_matched += 1
                match_info = sheet_dict[norm]
                print(f"MATCH: {n} -> comp: '{match_info['company']}', cat: '{match_info['category']}'")
            else:
                print(f"NOT MATCHED: {n}")

print(f"Total matched: {count_matched}")
