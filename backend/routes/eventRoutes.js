import { Router } from 'express';
import { registerEventPass, getEventRegistrations } from '../controllers/eventController.js';
import { authenticate, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', registerEventPass);
router.get('/', authenticate, requireAdmin, getEventRegistrations);

export default router;
