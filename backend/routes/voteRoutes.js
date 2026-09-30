import { Router } from 'express';
import { castVote, getVoteCounts } from '../controllers/voteController.js';

const router = Router();

router.post('/', castVote);
router.get('/counts', getVoteCounts);

export default router;
