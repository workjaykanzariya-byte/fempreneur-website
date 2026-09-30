import { query } from '../config/db.js';
import bcrypt from 'bcryptjs';

export const initializeDatabase = async () => {
  try {
    console.log('Initializing PostgreSQL tables...');

    // 1. Users table (for admin & authenticated members)
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Nominations table (40 award categories, 100% free nomination)
    await query(`
      CREATE TABLE IF NOT EXISTS nominations (
        id SERIAL PRIMARY KEY,
        founder_name VARCHAR(255) NOT NULL,
        venture_name VARCHAR(255) NOT NULL,
        designation VARCHAR(150),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100),
        category_code VARCHAR(50) NOT NULL,
        category_name VARCHAR(255) NOT NULL,
        pitch TEXT NOT NULL,
        operational_years VARCHAR(50),
        impact_summary TEXT,
        website_url VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Votes table (50% public voting, 1 vote per verified email per nominee)
    await query(`
      CREATE TABLE IF NOT EXISTS votes (
        id SERIAL PRIMARY KEY,
        nominee_slug VARCHAR(255) NOT NULL,
        nominee_name VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        voter_email VARCHAR(255) NOT NULL,
        ip_address VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_voter_per_nominee UNIQUE(nominee_slug, voter_email)
      );
    `);

    // 4. Memberships table (Free, Pro ₹5,000, Elite ₹25,000)
    await query(`
      CREATE TABLE IF NOT EXISTS memberships (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        tier VARCHAR(50) NOT NULL,
        annual_fee NUMERIC(10, 2) DEFAULT 0,
        business_name VARCHAR(255),
        city VARCHAR(100),
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 5. Event Registrations table (Ahmedabad vs Delhi NCR, pass tiers)
    await query(`
      CREATE TABLE IF NOT EXISTS event_registrations (
        id SERIAL PRIMARY KEY,
        attendee_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        organization VARCHAR(255),
        city_hub VARCHAR(50) NOT NULL,
        pass_tier VARCHAR(100) NOT NULL,
        price NUMERIC(10, 2) DEFAULT 0,
        status VARCHAR(50) DEFAULT 'confirmed',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 6. Book Orders table (Coffee table book ₹2,999 + Pathway 04 applications)
    await query(`
      CREATE TABLE IF NOT EXISTS book_orders (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        quantity INTEGER DEFAULT 1,
        unit_price NUMERIC(10, 2) DEFAULT 2999,
        total_price NUMERIC(10, 2) NOT NULL,
        delivery_address TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'reserved',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 7. Story Submissions table (VyapaarJagat 1,000 Stories Drive)
    await query(`
      CREATE TABLE IF NOT EXISTS story_submissions (
        id SERIAL PRIMARY KEY,
        founder_name VARCHAR(255) NOT NULL,
        venture_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        story_title VARCHAR(255),
        narrative TEXT NOT NULL,
        impact_milestone TEXT,
        website_or_social VARCHAR(255),
        status VARCHAR(50) DEFAULT 'in_review',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 8. Inquiries table (Contact, Partnership, Speaker, Chapter Applications)
    await query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        subject_or_tier VARCHAR(255),
        message_or_topic TEXT,
        city VARCHAR(100),
        organization VARCHAR(255),
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 9. Newsletter Subscribers table
    await query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        status VARCHAR(50) DEFAULT 'subscribed',
        subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create default admin user if not exists
    const adminCheck = await query(`SELECT id FROM users WHERE email = 'admin@fempreneur.in'`);
    if (adminCheck.rows.length === 0) {
      const hashedPw = await bcrypt.hash('FempreneurAdmin2027!', 10);
      await query(`
        INSERT INTO users (name, email, password, role)
        VALUES ('Fempreneur Administrator', 'admin@fempreneur.in', $1, 'admin')
      `, [hashedPw]);
      console.log('✓ Default admin user seeded: admin@fempreneur.in');
    }

    console.log('✓ All PostgreSQL schema tables verified successfully.');
  } catch (err) {
    console.error('Error initializing database tables:', err);
    throw err;
  }
};
