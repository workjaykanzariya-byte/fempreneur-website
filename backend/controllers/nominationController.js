import { query } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const createNomination = async (req, res, next) => {
  try {
    const {
      founderName,
      ventureName,
      designation,
      email,
      phone,
      city,
      state,
      categoryCode,
      categoryName,
      pitch,
      operationalYears,
      impactSummary,
      websiteUrl,
    } = req.body;

    if (!founderName || !ventureName || !email || !phone || !city || !categoryCode || !pitch) {
      return errorResponse(res, 'Please provide all mandatory fields: founderName, ventureName, email, phone, city, categoryCode, and pitch.', 400);
    }

    let insertedRow = null;
    try {
      const result = await query(`
        INSERT INTO web_nominations (
          nominee_name, business_name, designation, email, phone, city,
          category_name, description, operational_years, website_link, status, award_year
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending', '2027')
        RETURNING *
      `, [
        founderName.trim(),
        ventureName.trim(),
        designation || 'Founder',
        email.toLowerCase().trim(),
        phone.trim(),
        city.trim(),
        categoryName || categoryCode,
        pitch.trim(),
        operationalYears || '1-3 years',
        websiteUrl || null,
      ]);
      insertedRow = result.rows[0];
    } catch (dbErr) {
      console.warn('web_nominations insert attempt:', dbErr.message);
      try {
        const fbRes = await query(`
          INSERT INTO nominations (
            founder_name, venture_name, designation, email, phone, city,
            category_name, pitch, operational_years, website_url, status
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending')
          RETURNING *
        `, [
          founderName.trim(),
          ventureName.trim(),
          designation || 'Founder',
          email.toLowerCase().trim(),
          phone.trim(),
          city.trim(),
          categoryName || categoryCode,
          pitch.trim(),
          operationalYears || '1-3 years',
          websiteUrl || null,
        ]);
        insertedRow = fbRes.rows[0];
      } catch (fbErr) {
        throw dbErr;
      }
    }

    return successResponse(
      res,
      insertedRow,
      'Nomination submitted successfully with 100% free processing.',
      201
    );
  } catch (err) {
    next(err);
  }
};

export const getNominations = async (req, res, next) => {
  try {
    const { category, city, status } = req.query;

    let sql = 'SELECT * FROM web_nominations WHERE 1=1';
    const params = [];

    if (category) {
      params.push(category);
      sql += ` AND category_name = $${params.length}`;
    }

    if (city) {
      params.push(`%${city}%`);
      sql += ` AND city ILIKE $${params.length}`;
    }

    if (status) {
      params.push(status);
      sql += ` AND status = $${params.length}`;
    }

    sql += ' ORDER BY created_at DESC';

    const result = await query(sql, params);
    return successResponse(res, result.rows, 'Nominations retrieved successfully.');
  } catch (err) {
    next(err);
  }
};

export const getNominationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM web_nominations WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return errorResponse(res, 'Nomination record not found.', 404);
    }

    return successResponse(res, result.rows[0], 'Nomination fetched successfully.');
  } catch (err) {
    next(err);
  }
};
