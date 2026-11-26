import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { enrollMembership, getMemberships } from '../controllers/membershipController.js';
import { authenticate, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

const membershipUploadDir = path.join(process.cwd(), 'uploads', 'memberships');
if (!fs.existsSync(membershipUploadDir)) {
  fs.mkdirSync(membershipUploadDir, { recursive: true });
}

const membershipStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, membershipUploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const prefix = file.fieldname === 'businessLogo' ? 'logo-' : 'user-';
    cb(null, prefix + uniqueSuffix + path.extname(file.originalname));
  },
});

const uploadMembershipFiles = multer({
  storage: membershipStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
  '/',
  uploadMembershipFiles.fields([
    { name: 'userPhoto', maxCount: 1 },
    { name: 'businessLogo', maxCount: 1 },
  ]),
  enrollMembership
);
router.get('/', authenticate, requireAdmin, getMemberships);

export default router;
