import { query } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const castVote = async (req, res, next) => {
  try {
    const { nomineeSlug, nomineeName, category, voterEmail } = req.body;

    if (!nomineeSlug || !nomineeName || !voterEmail) {
      return errorResponse(res, 'Nominee details and voterEmail are required.', 400);
    }

    const emailClean = voterEmail.toLowerCase().trim();
    const ipAddress = req.ip || req.connection.remoteAddress || '127.0.0.1';

    // Verify whether this voter has already voted for this nominee
    const existing = await query(
      'SELECT id FROM votes WHERE nominee_slug = $1 AND voter_email = $2',
      [nomineeSlug, emailClean]
    );

    if (existing.rows.length > 0) {
      return errorResponse(res, 'You have already recorded a verified vote for this nominee.', 409);
    }

    const result = await query(`
      INSERT INTO votes (nominee_slug, nominee_name, category, voter_email, ip_address)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [nomineeSlug, nomineeName, category || 'Award Nominee', emailClean, ipAddress]);

    // Count total votes for this nominee
    const countResult = await query(
      'SELECT COUNT(*) FROM votes WHERE nominee_slug = $1',
      [nomineeSlug]
    );

    const totalVotes = parseInt(countResult.rows[0].count, 10);

    return successResponse(
      res,
      { vote: result.rows[0], totalVotes },
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
      SELECT nominee_slug, COUNT(*) as vote_count
      FROM votes
      GROUP BY nominee_slug
    `);

    const counts = {};
    result.rows.forEach(r => {
      counts[r.nominee_slug] = parseInt(r.vote_count, 10);
    });

    return successResponse(res, counts, 'Vote tallies retrieved.');
  } catch (err) {
    next(err);
  }
};
