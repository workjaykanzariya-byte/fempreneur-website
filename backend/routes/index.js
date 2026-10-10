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

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Fempreneur 2027 REST API',
    database: 'PostgreSQL Connected',
  });
});

export default router;
