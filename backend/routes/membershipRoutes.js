import { Router } from 'express';
import { enrollMembership, getMemberships } from '../controllers/membershipController.js';
import { authenticate, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', enrollMembership);
router.get('/', authenticate, requireAdmin, getMemberships);

export default router;
