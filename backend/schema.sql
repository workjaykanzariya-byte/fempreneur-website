-- =========================================================================
-- Fempreneur 2027 PostgreSQL Database Schema
-- All tables are prefixed with 'web_' for complete safety and isolation
-- =========================================================================

-- 1. Event Registrations
CREATE TABLE IF NOT EXISTS web_event_registrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  organization VARCHAR(255),
  city_hub VARCHAR(100),
  city VARCHAR(100),
  pass_type VARCHAR(50) DEFAULT 'general',
  pass_amount NUMERIC(10, 2) DEFAULT 0,
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_ref VARCHAR(255),
  status VARCHAR(50) DEFAULT 'registered',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Community Applications (Memberships)
CREATE TABLE IF NOT EXISTS web_community_applications (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  tier VARCHAR(50) DEFAULT 'free',
  annual_fee NUMERIC(10, 2) DEFAULT 0,
  company VARCHAR(255),
  city VARCHAR(100),
  sector VARCHAR(100) DEFAULT 'General',
  interest VARCHAR(255) DEFAULT 'Community Membership',
  why_join TEXT,
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_ref VARCHAR(255),
  status VARCHAR(50) DEFAULT 'applied',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Nominations
CREATE TABLE IF NOT EXISTS web_nominations (
  id SERIAL PRIMARY KEY,
  nominee_name VARCHAR(255) NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  designation VARCHAR(100),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  city VARCHAR(100),
  category_name VARCHAR(255),
  description TEXT,
  operational_years VARCHAR(50),
  website_link VARCHAR(500),
  profile_picture VARCHAR(500),
  business_logo VARCHAR(500),
  voting_url VARCHAR(500),
  track VARCHAR(50) DEFAULT 'general',
  package VARCHAR(50) DEFAULT 'free',
  package_amount NUMERIC(10, 2) DEFAULT 0,
  payment_status VARCHAR(50) DEFAULT 'free',
  payment_ref VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  jury_score NUMERIC(5, 2) DEFAULT 0,
  public_votes INTEGER DEFAULT 0,
  award_year VARCHAR(10) DEFAULT '2027',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Nomination Votes
CREATE TABLE IF NOT EXISTS web_nomination_votes (
  id SERIAL PRIMARY KEY,
  nomination_id INTEGER,
  voter_name VARCHAR(255),
  voter_email VARCHAR(255) NOT NULL,
  ip_address VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Coffee Table Book Orders
CREATE TABLE IF NOT EXISTS web_coffee_table_book_orders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  company VARCHAR(255),
  quantity INTEGER DEFAULT 1,
  package_price NUMERIC(10, 2) DEFAULT 2999,
  total_amount NUMERIC(10, 2) DEFAULT 2999,
  delivery_address TEXT,
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_ref VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Inquiries (Contact, Speaker, Partner, Newsletter)
CREATE TABLE IF NOT EXISTS web_inquiries (
  id SERIAL PRIMARY KEY,
  inquiry_type VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT,
  city VARCHAR(100),
  organization VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Admin Users
CREATE TABLE IF NOT EXISTS web_admin_users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'superadmin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Sponsorships
CREATE TABLE IF NOT EXISTS web_sponsorships (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  tier VARCHAR(100),
  amount NUMERIC(10, 2) DEFAULT 0,
  payment_received INTEGER DEFAULT 0,
  payment_ref VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Winners
CREATE TABLE IF NOT EXISTS web_winners (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  category_name VARCHAR(255),
  city VARCHAR(100),
  award_year VARCHAR(10) DEFAULT '2027',
  track VARCHAR(50) DEFAULT 'honorary',
  impact_text TEXT,
  quote TEXT,
  photo_url VARCHAR(500),
  website_url VARCHAR(500),
  is_published INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Sponsors (Gallery)
CREATE TABLE IF NOT EXISTS web_sponsors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) DEFAULT 'Sponsor',
  org VARCHAR(255) NOT NULL,
  tags VARCHAR(255),
  photo_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Partners
CREATE TABLE IF NOT EXISTS web_partners (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  org VARCHAR(255) NOT NULL,
  tags VARCHAR(255),
  photo_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Jury Members
CREATE TABLE IF NOT EXISTS web_jury (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  org VARCHAR(255) NOT NULL,
  tags VARCHAR(255),
  photo_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Blogs & Articles
CREATE TABLE IF NOT EXISTS web_blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  category VARCHAR(100) DEFAULT 'Leadership',
  author VARCHAR(255) DEFAULT 'Fempreneur Team',
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image VARCHAR(500),
  is_published INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. Voice of Fempreneur Videos
CREATE TABLE IF NOT EXISTS web_voice_videos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  youtube_url VARCHAR(500) NOT NULL,
  youtube_id VARCHAR(100) NOT NULL,
  thumbnail_url VARCHAR(500),
  speaker_name VARCHAR(255),
  company_name VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
