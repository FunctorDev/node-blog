import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/config';

export const generateJWTToken = (userData, options = { expiresIn: 86400 }) =>
  jwt.sign(userData, JWT_SECRET, options);

export const parseToken = (jwtToken, options = {}) => {
  try {
    return jwt.verify(jwtToken, JWT_SECRET, options);
  } catch (err) {
    console.log('error: ', err);
    return null;
  }
};
