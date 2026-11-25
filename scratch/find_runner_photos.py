
import os, glob

runners = [
'Neha shah', 'Dr Nimisha Shah', 'Bhakti Mehta Jain', 'Vrinda Saraf Agrawal',
'Hemmali Narsiaan', 'Sandhya Pathak', 'Kavita Pande', 'Surabhi Joshi',
'Kinjal Shah', 'Rakhi Verma', 'Indukiran Vishwa', 'Pooja Vyas', 'Sneha Choksi',
'Namrata Vijayakar', 'Foram Parikh', 'Shailaja', 'Sonali K', 'VibeArt by Utsavi',
'Nupur Heda Patil', 'Saloni Parekh', 'Sreeja Mukherjee', 'Sweety Gosar',
'Shweta Jain', 'Sahiba Dhandhania', 'Dr. Ritu Bhardwaj', 'Hema Bhatia',
'Varuna Jain', 'Dr. Binita Gandhi', 'Dr. Shilpa Patel', 'Jalpan lala'
]

# Check desktop, downloads, frontend
search_paths = [
    r'C:\Users\Dell\Desktop',
    r'C:\Users\Dell\Downloads',
    r'E:\FEMPRENEUR WEB'
]

found = {}
for p in search_paths:
    for root, dirs, files in os.walk(p):
        if 'node_modules' in root or '.git' in root or '.gemini' in root or 'dist' in root:
            continue
        for f in files:
            f_lower = f.lower()
            for r in runners:
                first_name = r.split()[0].lower()
                last_name = r.split()[-1].lower() if len(r.split()) > 1 else ''
                if len(first_name) > 3 and first_name in f_lower and (not last_name or last_name in f_lower):
                    if r not in found:
                        found[r] = []
                    found[r].append(os.path.join(root, f))

print('Found matches:')
for k, v in found.items():
    print(k, '->', v[:3])
