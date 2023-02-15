import { Request } from 'express';

export const getTokenFromHeader = (req: Request) => {
  const headerObj = req.headers;
  const token = headerObj['authorization'];

  if (token != undefined) {
    return token;
  } else {
    return false;
  }
};
