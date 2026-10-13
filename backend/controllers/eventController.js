
import { query } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

let columnsEnsured = false;
export const ensureEventRegistrationColumns = async () => {
  if (columnsEnsured) return;
  try {
    await query(`
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS attendee_segment VARCHAR(255);
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS event_date TIMESTAMP WITH TIME ZONE DEFAULT '2027-03-08 18:30:00+00';
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS event_venue VARCHAR(255) DEFAULT 'Renaissance by Marriott, S.G. Highway, Ahmedabad';
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS order_id VARCHAR(255);
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS payment_ref VARCHAR(255);
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'pending';
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'registered';
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS city_hub VARCHAR(100);
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS city VARCHAR(100);
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS pass_type VARCHAR(100) DEFAULT 'Delegate (With Dinner)';
      ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS pass_amount NUMERIC(10, 2) DEFAULT 0;
    `);
    columnsEnsured = true;
  } catch (err) {
    console.warn('Auto-migration for web_event_registrations warning:', err.message);
  }
};

export const registerEventPass = async (req, res, next) => {
  try {
    const attendeeName = req.body.attendeeName || req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const organization = req.body.organization || req.body.segment || req.body.attendeeSegment || 'Women Entrepreneur';
    const cityHub = req.body.cityHub || req.body.city || 'Ahmedabad, Gujarat';
    const passTier = req.body.passTier || req.body.passOption || req.body.pass_type || 'Delegate (With Dinner)';
    const price = req.body.price !== undefined ? req.body.price : req.body.amount;

    if (!attendeeName || !email || !phone) {
      return errorResponse(res, 'Attendee name, email, and phone are required.', 400);
    }

    const cleanPassTier = passTier.trim();
    const cleanAmount = price !== undefined && price !== null && !isNaN(price) ? Number(price) : (cleanPassTier.toLowerCase().includes('dinner') ? 1500 : 750);
    const cleanCity = cityHub.trim();
    const cleanOrg = organization ? organization.trim() : 'Women Entrepreneur';

    // Auto-ensure required columns exist in PostgreSQL
    await ensureEventRegistrationColumns();

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

      // Attempt migration on-the-fly if missing column caused error
      try {
        await query(`ALTER TABLE web_event_registrations ADD COLUMN IF NOT EXISTS attendee_segment VARCHAR(255);`);
        const retryRes = await query(`
          INSERT INTO web_event_registrations (
            name, email, phone, organization, attendee_segment, city_hub, city, pass_type, pass_amount, payment_status, status
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending', 'registered')
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
        insertedRow = retryRes.rows[0];
      } catch (retryErr) {
        // Fallback 1: Insert without attendee_segment column
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
          // Fallback 2: Minimal standard columns
          try {
            const result3 = await query(`
              INSERT INTO web_event_registrations (
                name, email, phone, organization, city, pass_type, pass_amount
              ) VALUES ($1, $2, $3, $4, $5, $6, $7)
              RETURNING *
            `, [
              attendeeName.trim(),
              email.toLowerCase().trim(),
              phone.trim(),
              cleanOrg,
              cleanCity,
              cleanPassTier,
              cleanAmount,
            ]);
            insertedRow = result3.rows[0];
          } catch (dbErr3) {
            // Fallback 3: Bare essential columns
            const result4 = await query(`
              INSERT INTO web_event_registrations (
                name, email, phone
              ) VALUES ($1, $2, $3)
              RETURNING *
            `, [
              attendeeName.trim(),
              email.toLowerCase().trim(),
              phone.trim(),
            ]);
            insertedRow = result4.rows[0];
          }
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
