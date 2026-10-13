import { query } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const createNomination = async (req, res, next) => {
  try {
    const {
      track = 'honorary',
      name,
      nomineeName,
      founderName,
      business,
      businessName,
      ventureName,
      companyName,
      designation = 'Founder',
      email,
      phone,
      city,
      state,
      category,
      categoryCode,
      categoryName,
      description,
      pitch,
      operationalYears,
      impactSummary,
      link,
      websiteUrl,
      websiteLink,
      profilePicture,
      businessLogo,
      package: pkg = 'identity',
    } = req.body;

    const finalNomineeName = (name || nomineeName || founderName || '').trim();
    const finalBusinessName = (business || businessName || ventureName || companyName || '').trim();
    const finalEmail = (email || '').toLowerCase().trim();
    const finalPhone = (phone || '').trim();
    const finalCity = (city || '').trim();
    const finalCategory = (category || categoryName || categoryCode || 'Woman Entrepreneur of the Year').trim();
    const finalDescription = (description || pitch || '').trim();
    const finalLink = (link || websiteUrl || websiteLink || '').trim() || null;
    const finalTrack = track === 'rated' ? 'rated' : 'honorary';

    if (!finalNomineeName || !finalBusinessName || !finalEmail || !finalPhone || !finalCity) {
      return errorResponse(res, 'Please provide all mandatory fields: Nominee Full Name, Business Name, Email, Phone, and City & State.', 400);
    }

    // Determine package amount if rated
    let packageAmount = 0;
    if (finalTrack === 'rated') {
      if (pkg === 'identity') packageAmount = 2000;
      else if (pkg === 'change_maker') packageAmount = 3000;
      else if (pkg === 'fame_india') packageAmount = 5000;
      else if (pkg === 'impact_creator') packageAmount = 10000;
      else packageAmount = 2000;
    }

    // Clean voting URL
    const slug = finalNomineeName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const votingUrl = `/voting?nominee=${slug}-${Date.now().toString().slice(-4)}`;

    let insertedRow = null;
    try {
      const result = await query(`
        INSERT INTO web_nominations (
          track, nominee_name, business_name, designation, phone, email, city,
          category_name, description, operational_years, website_link,
          profile_picture, business_logo, voting_url, package, package_amount,
          status, payment_status, award_year
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7,
          $8, $9, $10, $11,
          $12, $13, $14, $15, $16,
          'pending', $17, '2027'
        )
        RETURNING *
      `, [
        finalTrack,
        finalNomineeName,
        finalBusinessName,
        designation,
        finalPhone,
        finalEmail,
        finalCity,
        finalCategory,
        finalDescription,
        operationalYears || '1-3 years',
        finalLink,
        profilePicture || null,
        businessLogo || null,
        votingUrl,
        pkg,
        packageAmount,
        finalTrack === 'rated' ? 'pending' : 'completed'
      ]);
      insertedRow = result.rows[0];
    } catch (dbErr) {
      console.warn('web_nominations insert attempt:', dbErr.message);
      try {
        const fbRes = await query(`
          INSERT INTO web_nominations (
            nominee_name, business_name, designation, email, phone, city,
            category_name, description, operational_years, website_link, status, award_year
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending', '2027')
          RETURNING *
        `, [
          finalNomineeName,
          finalBusinessName,
          designation,
          finalEmail,
          finalPhone,
          finalCity,
          finalCategory,
          finalDescription,
          operationalYears || '1-3 years',
          finalLink,
        ]);
        insertedRow = fbRes.rows[0];
      } catch (fbErr) {
        console.warn('Fallback web_nominations error:', fbErr.message);
        const legRes = await query(`
          INSERT INTO nominations (
            founder_name, venture_name, designation, email, phone, city,
            category_name, pitch, operational_years, website_url, status
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending')
          RETURNING *
        `, [
          finalNomineeName,
          finalBusinessName,
          designation,
          finalEmail,
          finalPhone,
          finalCity,
          finalCategory,
          finalDescription,
          operationalYears || '1-3 years',
          finalLink,
        ]);
        insertedRow = legRes.rows[0];
      }
    }

    return successResponse(
      res,
      {
        ...insertedRow,
        voting_url: votingUrl,
      },
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
