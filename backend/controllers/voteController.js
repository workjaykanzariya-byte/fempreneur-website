import { query } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const castVote = async (req, res, next) => {
  try {
    const { nomineeId, nomineeSlug, nomineeName, category, voterEmail } = req.body;

    if (!voterEmail || (!nomineeId && !nomineeSlug && !nomineeName)) {
      return errorResponse(res, 'Nominee details and voterEmail are required.', 400);
    }

    const emailClean = voterEmail.toLowerCase().trim();
    const ipAddress = req.ip || req.connection?.remoteAddress || '127.0.0.1';

    // Find the nomination row if it exists in the database
    let nomRow = null;
    if (nomineeId && !isNaN(nomineeId)) {
      const nomRes = await query('SELECT * FROM web_nominations WHERE id = $1', [parseInt(nomineeId, 10)]);
      if (nomRes.rows.length > 0) nomRow = nomRes.rows[0];
    }
    if (!nomRow && nomineeSlug) {
      const nomRes = await query(
        'SELECT * FROM web_nominations WHERE voting_url ILIKE $1 OR LOWER(nominee_name) = $2 LIMIT 1',
        [`%${nomineeSlug}%`, nomineeSlug.toLowerCase()]
      );
      if (nomRes.rows.length > 0) nomRow = nomRes.rows[0];
    }
    if (!nomRow && nomineeName) {
      const nomRes = await query('SELECT * FROM web_nominations WHERE nominee_name ILIKE $1 LIMIT 1', [nomineeName]);
      if (nomRes.rows.length > 0) nomRow = nomRes.rows[0];
    }

    const targetNominationId = nomRow ? nomRow.id : (nomineeId || 1);
    const targetNomineeName = nomRow ? nomRow.nominee_name : (nomineeName || 'Nominee');

    // Verify whether this voter has already voted for this specific nominee
    const existing = await query(
      'SELECT id FROM web_nomination_votes WHERE voter_email = $1 AND nomination_id = $2',
      [emailClean, targetNominationId]
    );

    if (existing.rows.length > 0) {
      return errorResponse(res, 'You have already recorded a verified vote for this nominee.', 409);
    }

    // Insert vote record
    const result = await query(`
      INSERT INTO web_nomination_votes (nomination_id, voter_name, voter_email, ip_address)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [targetNominationId, targetNomineeName, emailClean, ipAddress]);

    // Increment public_votes on the nomination record
    if (nomRow) {
      await query(`
        UPDATE web_nominations 
        SET public_votes = COALESCE(public_votes, 0) + 1 
        WHERE id = $1
      `, [targetNominationId]);
    }

    // Fetch updated total votes for this nominee
    const countRes = await query(
      'SELECT COUNT(*) as total FROM web_nomination_votes WHERE nomination_id = $1',
      [targetNominationId]
    );
    const totalVotes = parseInt(countRes.rows[0]?.total || 1, 10);

    return successResponse(
      res,
      {
        vote: result.rows[0],
        totalVotes,
        nominationId: targetNominationId,
      },
      'Verified vote successfully recorded (50% public voting weight applied).',
      201
    );
  } catch (err) {
    if (err.code === '23505') {
      return errorResponse(res, 'You have already cast a vote for this nominee.', 409);
    }
    next(err);
  }
};

export const getVoteCounts = async (req, res, next) => {
  try {
    const result = await query(`
      SELECT nomination_id, COUNT(*) as vote_count
      FROM web_nomination_votes
      GROUP BY nomination_id
    `);

    const counts = {};
    result.rows.forEach(r => {
      counts[r.nomination_id] = parseInt(r.vote_count, 10);
    });

    return successResponse(res, counts, 'Vote tallies retrieved.');
  } catch (err) {
    next(err);
  }
};
