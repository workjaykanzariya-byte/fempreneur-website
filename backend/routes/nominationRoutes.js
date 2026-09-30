import { Router } from 'express';
import { createNomination, getNominations, getNominationById } from '../controllers/nominationController.js';

const router = Router();

router.post('/', createNomination);
router.get('/', getNominations);
router.get('/:id', getNominationById);

export default router;
