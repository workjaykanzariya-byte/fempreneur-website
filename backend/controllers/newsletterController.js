import { query } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return errorResponse(res, 'Email address is required.', 400);
    }

    const emailClean = email.toLowerCase().trim();

    // Check if already subscribed
    const existing = await query('SELECT id FROM newsletter_subscribers WHERE email = $1', [emailClean]);
    if (existing.rows.length > 0) {
      return successResponse(res, { email: emailClean }, 'You are already subscribed to the Fempreneur newsletter.');
    }

    const result = await query(
      'INSERT INTO newsletter_subscribers (email) VALUES ($1) RETURNING *',
      [emailClean]
    );

    return successResponse(res, result.rows[0], 'Successfully subscribed to Fempreneur newsletter updates.', 201);
  } catch (err) {
    next(err);
  }
};

export const getSubscribers = async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC');
    return successResponse(res, result.rows, 'Subscribers list retrieved.');
  } catch (err) {
    next(err);
  }
};
