import { query } from '../config/db.js';

/**
 * Initialize Database Connection and Ensure Website Tables Exist
 * All website tables use the `web_` prefix so they coexist safely
 * with any other applications in the shared PostgreSQL database.
 */
export const initializeDatabase = async () => {
  try {
    console.log('Verifying PostgreSQL connection to database...');
    const res = await query('SELECT current_database(), current_schema(), NOW() as server_time');
    if (res && res.rows && res.rows.length > 0) {
      console.log(`✓ Connected to PostgreSQL DB: ${res.rows[0].current_database} (Schema: ${res.rows[0].current_schema})`);
    }

    // Auto-create website tables with web_ prefix if missing
    await query(`
      -- 1. Event Registrations
      CREATE TABLE IF NOT EXISTS web_event_registrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        organization VARCHAR(255),
        city_hub VARCHAR(100),
        city VARCHAR(100),
        pass_type VARCHAR(100) DEFAULT 'Delegate (With Dinner)',
        pass_amount NUMERIC(10, 2) DEFAULT 0,
        event_date TIMESTAMP WITH TIME ZONE DEFAULT '2027-03-08 18:30:00+00',
        event_venue VARCHAR(255) DEFAULT 'Renaissance by Marriott, S.G. Highway, Ahmedabad',
        attendee_segment VARCHAR(255),
        payment_status VARCHAR(50) DEFAULT 'pending',
        payment_ref VARCHAR(255),
        order_id VARCHAR(255),
        status VARCHAR(50) DEFAULT 'registered',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS event_date TIMESTAMP WITH TIME ZONE DEFAULT '2027-03-08 18:30:00+00';
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS event_venue VARCHAR(255) DEFAULT 'Renaissance by Marriott, S.G. Highway, Ahmedabad';
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS attendee_segment VARCHAR(255);
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS order_id VARCHAR(255);
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS payment_ref VARCHAR(255);
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'pending';
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'registered';
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS city_hub VARCHAR(100);
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS city VARCHAR(100);
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS pass_type VARCHAR(100) DEFAULT 'Delegate (With Dinner)';
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS pass_amount NUMERIC(10, 2) DEFAULT 0;

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
        payment_status VARCHAR(50) DEFAULT 'free',
        payment_ref VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        award_year VARCHAR(10) DEFAULT '2027',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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

      -- 15. Speakers & Evaluation Panelists
      CREATE TABLE IF NOT EXISTS web_speakers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        designation VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        category VARCHAR(255) DEFAULT 'Keynote & Jury',
        description TEXT,
        event_edition VARCHAR(120) DEFAULT 'Fempreneur 2027',
        photo_url VARCHAR(500),
        display_order INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed existing website speakers into web_speakers only if table is empty (prevents duplicates)
    const speakerCountRes = await query(`SELECT COUNT(*)::int AS cnt FROM web_speakers`);
    if ((speakerCountRes.rows[0]?.cnt || 0) === 0) {
      const initialSpeakers = [
        ['Samir Sinha', 'Founder & MD', 'Savvy Group', 'Real Estate & Infrastructure', 'Distinguished keynote speaker and real estate industry leader.', 'Fempreneur 2027', '/images/speakers/speakers-hero-showcase.jpg', 1],
        ['Dr. Meera Nambiar', 'Venture Partner & Director', 'Ankur Capital', 'Venture Capital & Growth', 'Early-stage venture investor supporting women-led startups.', 'Fempreneur 2027', '/images/speakers/speakers-keynote-real.png', 2],
        ['Pravin Parmar', 'Founder & CEO', 'VyapaarJagat.com | 1MEIF', 'MSME Ecosystem & Media', 'Founder of VyapaarJagat.com & 1MEIF driving MSME visibility across India.', 'Fempreneur 2027', '/images/about/pravin-parmar-founder.jpg', 3],
        ['Dr. Sunita Sharma', 'Senior Advisor & Dean', 'AMA Ahmedabad', 'Governance & Education', 'Academic leader and governance advisor for emerging entrepreneurs.', 'Fempreneur 2027', '/images/nominate/nominate-awards-application.jpg', 4],
        ['Nilesh Priyadarshi', 'Founder & CEO', 'Kaarigar Clinic', 'Rural Enterprise & Crafts', 'Championing artisan-led rural enterprises and sustainable crafts.', 'Fempreneur 2027', '/images/partners/corporate-partner-signing.jpg', 5],
        ['Radhika Merchant', 'Managing Director', 'Encore Healthcare & Bio', 'Healthcare & Biotech', 'Healthcare and biotechnology executive driving clinical innovation.', 'Fempreneur 2027', '/images/categories/award-categories-real.png', 6],
        ['Ananya Birla', 'Founder & Chairperson', 'Svatantra Microfin', 'Financial Inclusion', 'Pioneering financial inclusion for women micro-entrepreneurs.', 'Fempreneur 2027', '/images/speakers/speakers-hero-showcase.png', 7],
        ['Dr. Sachin Shigwan', 'The Solar Man of India', 'Green Innovation Labs', 'CleanTech & ESG', 'Clean energy innovator and ESG mentor.', 'Fempreneur 2027', '/images/events/awards-stage-ceremony.jpg', 8],
        ['Vinod Malviya', 'Co-Founder & Director', 'Shubham Aquavitro Pvt Ltd', 'Manufacturing & Exports', 'Manufacturing and export scale-up leader.', 'Fempreneur 2027', '/images/about/who-we-are-real-event.jpg', 9],
        ['Dr. Akshay Kumar', 'Founder & Director', 'BroGhar Realty Pvt. Ltd.', 'Commercial Scaling', 'Commercial real estate and venture scaling mentor.', 'Fempreneur 2027', '/images/awards/awards-stage-winners-clean.png', 10],
      ];
      for (const sp of initialSpeakers) {
        await query(
          `INSERT INTO web_speakers (name, designation, company, category, description, event_edition, photo_url, display_order, is_active)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 1)`,
          sp
        );
      }
      console.log('✓ Seeded 10 initial website speakers into web_speakers');
    }
    console.log('✓ Verified and initialized all web_* tables in PostgreSQL');
  } catch (err) {
    console.warn('Database connection / initialization check warning:', err.message);
  }
};
