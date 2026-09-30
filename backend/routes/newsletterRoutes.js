import { Router } from 'express';
import { subscribe, getSubscribers } from '../controllers/newsletterController.js';
import { authenticate, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/subscribe', subscribe);
router.get('/subscribers', authenticate, requireAdmin, getSubscribers);

export default router;
