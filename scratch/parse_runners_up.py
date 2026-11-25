import csv, io, json

text = """1st Runner-up ,,,,
Neha shah,NEO Energy Hub,Neha shah,Fempreneur Award - Best Mentor,done
Dr Nimisha Shah,Glam Greens Herbal Care,Dr Nimisha Shah,Fempreneur Award - Best Service,done
Bhakti Mehta Jain,Social seed,Social seed,Fempreneur Award - Miscellaneous Services,done
Vrinda Saraf Agrawal,The Vogue House,Vrinda Saraf Agrawal,Best Influencer Award,done
Hemmali Narsiaan,Roohani Guidance,Hemmali Narsiaan,Fempreneur Award - Astrology,done
Sandhya Pathak,HariHar Gems & Crystal        ,HariHar Gems & Crystal,Fempreneur Award - Energy,done
Kavita Pande,Matverse Vision Private Limited,Matverse Vision Private Limited,Fempreneur Award - Innovation,done
Surabhi Joshi,Curtail Sustain,CurtailandSustain,Fempreneur Award - Sustainability,done
Kinjal Shah,Travel Infoline,Travel Infoline,Fempreneur Award - Travel & Hospitality,done
Rakhi Verma,Karan Foundation,Rakhi Verma,Lifetime Achievement Award,done
Indukiran Vishwa,Ikv Kreations,Ikv Kreations,Fempreneur Award - Fashion & Lifestyle,done
Pooja Vyas,Prutha Naturall,Prutha Naturall,Fempreneur Award - Manufacturing,done
Sneha Choksi,Sneha's Imagination Station,Sneha's Imagination Station,Fempreneur Award - Education,done
Namrata Vijayakar,The NVable Design Company,Namrata Vijayakar	,Fempreneur Award - Best Entrepreneur,done
Foram Parikh,Shri Siddhivinayak Devsthan	,Foram Parikh,Fempreneur Award - Best CEO,done
Shailaja,VLinguals,VLinguals,Fempreneur Award - Trend Setter,done
Sonali K,Vak Edutainment LLP,Sonali Kelapure,Fempreneur Award - Young Business Woman,done
VibeArt by Utsavi,-,VibeArt by Utsavi,Fempreneur Award – Art & Culture,done
Nupur Heda Patil,TarotRani        ,Nupur Heda Patil,Fempreneur Award - Tarot Reader,done
Saloni Parekh,Saloni Food Station,Saloni Parekh,Fempreneur Award - Home Chef,done
Sreeja Mukherjee,OAWA,OAWA,Fempreneur Award - Finance,done
Sweety Gosar,Genius Brain,Sweety Gosar,Fempreneur Award - Social Impact Creator,done
Shweta Jain,Connections,Shweta Jain	,Fempreneur Award - Mompreneur,done
Sahiba Dhandhania,Confluencr,Sahiba Dhandhania,Fempreneur Award - Young Businesswoman (Under 35),done
Dr. Ritu Bhardwaj,Family Care Clinic,Dr. Ritu Bhardwaj,Fempreneur Award - Wellness,done
Hema Bhatia,Timmi's All Natural,Timmi's All Natural,"Fempreneur Award - Beauty 
",done
Varuna Jain,"Sante Spa Cuisine, Restaurant",Varuna Jain,Fempreneur Award - Food & Beverages,done
Dr. Binita Gandhi,Ratnasagar Dental Clinic,Ratnasagar Dental Clinic,Fempreneur Award - Healthcare,done
Dr. Shilpa Patel,PodGuru Training & HR Consultancy,Dr. Shilpa Patel,Fempreneur Award - Skilling & Training,done
Jalpan lala ,-,Jalpan lala ,Fempreneur Award - Literature,done
,,,,
2nd Runner-up ,,,,
Hardi Oza Patel,Velvet Escapes & Atara,Hardi Oza Patel,Fempreneur Award - Travel & Hospitality,done
Shipra Gandhi,Spreading Happiness,Dr. Shipra Gandhi ,Lifetime Achievement Award,done
Bina Rathod,Fashion Mantra Exhibiton,Fashion Mantra Exhibiton,Fempreneur Award - Fashion & Lifestyle,done
Sweta Shah,Ayussh Kosmetics,Ayussh Kosmetics,Fempreneur Award - Manufacturing,done
Ami Shah,Spiritual Vibes,Ami Shah,Fempreneur Award - Skilling & Training ,done
Sonia Chadha,Aryanveda Cosmeceuticals,Sonia Chadha,Fempreneur Award - Best Entrepreneur,done
Dr. Raina khatri Tandon        ,Right2rise Pvt Ltd	,Dr. Raina khatri Tandon        ,Fempreneur Award - Best CEO,done
Varniika Bhargava,Creativeshowz,Creativeshowz,Fempreneur Award - Trend Setter,done
Soniya Ramnani,WebAstra Private Limited,Soniya Ramnani,Fempreneur Award - Young Business Woman,done
Rutu,Joshi Tarot Card Reader,Rutu,Fempreneur Award - Tarot Reader,done
Huzefa Topiwala,ANUM natural	,Huzefa Topiwala,"Fempreneur Award - Home Chef 
",done
Ruchi Aggarwal ,Bigbull Dealt India Pvt Ltd,Ruchi Aggarwal ,Fempreneur Award - Finance,done
Dr. Honey,Shivam Charitable Trust,Dr. Honey,Fempreneur Award - Astrology,done
Alpa Bhatt,Aarambh Kitchen,Alpa Bhatt,Fempreneur Award - Mompreneur,done
Ruchee Patel,Shivashree Realm (opc) Pvt. Ltd.,Ruchee Patel,Fempreneur Award - Best Mentor,done
Ruchee Patel,,Ruchee Patel,Fempreneur Award - Young Businesswoman (Under 35) ,done
Ami Oza,Shubh Vastu,Ami Oza,Fempreneur Award - Wellness,done
Khushbu Sejpal,Peach Glow The Beauty Studio,Khushbu Sejpal,Fempreneur Award - Beauty,done
Rima Sheth,Varaq Sweets,Varaq Sweets,Fempreneur Award - Food & Beverages,done
Dr. Urvi Ashani	,BabyOrgano	,Dr. Urvi Ashani,Fempreneur Award - Healthcare,done
Jolly Kotecha,Deepall concepts,Jolly Kotecha,Fempreneur Award - Skilling & Training,done"""

reader = csv.reader(io.StringIO(text))
extra_parsed = []
for row in reader:
    if row and len(row) >= 4:
        name = row[0].strip()
        comp = row[1].strip()
        cat = row[3].strip()
        if comp == '-':
            comp = ''
        if name and not name.lower().startswith('1st') and not name.lower().startswith('2nd'):
            extra_parsed.append({'name': name, 'company': comp, 'category': cat})

with open('e:/FEMPRENEUR WEB/FEMPRENEUR web/scratch/parsed_runners_up.json', 'w', encoding='utf-8') as f:
    json.dump(extra_parsed, f, indent=2)

print(f"Parsed {len(extra_parsed)} runners-up!")
