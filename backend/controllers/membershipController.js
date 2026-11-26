import { query } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const enrollMembership = async (req, res, next) => {
  try {
    const { fullName, email, phone, tier, businessName, companyName, designation, city } = req.body;

    if (!fullName || !email || !phone || !tier) {
      return errorResponse(res, 'Full name, email, phone, and membership tier are required.', 400);
    }

    const tierLower = tier.toLowerCase();
    let annualFee = 0;
    let normalizedTier = 'starter';
    if (tierLower.includes('legacy')) {
      annualFee = 10000;
      normalizedTier = 'legacy';
    } else if (tierLower.includes('growth')) {
      annualFee = 7500;
      normalizedTier = 'growth';
    } else if (tierLower.includes('starter') || tierLower.includes('pro')) {
      annualFee = 5000;
      normalizedTier = tierLower.includes('pro') ? 'pro' : 'starter';
    } else if (tierLower.includes('elite')) {
      annualFee = 25000;
      normalizedTier = 'elite';
    } else {
      normalizedTier = 'free';
    }

    const userPhotoFile = req.files?.userPhoto?.[0];
    const businessLogoFile = req.files?.businessLogo?.[0];
    const userPhotoUrl = userPhotoFile ? `/uploads/memberships/${userPhotoFile.filename}` : null;
    const businessLogoUrl = businessLogoFile ? `/uploads/memberships/${businessLogoFile.filename}` : null;
    const resolvedCompany = (companyName || businessName || '').trim() || 'Venture';
    const resolvedDesignation = (designation || '').trim() || null;

    const result = await query(`
      INSERT INTO web_community_applications
        (name, email, phone, tier, annual_fee, company, designation, user_photo_url, business_logo_url, city, sector, interest, why_join, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'General', 'Community Membership', 'Platform Registration', 'applied')
      RETURNING *
    `, [
      fullName.trim(),
      email.toLowerCase().trim(),
      phone.trim(),
      normalizedTier,
      annualFee,
      resolvedCompany,
      resolvedDesignation,
      userPhotoUrl,
      businessLogoUrl,
      city || 'India',
    ]);

    return successResponse(res, result.rows[0], `Successfully registered for ${tier} membership.`, 201);
  } catch (err) {
    next(err);
  }
};

export const getMemberships = async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM web_community_applications ORDER BY created_at DESC');
    return successResponse(res, result.rows, 'Memberships retrieved successfully.');
  } catch (err) {
    next(err);
  }
};
