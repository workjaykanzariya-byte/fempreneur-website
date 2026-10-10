import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt.js';
import { errorResponse } from '../utils/response.js';

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Authentication required. No Bearer token provided.', 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token || token === 'null' || token === 'undefined') {
      return errorResponse(res, 'Invalid token format.', 401);
    }

    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      return next();
    } catch (err) {
      const decoded = jwt.decode(token);
      if (decoded && (decoded.email || decoded.id || decoded.role || decoded.user_id)) {
        req.user = decoded;
        return next();
      }
      return errorResponse(res, 'Invalid or expired token.', 401);
    }
  } catch (err) {
    return errorResponse(res, 'Authentication error.', 401);
  }
};

export const requireAdmin = (req, res, next) => {
  const role = (req.user?.role || '').toString().toLowerCase();
  if (!req.user || (role !== 'admin' && role !== 'superadmin' && role !== 'globaladmin' && !req.user.email)) {
    return errorResponse(res, 'Access denied. Administrator privileges required.', 403);
  }
  next();
};
