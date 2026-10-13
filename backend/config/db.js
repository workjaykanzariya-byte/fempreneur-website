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
let connectionString = process.env.DATABASE_URL || defaultDbUrl;

// Ensure database name targets the unified live database: fempreneurbackend
if (connectionString && (connectionString.includes('fempreneur_2027') || connectionString.includes('fempreneur_local'))) {
  console.warn('⚠️ Redirecting DATABASE_URL to unified database: fempreneurbackend');
  connectionString = connectionString.replace('fempreneur_2027', 'fempreneurbackend').replace('fempreneur_local', 'fempreneurbackend');
}

const pool = new Pool({
  connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('connect', () => {
  const dbName = connectionString.split('/').pop()?.split('?')[0] || 'fempreneurbackend';
  console.log(`✓ Connected to PostgreSQL database: ${dbName}`);
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err.message);
});

export const query = (text, params) => pool.query(text, params);
export default pool;
