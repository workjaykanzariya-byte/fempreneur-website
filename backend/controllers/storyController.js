import { query } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const submitStory = async (req, res, next) => {
  try {
    const { founderName, ventureName, email, phone, storyTitle, narrative, impactMilestone, websiteOrSocial } = req.body;

    if (!founderName || !ventureName || !email || !phone || !narrative) {
      return errorResponse(res, 'Founder name, venture name, email, phone, and narrative are required.', 400);
    }

    const result = await query(`
      INSERT INTO web_inquiries (
        inquiry_type, name, organization, email, phone, subject, message
      ) VALUES ('publish-story', $1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [
      founderName.trim(),
      ventureName.trim(),
      email.toLowerCase().trim(),
      phone.trim(),
      storyTitle || `Story of ${founderName}`,
      narrative.trim() + (impactMilestone ? ` | Impact: ${impactMilestone}` : '') + (websiteOrSocial ? ` | Link: ${websiteOrSocial}` : ''),
    ]);

    return successResponse(res, result.rows[0], 'Story submitted to the 1,000 Stories Drive successfully.', 201);
  } catch (err) {
    next(err);
  }
};

export const getStories = async (req, res, next) => {
  try {
    const result = await query("SELECT * FROM web_inquiries WHERE inquiry_type = 'publish-story' ORDER BY created_at DESC");
    return successResponse(res, result.rows, 'Story submissions retrieved.');
  } catch (err) {
    next(err);
  }
};
