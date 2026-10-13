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
      designation = 'Founder & CEO',
      email,
      phone,
      city,
      state,
      category,
      categoryCode,
      categoryName,
      categoryId,
      category_id,
      description,
      pitch,
      operationalYears,
      operational_years,
      impactSummary,
      link,
      websiteUrl,
      websiteLink,
      profilePicture,
      profile_picture,
      businessLogo,
      business_logo,
      package: pkg = 'identity',
      packageAmount: customPackageAmount,
      package_amount,
      paymentRef,
      payment_ref,
      paymentStatus,
      payment_status,
      status = 'pending',
      notes,
    } = req.body;

    const finalNomineeName = (name || nomineeName || founderName || '').trim();
    const finalBusinessName = (business || businessName || ventureName || companyName || '').trim();
    const finalDesignation = (designation || 'Founder & CEO').trim();
    const finalEmail = (email || '').toLowerCase().trim();
    const finalPhone = (phone || '').trim();
    const finalCity = (city || (state ? `${city}, ${state}` : '') || '').trim();
    const finalCategory = (category || categoryName || categoryCode || 'Woman Entrepreneur of the Year').trim();
    const finalCategoryId = categoryId || category_id || null;
    const finalDescription = (description || pitch || impactSummary || '').trim();
    const finalOperationalYears = operationalYears || operational_years || '1-3 years';
    const finalLink = (link || websiteUrl || websiteLink || '').trim() || null;
    const finalProfilePicture = profilePicture || profile_picture || null;
    const finalBusinessLogo = businessLogo || business_logo || null;
    const finalTrack = track === 'rated' ? 'rated' : 'honorary';
    const finalPkg = finalTrack === 'rated' ? (pkg || 'identity') : 'honorary';

    if (!finalNomineeName || !finalBusinessName || !finalEmail || !finalPhone || !finalCity) {
      return errorResponse(res, 'Please provide all mandatory fields: Nominee Full Name, Business Name, Email, Phone, and City & State.', 400);
    }

    // Determine package amount if rated
    let finalPackageAmount = 0;
    if (finalTrack === 'rated') {
      if (customPackageAmount !== undefined && customPackageAmount !== null) {
        finalPackageAmount = Number(customPackageAmount);
      } else if (package_amount !== undefined && package_amount !== null) {
        finalPackageAmount = Number(package_amount);
      } else if (finalPkg === 'identity') finalPackageAmount = 2000;
      else if (finalPkg === 'change_maker') finalPackageAmount = 3000;
      else if (finalPkg === 'fame_india') finalPackageAmount = 5000;
      else if (finalPkg === 'impact_creator') finalPackageAmount = 10000;
      else finalPackageAmount = 2000;
    }

    const finalPaymentRef = (paymentRef || payment_ref || '').trim() || null;
    let finalPaymentStatus = 'not_applicable';
    if (finalTrack === 'rated') {
      if (finalPaymentRef || paymentStatus === 'paid' || payment_status === 'paid') {
        finalPaymentStatus = 'paid';
      } else {
        finalPaymentStatus = 'pending';
      }
    } else {
      finalPaymentStatus = paymentStatus || payment_status || 'not_applicable';
    }

    const finalStatus = finalPaymentStatus === 'paid' ? 'confirmed' : (status || 'pending');

    // Clean voting URL
    const slug = (finalNomineeName || 'nominee').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const votingUrl = `/voting?nominee=${slug}-${Date.now().toString().slice(-4)}`;

    let insertedRow = null;
    try {
      const result = await query(`
        INSERT INTO web_nominations (
          track, nominee_name, founder_name, business_name, venture_name, designation,
          phone, email, city, category_id, category_name, category_code,
          description, pitch, operational_years, website_link, website_url,
          profile_picture, business_logo, voting_url, package, package_amount,
          status, payment_status, payment_ref, notes, award_year, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10, $11, $12,
          $13, $14, $15, $16, $17,
          $18, $19, $20, $21, $22,
          $23, $24, $25, $26, '2027', NOW(), NOW()
        )
        RETURNING *
      `, [
        finalTrack,
        finalNomineeName,
        finalNomineeName,
        finalBusinessName,
        finalBusinessName,
        finalDesignation,
        finalPhone,
        finalEmail,
        finalCity,
        finalCategoryId,
        finalCategory,
        finalCategory,
        finalDescription,
        finalDescription,
        finalOperationalYears,
        finalLink,
        finalLink,
        finalProfilePicture,
        finalBusinessLogo,
        votingUrl,
        finalPkg,
        finalPackageAmount,
        finalStatus,
        finalPaymentStatus,
        finalPaymentRef,
        notes || null,
      ]);
      insertedRow = result.rows[0];
    } catch (dbErr) {
      console.warn('Full web_nominations insert attempt error:', dbErr.message);
      try {
        const fbRes = await query(`
          INSERT INTO web_nominations (
            track, nominee_name, business_name, designation, email, phone, city,
            category_name, description, operational_years, website_link,
            package, package_amount, status, payment_status, payment_ref, voting_url, award_year
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, '2027')
          RETURNING *
        `, [
          finalTrack,
          finalNomineeName,
          finalBusinessName,
          finalDesignation,
          finalEmail,
          finalPhone,
          finalCity,
          finalCategory,
          finalDescription,
          finalOperationalYears,
          finalLink,
          finalPkg,
          finalPackageAmount,
          finalStatus,
          finalPaymentStatus,
          finalPaymentRef,
          votingUrl,
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
          finalDesignation,
          finalEmail,
          finalPhone,
          finalCity,
          finalCategory,
          finalDescription,
          finalOperationalYears,
          finalLink,
        ]);
        insertedRow = legRes.rows[0];
      }
    }

    return successResponse(
      res,
      {
        ...insertedRow,
        voting_url: insertedRow?.voting_url || votingUrl,
      },
      'Nomination submitted and recorded successfully.',
      201
    );
  } catch (err) {
    next(err);
  }
};

export const getNominations = async (req, res, next) => {
  try {
    const { category, city, status, track } = req.query;

    let sql = 'SELECT * FROM web_nominations WHERE 1=1';
    const params = [];

    if (category) {
      params.push(category);
      sql += ` AND (category_name = $${params.length} OR category_code = $${params.length})`;
    }

    if (city) {
      params.push(`%${city}%`);
      sql += ` AND city ILIKE $${params.length}`;
    }

    if (status) {
      params.push(status);
      sql += ` AND status = $${params.length}`;
    }

    if (track) {
      params.push(track);
      sql += ` AND track = $${params.length}`;
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
