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

    // -------------------------------------------------------------
    // Enforce Duplicate Registration Rules for Free & Paid Tracks
    // -------------------------------------------------------------
    const dupCheckResult = await verifyDuplicateNomination({
      business: finalBusinessName,
      email: finalEmail,
      phone: finalPhone,
      track: finalTrack,
    });

    if (dupCheckResult.isDuplicate) {
      return errorResponse(res, dupCheckResult.message, 409);
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
            package, package_amount, status, payment_status, payment_ref, voting_url, award_year,
            profile_picture, business_logo
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, '2027', $18, $19)
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
          finalProfilePicture,
          finalBusinessLogo,
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
        profile_picture: insertedRow?.profile_picture || finalProfilePicture,
        business_logo: insertedRow?.business_logo || finalBusinessLogo,
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

export const getNominationBySlugOrId = async (req, res, next) => {
  try {
    const { slugOrId } = req.params;
    if (!slugOrId) {
      return errorResponse(res, 'Nominee slug or ID is required.', 400);
    }

    let result;
    const isNumeric = /^\d+$/.test(slugOrId);

    if (isNumeric) {
      result = await query('SELECT * FROM web_nominations WHERE id = $1', [parseInt(slugOrId, 10)]);
    } else {
      const cleanSlug = slugOrId.toLowerCase().trim();
      result = await query(
        `SELECT * FROM web_nominations 
         WHERE voting_url ILIKE $1 
            OR LOWER(nominee_name) = $2
            OR LOWER(REPLACE(nominee_name, ' ', '-')) = $2
            OR voting_url ILIKE $3
         ORDER BY id DESC LIMIT 1`,
        [`%${cleanSlug}%`, cleanSlug, `%nominee=${cleanSlug}%`]
      );
    }

    if (!result || result.rows.length === 0) {
      return errorResponse(res, 'Nominee profile not found.', 404);
    }

    return successResponse(res, result.rows[0], 'Nominee profile fetched successfully.');
  } catch (err) {
    next(err);
  }
};

export const getPublicNominations = async (req, res, next) => {
  try {
    const result = await query(`
      SELECT id, nominee_name, founder_name, business_name, venture_name, designation,
             city, category_name, category_code, description, pitch, operational_years,
             website_link, website_url, profile_picture, business_logo, voting_url,
             track, package, public_votes, status, payment_status, created_at
      FROM web_nominations
      WHERE (track = 'honorary' OR (track = 'rated' AND payment_status = 'paid') OR status = 'confirmed' OR status = 'pending')
      ORDER BY id DESC
    `);
    return successResponse(res, result.rows, 'Public nominations fetched successfully.');
  } catch (err) {
    next(err);
  }
};

/**
 * Reusable duplicate verification logic for Fempreneur Awards
 * 
 * Rules:
/**
 * Controller helper to verify duplicate nomination
 * Rules:
 * - Email ID, Business Name, or Phone Number can only be submitted ONE TIME per track.
 * - If Business Name OR Email ID OR Mobile Number matches an existing registration in the same track, block registration.
 * - Free → Free: Block duplicates.
 * - Free → Paid: Allow registration.
 * - Paid → Paid: Block duplicates.
 * - Paid → Free: Allow registration.
 * - Displays "You are already registered here." with existing details.
 */
