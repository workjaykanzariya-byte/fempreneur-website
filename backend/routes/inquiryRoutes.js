import { Router } from 'express';
import { submitInquiry, getInquiries } from '../controllers/inquiryController.js';
import { authenticate, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', submitInquiry);
router.get('/', authenticate, requireAdmin, getInquiries);

export default router;
