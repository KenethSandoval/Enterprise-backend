import jwt from 'jsonwebtoken';
import { error } from '../utils/response';
import { JWT_SECRET } from '../config';

const authMiddleware: Handler = async (req, res, next) => {
  const token = req.headers['authorization'] || '';

  if (!token) {
    next(error(res, 'no token provided', 401));
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as IPayload;
    req.user = payload.user;
    next();
  } catch (err) {
    switch (err.message) {
      case 'jwt expired':
        return error(res, 'Token expired', 401);
      default:
        return error(res, err.message, 401);
    }
  }
};

export default authMiddleware;