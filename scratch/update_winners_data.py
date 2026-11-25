import json, re

# Load parsed datasets
with open('e:/FEMPRENEUR WEB/FEMPRENEUR web/scratch/parsed_2023_sheet.json', 'r', encoding='utf-8') as f:
    winners = json.load(f)

with open('e:/FEMPRENEUR WEB/FEMPRENEUR web/scratch/parsed_runners_up.json', 'r', encoding='utf-8') as f:
    runners = json.load(f)

# Build a lookup dictionary
lookup = {}
for w in winners:
    k = w['name'].strip().lower()
    lookup[k] = {'company': w['company'], 'category': w['category']}

for r in runners:
    k = r['name'].strip().lower()
    if k not in lookup:
        lookup[k] = {'company': r['company'], 'category': r['category']}

with open('e:/FEMPRENEUR WEB/FEMPRENEUR web/frontend/src/data/winnersData.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
in_2023 = False
updated_count = 0

current_obj_lines = []
for line in lines:
    if '// 2023 Final Winners List' in line:
        in_2023 = True
    elif '// 2022 Honorees' in line:
        in_2023 = False

    if in_2023:
        current_obj_lines.append(line)
        if line.strip() == '},':
            # We finished one object block
            obj_str = "".join(current_obj_lines)
            name_m = re.search(r"name:\s*['\"]([^'\"]+)['\"]", obj_str)
            if name_m:
                n = name_m.group(1).strip()
                k = n.lower()
                if k in lookup:
                    info = lookup[k]
                    comp = info['company']
                    cat = info['category']
                    
                    # Ensure company is present or updated
                    has_comp = 'company:' in obj_str
                    has_cat = 'category:' in obj_str
                    
                    # We will rebuild this block cleanly
                    img_m = re.search(r"image:\s*['\"]([^'\"]+)['\"]", obj_str)
                    img_val = img_m.group(1) if img_m else None
                    
                    rebuilt = ["    {\n", f"      name: '{n}',\n"]
                    if comp:
                        rebuilt.append(f"      company: {repr(comp)},\n")
                    else:
                        rebuilt.append("      company: '',\n")
                    if cat:
                        rebuilt.append(f"      category: {repr(cat)},\n")
                        rebuilt.append(f"      awardTitle: {repr(cat)},\n")
                    rebuilt.append("      year: '2023',\n")
                    if img_val:
                        rebuilt.append(f"      image: '{img_val}',\n")
                    rebuilt.append("    },\n")
                    new_lines.extend(rebuilt)
                    updated_count += 1
                else:
                    new_lines.extend(current_obj_lines)
            else:
                new_lines.extend(current_obj_lines)
            current_obj_lines = []
    else:
        new_lines.append(line)

print(f"Updated {updated_count} 2023 entries with company and category!")

with open('e:/FEMPRENEUR WEB/FEMPRENEUR web/frontend/src/data/winnersData.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Saved updated winnersData.js successfully!")
