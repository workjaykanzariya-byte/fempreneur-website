import { query } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const registerEventPass = async (req, res, next) => {
  try {
    const { attendeeName, email, phone, organization, cityHub, passTier, price } = req.body;

    if (!attendeeName || !email || !phone || !cityHub || !passTier) {
      return errorResponse(res, 'Attendee name, email, phone, cityHub, and passTier are required.', 400);
    }

    const result = await query(`
      INSERT INTO web_event_registrations (
        name, email, phone, organization, city_hub, pass_type, pass_amount, city
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [
      attendeeName.trim(),
      email.toLowerCase().trim(),
      phone.trim(),
      organization || null,
      cityHub.trim(),
      passTier.trim().toLowerCase().includes('vip') ? 'vip' : 'general',
      price || 0,
      cityHub.trim(),
    ]);

    return successResponse(res, result.rows[0], 'Event delegate pass reserved successfully.', 201);
  } catch (err) {
    next(err);
  }
};

export const getEventRegistrations = async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM web_event_registrations ORDER BY created_at DESC');
    return successResponse(res, result.rows, 'Registrations retrieved.');
  } catch (err) {
    next(err);
  }
};
