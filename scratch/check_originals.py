import os

# Check 2022 sources
desk22 = 'C:/Users/Dell/Desktop/Fempreneur web phpoto'
backup22 = 'e:/FEMPRENEUR WEB/FEMPRENEUR web/frontend/public/images/winners-2022-original-backup'
pop22 = 'e:/FEMPRENEUR WEB/FEMPRENEUR web/frontend/public/images/winners-2022-popout-backup'

print('Desk 2022 exists:', os.path.exists(desk22), len(os.listdir(desk22)) if os.path.exists(desk22) else 0)
print('Backup 2022 exists:', os.path.exists(backup22), len(os.listdir(backup22)) if os.path.exists(backup22) else 0)

# Check 2023 sources
desk23 = 'C:/Users/Dell/Desktop/FEMPRENEUR WEB PHOTO2023'
print('Desk 2023 exists:', os.path.exists(desk23), len(os.listdir(desk23)) if os.path.exists(desk23) else 0)

# Check entrepreneurs sources
ent_backup = 'e:/FEMPRENEUR WEB/FEMPRENEUR web/frontend/public/images/entrepreneurs-original-backup'
print('Entrepreneurs backup exists:', os.path.exists(ent_backup), len(os.listdir(ent_backup)) if os.path.exists(ent_backup) else 0)
