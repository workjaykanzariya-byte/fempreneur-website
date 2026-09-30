import { Router } from 'express';
import { createBookOrder, getBookOrders } from '../controllers/bookController.js';
import { authenticate, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/order', createBookOrder);
router.get('/orders', authenticate, requireAdmin, getBookOrders);

export default router;
