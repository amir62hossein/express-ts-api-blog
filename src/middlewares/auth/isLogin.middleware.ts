import { NextFunction, Response } from 'express';
import { IRequest } from '../../interface/extendRequest.interface';
import { getTokenFromHeader } from '../../utils/getTokenFromHeader';
import { verifyToken } from '../../utils/verifyToken';
export const isLogin = (req: IRequest, res: Response, next: NextFunction) => {
  // ------------ get token from header
  const token = getTokenFromHeader(req);
  const decodedUser = verifyToken(token);

  req.userAuth = decodedUser.id;

  if (!decodedUser) {
    return res.status(401).json({
      success: false,
      message: 'Invalid/Expire token',
    });
  } else {
    next();
  }
};
