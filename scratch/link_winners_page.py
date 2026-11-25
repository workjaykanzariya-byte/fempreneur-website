with open('e:/FEMPRENEUR WEB/FEMPRENEUR web/frontend/src/pages/WinnersPage.jsx', 'r', encoding='utf-8') as f:
    text_page = f.read()

# 1. Add import
text_page = text_page.replace(
    "import { getWinnerPhoto } from '../data/winnerPhotos';",
    "import { getWinnerPhoto } from '../data/winnerPhotos';\nimport { allWinners } from '../data/winnersData';"
)

# 2. Cut out redundant local allWinners
idx_start = text_page.find('  const allWinners = [')
idx_end = text_page.find('  const filteredWinners = useMemo')

if idx_start != -1 and idx_end != -1:
    new_text_page = text_page[:idx_start] + text_page[idx_end:]
    with open('e:/FEMPRENEUR WEB/FEMPRENEUR web/frontend/src/pages/WinnersPage.jsx', 'w', encoding='utf-8') as f:
        f.write(new_text_page)
    print("SUCCESS: WinnersPage.jsx now imports allWinners from winnersData.js!")
else:
    print("WARNING: Could not find indices", idx_start, idx_end)
