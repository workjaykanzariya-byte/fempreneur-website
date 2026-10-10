import { query } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const registerEventPass = async (req, res, next) => {
  try {
    const { attendeeName, email, phone, organization, cityHub, passTier, price } = req.body;

    if (!attendeeName || !email || !phone || !cityHub || !passTier) {
      return errorResponse(res, 'Attendee name, email, phone, cityHub, and passTier are required.', 400);
    }

    const cleanPassTier = passTier.trim();
    const cleanAmount = price !== undefined && price !== null && !isNaN(price) ? Number(price) : (cleanPassTier.toLowerCase().includes('dinner') ? 1500 : 750);
    const cleanCity = cityHub.trim();
    const cleanOrg = organization ? organization.trim() : 'Women Entrepreneur';

    let insertedRow = null;
    try {
      const result = await query(`
        INSERT INTO web_event_registrations (
          name, email, phone, organization, attendee_segment, city_hub, city, pass_type, pass_amount, event_date, event_venue, payment_status, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, '2027-03-08 18:30:00+00', 'Renaissance by Marriott, S.G. Highway, Ahmedabad', 'pending', 'registered')
        RETURNING *
      `, [
        attendeeName.trim(),
        email.toLowerCase().trim(),
        phone.trim(),
        cleanOrg,
        cleanOrg,
        cleanCity,
        cleanCity,
        cleanPassTier,
        cleanAmount,
      ]);
      insertedRow = result.rows[0];
    } catch (dbErr) {
      console.warn('web_event_registrations detailed insert fallback:', dbErr.message);
      try {
        const result2 = await query(`
          INSERT INTO web_event_registrations (
            name, email, phone, organization, city_hub, pass_type, pass_amount, city
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *
        `, [
          attendeeName.trim(),
          email.toLowerCase().trim(),
          phone.trim(),
          cleanOrg,
          cleanCity,
          cleanPassTier,
          cleanAmount,
          cleanCity,
        ]);
        insertedRow = result2.rows[0];
      } catch (dbErr2) {
        try {
          const fbRes = await query(`
            INSERT INTO event_registrations (
              attendee_name, email, phone, city_hub, pass_tier, price, status
            ) VALUES ($1, $2, $3, $4, $5, $6, 'registered')
            RETURNING *
          `, [attendeeName.trim(), email.toLowerCase().trim(), phone.trim(), cleanCity, cleanPassTier, cleanAmount]);
          insertedRow = fbRes.rows[0];
        } catch (fbErr) {
          throw dbErr;
        }
      }
    }

    return successResponse(res, insertedRow, 'Event delegate pass reserved successfully.', 201);
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
