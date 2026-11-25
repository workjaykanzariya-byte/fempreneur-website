with open('e:/FEMPRENEUR WEB/FEMPRENEUR web/frontend/src/data/winnersData.js', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()
in_2022 = False
entries_2022 = []
cur = {}
for l in lines:
    if '// 2022 Honorees' in l:
        in_2022 = True
    if in_2022:
        if 'name:' in l:
            cur['name'] = l.split(':')[1].strip().strip("',\"")
        if 'category:' in l:
            cur['category'] = l.split(':')[1].strip().strip("',\"")
        if 'company:' in l:
            cur['company'] = l.split(':')[1].strip().strip("',\"")
        if l.strip() == '},' and cur:
            entries_2022.append(cur)
            cur = {}

print(f'Total 2022 entries: {len(entries_2022)}')
for e in entries_2022:
    print(f"{e.get('name')} | comp: '{e.get('company')}' | cat: '{e.get('category')}'")
