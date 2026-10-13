import { Router } from 'express';
import authRoutes from './authRoutes.js';
import nominationRoutes from './nominationRoutes.js';
import voteRoutes from './voteRoutes.js';
import membershipRoutes from './membershipRoutes.js';
import eventRoutes from './eventRoutes.js';
import bookRoutes from './bookRoutes.js';
import storyRoutes from './storyRoutes.js';
import inquiryRoutes from './inquiryRoutes.js';
import newsletterRoutes from './newsletterRoutes.js';
import statsRoutes from './statsRoutes.js';
import adminRoutes from './adminRoutes.js';
import paymentRoutes from './paymentRoutes.js';

const router = Router();

router.use('/admin', adminRoutes);
router.use('/web', adminRoutes);
router.use('/blogs', adminRoutes);
router.use('/voice-videos', adminRoutes);

router.use('/auth', authRoutes);
router.use('/nominations', nominationRoutes);
router.use('/votes', voteRoutes);
router.use('/memberships', membershipRoutes);
router.use('/events', eventRoutes);
router.use('/book', bookRoutes);
router.use('/stories', storyRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/stats', statsRoutes);
router.use('/payment', paymentRoutes);

import { query } from '../config/db.js';

// Health check endpoint with live database connectivity verification
router.get('/health', async (req, res) => {
  try {
    const dbCheck = await query('SELECT current_database(), current_schema(), NOW() as server_time');
    const dbName = dbCheck.rows[0]?.current_database || 'unknown';
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'Fempreneur 2027 REST API',
      database: 'PostgreSQL Connected',
      connected_database: dbName,
      schema: dbCheck.rows[0]?.current_schema || 'public',
      server_time: dbCheck.rows[0]?.server_time,
    });
  } catch (err) {
    res.status(503).json({
      status: 'degraded',
      timestamp: new Date().toISOString(),
      service: 'Fempreneur 2027 REST API',
      database: 'PostgreSQL Disconnected',
      error: err.message,
    });
  }
});

export default router;
