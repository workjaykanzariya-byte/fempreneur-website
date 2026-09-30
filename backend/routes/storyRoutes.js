import { Router } from 'express';
import { submitStory, getStories } from '../controllers/storyController.js';
import { authenticate, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/submit', submitStory);
router.get('/', getStories);

export default router;
