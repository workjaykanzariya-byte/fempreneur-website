import { getPlatformStats } from '../services/statsService.js';
import { successResponse } from '../utils/response.js';

export const getStats = async (req, res, next) => {
  try {
    const stats = await getPlatformStats();
    return successResponse(res, stats, 'Platform statistics retrieved.');
  } catch (err) {
    next(err);
  }
};
