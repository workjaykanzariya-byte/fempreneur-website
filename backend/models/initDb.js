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

      -- 3. Nominations (Matching Adminer & Laravel structure exactly)
      CREATE TABLE IF NOT EXISTS web_nominations (
        id SERIAL PRIMARY KEY,
        track VARCHAR(50) DEFAULT 'honorary',
        nominee_name VARCHAR(150),
        business_name VARCHAR(200),
        designation VARCHAR(150) DEFAULT 'Founder & CEO',
        phone VARCHAR(50),
        email VARCHAR(150),
        city VARCHAR(100),
        category_id INTEGER,
        category_name VARCHAR(150),
        description TEXT,
        operational_years VARCHAR(50) DEFAULT '1-3 years',
        website_link VARCHAR(500),
        profile_picture TEXT,
        business_logo TEXT,
        voting_url VARCHAR(500),
        package VARCHAR(50),
        package_amount NUMERIC(10, 2),
        status VARCHAR(50) DEFAULT 'pending',
        payment_status VARCHAR(50) DEFAULT 'not_applicable',
        payment_ref VARCHAR(200),
        jury_score SMALLINT,
        public_votes INTEGER DEFAULT 0,
        notes TEXT,
        award_year VARCHAR(10) DEFAULT '2027',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Ensure all columns from live Adminer (Screenshot 3) exist
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS track VARCHAR(50) DEFAULT 'honorary';
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS nominee_name VARCHAR(150);
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS business_name VARCHAR(200);
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS designation VARCHAR(150) DEFAULT 'Founder & CEO';
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS email VARCHAR(150);
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS city VARCHAR(100);
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS category_id INTEGER;
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS category_name VARCHAR(150);
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS description TEXT;
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS operational_years VARCHAR(50) DEFAULT '1-3 years';
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS website_link VARCHAR(500);
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS profile_picture TEXT;
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS business_logo TEXT;
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS voting_url VARCHAR(500);
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS package VARCHAR(50);
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS package_amount NUMERIC(10, 2);
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending';
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'not_applicable';
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS payment_ref VARCHAR(200);
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS jury_score SMALLINT;
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS public_votes INTEGER DEFAULT 0;
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS notes TEXT;
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS award_year VARCHAR(10) DEFAULT '2027';
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

      -- Ensure compatibility columns queried by Laravel Admin Panel (unity.fempreneur.club)
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS founder_name VARCHAR(150);
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS venture_name VARCHAR(200);
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS category_code VARCHAR(150);
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS pitch TEXT;
      ALTER TABLE web_nominations ADD COLUMN IF NOT EXISTS website_url VARCHAR(500);

      -- Ensure profile_picture and business_logo allow full image URLs / base64 without failing
      ALTER TABLE web_nominations ALTER COLUMN profile_picture TYPE TEXT;
      ALTER TABLE web_nominations ALTER COLUMN business_logo TYPE TEXT;

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
    `);

    // Synchronize compatibility columns and mark verified payments
    try {
      await query(`
        UPDATE web_nominations
        SET 
          founder_name = COALESCE(founder_name, nominee_name),
          venture_name = COALESCE(venture_name, business_name),
          category_code = COALESCE(category_code, category_name),
          pitch = COALESCE(pitch, description),
          website_url = COALESCE(website_url, website_link),
          updated_at = COALESCE(updated_at, created_at, NOW())
        WHERE founder_name IS NULL OR venture_name IS NULL OR category_code IS NULL;

        -- Update row 3 to Rated Challenge (Identity Package, Paid) as completed by user
        UPDATE web_nominations
        SET 
          track = 'rated',
          package = 'identity',
          package_amount = 2000,
          payment_status = 'paid',
          payment_ref = COALESCE(payment_ref, 'PAID_VERIFIED'),
          status = 'pending'
        WHERE id = 3;
      `);
    } catch (migErr) {
      console.warn('web_nominations sync update warning:', migErr.message);
    }

    console.log('✓ Verified and initialized all web_* tables in PostgreSQL');
  } catch (err) {
    console.warn('Database connection / initialization check warning:', err.message);
  }
};
