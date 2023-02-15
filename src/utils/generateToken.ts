import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (id: string) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: '1d',
    }
  );
};
