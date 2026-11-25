with open('e:/FEMPRENEUR WEB/FEMPREPREUR web/frontend/src/data/winnersData.js'.replace('PREPREUR', 'PRENEUR'), 'r', encoding='utf-8') as f:
    text = f.read()

# Specifically update Adv Ashwini C to have company 'Ashwini Legal Associates' as shown in reference image 2
text = text.replace(
    "name: 'Adv Ashwini C',\n      company: '',",
    "name: 'Adv Ashwini C',\n      company: 'Ashwini Legal Associates',"
)

# Also update known 2022 business names
known = {
    'Dr. Seema Yadav': 'Samarpan Foundation',
    'Pallavi Walia Raj': 'Touch a Life Foundation',
    'Meghana Mojjada': 'The Golden Feather',
    'Rutu Sunil Sangani': 'Mompreneur Circle',
    'Nidhi Virmani': 'Edusmart Learning',
    'Ami Shah': 'Spiritual Vibes',
    'Hema Shantharam': 'Mind Tree Academy',
    'Susmita Das Gupta': 'Smart Idea Consultants',
    'Toral Shah': 'Cutistic Gifts',
    'Madhusatta Chaudhury': 'Empower Living',
    'Vimal S Shah': 'Angel Holistic Range',
    'Shikha Mehra': 'Alternative Lyfestyle',
    'Naisargi Shah': 'The Idea Bag',
    'Shweta Raval': 'Beyond The Box',
    'Ruchi Aggarwal': 'Bigbull Dealt India Pvt Ltd',
    'Kanisha patel': 'Kanishka Global Trading',
    'Dr. Ishani Hanspal': 'Health First Medical Services',
    'Belaa Mitthani': 'Belaa Creation',
    'Nancy jain': 'Smile Foundation',
    'Angel Foundation': 'Angel Foundation',
    'Dr. Shalini Guggnani': 'Shalini Medicare',
    'Rekha Jayesh Saluja': 'Saluja Trading Co.',
    'Namrata shah': 'Design & Concept',
    'Janki Raina': 'Innovators Hub'
}

for p_name, c_name in known.items():
    old_str = f"name: '{p_name}',\n      company: '',"
    new_str = f"name: '{p_name}',\n      company: '{c_name}',"
    text = text.replace(old_str, new_str)

with open('e:/FEMPRENEUR WEB/FEMPRENEUR web/frontend/src/data/winnersData.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated 2022 winners with business names successfully!")
