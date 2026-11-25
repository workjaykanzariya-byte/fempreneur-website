import csv, io, json

data_text = """Gunpreet Kaur,-,Gunpreet Kaur,Fempreneur Award - Skilling & Training,Done
Dr. Reena Sharma,Swastik Rheumatology Clinic,Dr Reena Sharma,Fempreneur Award - Healthcare,Done
Vishakha Davve,Swad kaa safar,Swad kaa safar,Fempreneur Award - Food & Beverages,Done
Shalini Sisodia,Glow N Bloom,Glow N Bloom,Fempreneur Award - Beauty,Done
Dr. Madhuri Bhatt,Soham Organic Beauty Essentials,Soham Organic Beauty Essentials,Fempreneur Award - Wellness,Done
Tanya Shah,Toycra,Tanya Shah,Fempreneur Award - Young Businesswoman (Under 35),Done
Disha Thakar,H&D Products,Disha Thakar,Fempreneur Award - Mompreneur,Done
Payal Rajpal,Robotex India,Robotex India,Fempreneur Award - Social Impact Creator,Done
Perpetin Dsouza,Realistic Financial Services Pvt. Ltd.,Realistic Financial Services Pvt Ltd,Fempreneur Award - Finance,Done
Nehal Nayak,Nehal's Food Story,Chef Nehal Nayak,Fempreneur Award - Home Chef,Done
Poonam Khanna,Taropathy,Dr. Poonam Khanna,Fempreneur Award - Tarot Reader,Done
Panam Shroff,-,Panam Shroff,Fempreneur Award – Art & Culture,Done
Krupa Shrotriya,Bee Urban Co-living Hostel,Krupa Shrotriya,Fempreneur Award - Young Business Woman,Done
Anita Mehta,The Wardrobe Story,Anita Mehta,Fempreneur Award - Trend Setter,Done
Sahiba Dhandhania,Confluencr,Sahiba Dhandhania,Fempreneur Award - Young Businesswoman (Under 35),Done
Vaanika Malik,Vaanika Creations,Vaanika Malik,Fempreneur Award - Best Entrepreneur,Done
Capt. Asha Shinde Alagappa,Gyan Darshani,Capt. Asha Shinde Alagappa,Fempreneur Award - Education,Done
Ruchi saraf,Kettro Gourmet Gifts Pvt. Ltd,Kettro Gourmet Gifts Private Limited,Fempreneur Award - Manufacturing,Done
Vijayalakshmi Krishna,Aavaranaa,Aavaranaa,Fempreneur Award - Fashion & Lifestyle,Done
Dr. Chandra Prasad,Dr Dathu Rao Memorial Charitable Trust,Dr. Chandra Prasad,Lifetime Achievement Award,Done
Meghna Dave,Dhanraj Holidays,Dhanraj Holidays,Fempreneur Award - Travel & Hospitality,Done
Pragya Mittal,Evify Logitech Pvt. Ltd.,Pragya Mittal,Fempreneur Award - Sustainability,Done
Ankita Parashar,Enterprise India Fellowship,"Ankita Parashar, Enterprise India Fellowship",Fempreneur Award - Innovation,Done
Bharti Verma,Anannd Utsav,Bharti verma,Fempreneur Award - Energy,Done
Dr. Honey,Shivam Charitable Trust,Shivam Charitable Trust,Fempreneur Award - Astrology,Done
Aparna Sharma,Surya Consulting - Managing Consultant,Dr. Aparna Sharma,Best Influencer Award,Done
Ketki Shirish Nikam,Pictture Mint,Pictture Mint,Fempreneur Award - Miscellaneous Services (Advertising photography),done
Jigisha Navanith,StorySpring Creative Studio,StorySpring Creative Studio,Fempreneur Award - Best Service,Done
Dr. Pallavi Vasudha Vishwas,Happy Harmony,Dr.Pallavi Vasudha Vishwas,Fempreneur Award - Best Mentor,Done
Sonal Gosalia,-,Sonal Gosalia,Fempreneur Award - Literature,Done
Parul Attarwala,VHUM Social Selfhelp Group,VHUM Social Selfhelp Group,Fempreneur Award - NGO,Done
Meera Shah,The Idea Bag Inc.,Meera Ambasana Shah,Fempreneur Award - Curator,Done
Apeksha Nagia,Metricchant Design Attributes Pvt. Ltd.,Apeksha Nagia,Fempreneur Award - Interior Designer,Done
Tanvi Rathod,-,Tanvi Rathod,Pride of India,Done
Priyanka Kumar,-,Priyanka Kumar,Volunteer of the Year Award,Done
Anchor Vaibhavi shah,-,Anchor Vaibhavi shah,Fempreneur Award – Entertainment,Done
Dr. Richa Kapoor Miglani,Dr. Richa Miglani's Dental Care Centre,Dr. Richa Kapoor Miglani,Fempreneur Award - Health-tech,Done
Hema Acharya,Cassa Group,Hema Acharya,Fempreneur Award - Best Employee,Done
Setu Patel,Daffocare Research Laboratory,Daffocare Research Laboratory,Fempreneur Award - Pharmaceuticals,Done
Latha Narayanan Valli,Standard Chartered Global Business Services Pvt. Ltd.,Latha Narayanan Valli,Fempreneur Award - Information Technology,Done
Dhara Vaghela,Orgotel Organic,Orgotel Organic,Fempreneur Award - Agriculture,Done
Thamizh Priya,KN Architects & Builders,KN Architects & Builders,Fempreneur Award - Real Estate,Done"""

reader = csv.reader(io.StringIO(data_text))
parsed = []
for row in reader:
    if row and len(row) >= 4:
        name = row[0].strip()
        comp = row[1].strip()
        printing = row[2].strip()
        cat = row[3].strip()
        if comp == '-':
            comp = ''
        parsed.append({'name': name, 'company': comp, 'printingName': printing, 'category': cat})

with open('e:/FEMPRENEUR WEB/FEMPRENEUR web/scratch/parsed_2023_sheet.json', 'w', encoding='utf-8') as f:
    json.dump(parsed, f, indent=2)

print(f'Successfully parsed and saved {len(parsed)} winners!')
