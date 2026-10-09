import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import apiRoutes from './routes/index.js';
import { initializeDatabase } from './models/initDb.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

// Start server after verifying PostgreSQL schema
const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`  Fempreneur 2027 REST API Server`);
      console.log(`  Running on: http://localhost:${PORT}`);
      console.log(`  Health Check: http://localhost:${PORT}/api/health`);
      console.log(`====================================================`);
    });
  } catch (err) {
    console.error('Fatal: Failed to connect or initialize PostgreSQL database:', err);
    process.exit(1);
  }
};

startServer();
