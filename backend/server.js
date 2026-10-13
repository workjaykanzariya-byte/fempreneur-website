import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import apiRoutes from './routes/index.js';
import { initializeDatabase } from './models/initDb.js';
import { errorHandler } from './middleware/errorHandler.js';

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

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5001;

// Security & Parsing Middleware
app.use(cors({
  origin: '*', // Adjust or specify allowed origins for production
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Root welcome message
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Fempreneur 2027 REST API Backend',
    documentation: '/api/health',
    version: '1.0.0',
    organizers: '1 Million Entrepreneurs International Forum (1MEIF) & VyapaarJagat.com',
  });
});

// Mount API routes
app.use('/api', apiRoutes);

// 404 Handler for unmatched endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found.`,
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Helper to bind server with graceful EADDRINUSE fallback
const listenWithFallback = (port, retries = 5) => {
  const server = app.listen(port, () => {
    console.log(`====================================================`);
    console.log(`  🚀 Fempreneur 2027 REST API Server`);
    console.log(`  Running on: http://localhost:${port}`);
    console.log(`  Health Check: http://localhost:${port}/api/health`);
    console.log(`====================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && retries > 0) {
      console.warn(`⚠️ Port ${port} is in use by another service. Retrying on port ${port + 1}...`);
      listenWithFallback(port + 1, retries - 1);
    } else {
      console.error('Fatal server listen error:', err);
    }
  });
};

// Start server with resilient error handling
const startServer = async () => {
  try {
    try {
      await initializeDatabase();
    } catch (dbErr) {
      console.warn('⚠️ Database initialization warning (server continuing in resilient mode):', dbErr.message);
    }

    listenWithFallback(PORT);
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

startServer();