export const verifyDuplicateNomination = async ({ business, businessName, email, phone, track = 'honorary' }) => {
  const finalBusiness = (business || businessName || '').trim();
  const finalEmail = (email || '').toLowerCase().trim();
  const finalPhone = (phone || '').trim();
  const finalTrack = track === 'rated' ? 'rated' : 'honorary';

  // If none of the three details is provided, do not block
  if (!finalBusiness && !finalEmail && !finalPhone) {
    return { isDuplicate: false };
  }

  // Extract digits for flexible mobile matching (e.g. +91 8849205959 vs 8849205959)
  const phoneDigits = finalPhone.replace(/\D/g, '');
  const last10Digits = phoneDigits.length >= 10 ? phoneDigits.slice(-10) : (phoneDigits.length >= 8 ? phoneDigits : '');

  try {
    const conditions = [];
    const params = [];

    // Track filter: Free blocks Free; Paid blocks Paid; Free <-> Paid cross is allowed
    if (finalTrack === 'honorary') {
      conditions.push(`track = 'honorary'`);
    } else {
      conditions.push(`track = 'rated' AND (payment_status = 'paid' OR status = 'confirmed')`);
    }

    // Match clauses: Business Name, Email Address, or Phone Number (One-time submission each)
    const matchClauses = [];

    if (finalBusiness) {
      params.push(finalBusiness);
      matchClauses.push(`LOWER(TRIM(COALESCE(business_name, venture_name, ''))) = LOWER(TRIM($${params.length}))`);
    }

    if (finalEmail) {
      params.push(finalEmail);
      matchClauses.push(`LOWER(TRIM(email)) = LOWER(TRIM($${params.length}))`);
    }

    if (finalPhone) {
      params.push(finalPhone);
      const phoneParamIdx = params.length;
      if (last10Digits) {
        params.push(last10Digits);
        const last10ParamIdx = params.length;
        matchClauses.push(`(LOWER(TRIM(phone)) = LOWER(TRIM($${phoneParamIdx})) OR RIGHT(REGEXP_REPLACE(phone, '[^0-9]', '', 'g'), 10) = $${last10ParamIdx})`);
      } else {
        matchClauses.push(`LOWER(TRIM(phone)) = LOWER(TRIM($${phoneParamIdx}))`);
      }
    }

    if (matchClauses.length === 0) {
      return { isDuplicate: false };
    }

    const sql = `
      SELECT id, track, payment_status, status, nominee_name, business_name, email, phone, category_name
      FROM web_nominations
      WHERE ${conditions.join(' AND ')}
        AND (${matchClauses.join(' OR ')})
      ORDER BY id DESC LIMIT 1
    `;

    const dupCheck = await query(sql, params);

    if (dupCheck.rows.length > 0) {
      const existing = dupCheck.rows[0];
      const existingBusiness = existing.business_name || finalBusiness;
      const existingEmail = existing.email || finalEmail;
      const existingPhone = existing.phone || finalPhone;
      const trackTitle = finalTrack === 'honorary' ? 'Free (Honorary)' : 'Paid (Rated)';

      return {
        isDuplicate: true,
        existing: {
          id: existing.id,
          businessName: existingBusiness,
          email: existingEmail,
          phone: existingPhone,
          nomineeName: existing.nominee_name,
          categoryName: existing.category_name,
          track: existing.track,
        },
        message: `You are already registered here. A nomination for "${existingBusiness}" has already been registered in the ${trackTitle} track with Email "${existingEmail}" and Mobile Number "${existingPhone}". Each business name, email address, and mobile number can only be submitted once.`
      };
    }

    return { isDuplicate: false };
  } catch (err) {
    console.warn('Duplicate verification warning:', err.message);
    return { isDuplicate: false, warning: err.message };
  }
};

/**
 * Controller endpoint to verify duplicate nomination
 */
export const checkDuplicateNomination = async (req, res) => {
  try {
    const business = req.query.business || req.query.businessName || req.body?.business || req.body?.businessName || '';
    const email = req.query.email || req.body?.email || '';
    const phone = req.query.phone || req.body?.phone || '';
    const track = req.query.track || req.body?.track || 'honorary';

    if (!business && !email && !phone) {
      return successResponse(res, { isDuplicate: false }, 'At least one field required to check duplicate');
    }

    const result = await verifyDuplicateNomination({
      business,
      email,
      phone,
      track,
    });

    return successResponse(res, result, 'Duplicate check completed successfully');
  } catch (err) {
    console.error('Error checking duplicate nomination:', err);
    return errorResponse(res, err.message || 'Failed to verify nomination registration', 500);
  }
};

