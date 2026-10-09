import { query } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const submitInquiry = async (req, res, next) => {
  try {
    const { type, fullName, email, phone, subjectOrTier, messageOrTopic, city, organization } = req.body;

    if (!type || !fullName || !email) {
      return errorResponse(res, 'Inquiry type, full name, and email are required.', 400);
    }

    const result = await query(`
      INSERT INTO web_inquiries (inquiry_type, name, email, phone, subject, message, city, organization)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [
      type.trim(),
      fullName.trim(),
      email.toLowerCase().trim(),
      phone ? phone.trim() : null,
      subjectOrTier || null,
      messageOrTopic || null,
      city || null,
      organization || null,
    ]);

    return successResponse(res, result.rows[0], 'Inquiry registered. You will receive a response within 24–48 hours.', 201);
  } catch (err) {
    next(err);
  }
};

export const getInquiries = async (req, res, next) => {
  try {
    const { type } = req.query;
    let sql = 'SELECT * FROM web_inquiries';
    const params = [];

    if (type) {
      params.push(type);
      sql += ' WHERE inquiry_type = $1';
    }

    sql += ' ORDER BY created_at DESC';

    const result = await query(sql, params);
    return successResponse(res, result.rows, 'Inquiries retrieved successfully.');
  } catch (err) {
    next(err);
  }
};
