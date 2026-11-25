import { Router } from 'express';
import {
  createNomination,
  getNominations,
  getNominationById,
  getNominationBySlugOrId,
  getPublicNominations,
  checkDuplicateNomination,
} from '../controllers/nominationController.js';

const router = Router();

router.get('/check-duplicate', checkDuplicateNomination);
router.post('/check-duplicate', checkDuplicateNomination);
router.post('/', createNomination);
router.get('/', getNominations);
router.get('/public', getPublicNominations);
router.get('/public/:slugOrId', getNominationBySlugOrId);
router.get('/:id', getNominationById);

export default router;

