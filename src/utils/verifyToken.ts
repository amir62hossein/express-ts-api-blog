import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (token: string | boolean) => {
  return jwt.verify(token, process.env.JWT_KEY, (err: Error, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};
