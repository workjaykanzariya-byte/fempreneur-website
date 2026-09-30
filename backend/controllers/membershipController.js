import { query } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const enrollMembership = async (req, res, next) => {
  try {
    const { fullName, email, phone, tier, businessName, city } = req.body;

    if (!fullName || !email || !phone || !tier) {
      return errorResponse(res, 'Full name, email, phone, and membership tier are required.', 400);
    }

    const tierLower = tier.toLowerCase();
    let annualFee = 0;
    if (tierLower.includes('pro')) annualFee = 5000;
    else if (tierLower.includes('elite')) annualFee = 25000;

    const result = await query(`
      INSERT INTO memberships (full_name, email, phone, tier, annual_fee, business_name, city)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [
      fullName.trim(),
      email.toLowerCase().trim(),
      phone.trim(),
      tier.trim(),
      annualFee,
      businessName || null,
      city || null,
    ]);

    return successResponse(res, result.rows[0], `Successfully registered for ${tier} membership.`, 201);
  } catch (err) {
    next(err);
  }
};

export const getMemberships = async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM memberships ORDER BY created_at DESC');
    return successResponse(res, result.rows, 'Memberships retrieved successfully.');
  } catch (err) {
    next(err);
  }
};
