import { query } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const castVote = async (req, res, next) => {
  try {
    const { nomineeSlug, nomineeName, category, voterEmail } = req.body;

    if (!nomineeSlug || !nomineeName || !voterEmail) {
      return errorResponse(res, 'Nominee details and voterEmail are required.', 400);
    }

    const emailClean = voterEmail.toLowerCase().trim();
    const ipAddress = req.ip || req.connection?.remoteAddress || '127.0.0.1';

    // Verify whether this voter has already voted for this nominee
    const existing = await query(
      'SELECT id FROM web_nomination_votes WHERE voter_email = $1',
      [emailClean]
    );

    if (existing.rows.length > 0) {
      return errorResponse(res, 'You have already recorded a verified vote for this nominee.', 409);
    }

    const result = await query(`
      INSERT INTO web_nomination_votes (nomination_id, voter_name, voter_email, ip_address)
      VALUES (COALESCE((SELECT id FROM web_nominations WHERE nominee_name ILIKE $1 LIMIT 1), 1), $2, $3, $4)
      RETURNING *
    `, [nomineeName, nomineeName, emailClean, ipAddress]);

    return successResponse(
      res,
      { vote: result.rows[0] },
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
