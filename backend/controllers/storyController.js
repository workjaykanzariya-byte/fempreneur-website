import { query } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const submitStory = async (req, res, next) => {
  try {
    const { founderName, ventureName, email, phone, storyTitle, narrative, impactMilestone, websiteOrSocial } = req.body;

    if (!founderName || !ventureName || !email || !phone || !narrative) {
      return errorResponse(res, 'Founder name, venture name, email, phone, and narrative are required.', 400);
    }

    const result = await query(`
      INSERT INTO story_submissions (
        founder_name, venture_name, email, phone, story_title, narrative, impact_milestone, website_or_social
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [
      founderName.trim(),
      ventureName.trim(),
      email.toLowerCase().trim(),
      phone.trim(),
      storyTitle || `Story of ${founderName}`,
      narrative.trim(),
      impactMilestone || null,
      websiteOrSocial || null,
    ]);

    return successResponse(res, result.rows[0], 'Story submitted to the 1,000 Stories Drive successfully.', 201);
  } catch (err) {
    next(err);
  }
};

export const getStories = async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM story_submissions ORDER BY created_at DESC');
    return successResponse(res, result.rows, 'Story submissions retrieved.');
  } catch (err) {
    next(err);
  }
};
