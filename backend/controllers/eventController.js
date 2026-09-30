import { query } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const registerEventPass = async (req, res, next) => {
  try {
    const { attendeeName, email, phone, organization, cityHub, passTier, price } = req.body;

    if (!attendeeName || !email || !phone || !cityHub || !passTier) {
      return errorResponse(res, 'Attendee name, email, phone, cityHub, and passTier are required.', 400);
    }

    const result = await query(`
      INSERT INTO event_registrations (
        attendee_name, email, phone, organization, city_hub, pass_tier, price
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [
      attendeeName.trim(),
      email.toLowerCase().trim(),
      phone.trim(),
      organization || null,
      cityHub.trim(),
      passTier.trim(),
      price || 0,
    ]);

    return successResponse(res, result.rows[0], 'Event delegate pass reserved successfully.', 201);
  } catch (err) {
    next(err);
  }
};

export const getEventRegistrations = async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM event_registrations ORDER BY created_at DESC');
    return successResponse(res, result.rows, 'Registrations retrieved.');
  } catch (err) {
    next(err);
  }
};
