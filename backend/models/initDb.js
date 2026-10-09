import { query } from '../config/db.js';

/**
 * Initialize Database Connection
 * NOTE: As per system architecture, all website tables use the `web_` prefix
 * to coexist safely with the mobile application tables in the shared `fempreneurbackend` database.
 * No automated migration/DDL is run here to prevent altering any existing app tables.
 */
export const initializeDatabase = async () => {
  try {
    console.log('Verifying PostgreSQL connection to fempreneurbackend...');
    const res = await query('SELECT current_database(), current_schema(), NOW() as server_time');
    if (res && res.rows && res.rows.length > 0) {
      console.log(`✓ Connected to PostgreSQL DB: ${res.rows[0].current_database} (Schema: ${res.rows[0].current_schema})`);
    }
  } catch (err) {
    console.warn('Database connection check warning:', err.message);
  }
};
