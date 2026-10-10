import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables across standard local & production paths
try {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
  dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
  dotenv.config({ path: '/home/fempreneur/apps/fempreneur/.env' });
} catch (e) {}

const defaultDbUrl = 'postgresql://postgres:root@localhost:5432/fempreneurbackend';
const connectionString = process.env.DATABASE_URL || defaultDbUrl;

const pool = new Pool({
  connectionString,
});

pool.on('connect', () => {
  console.log(`✓ Connected to PostgreSQL database: ${connectionString.split('/').pop()?.split('?')[0] || 'fempreneurbackend'}`);
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err.message);
});

export const query = (text, params) => pool.query(text, params);
export default pool;
