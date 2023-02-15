import { NextFunction, Request, Response } from 'express';
import { IRequest } from '../../interface/extendRequest.interface';
import HttpException from '../../exceptions/HttpException';
import { userService } from '../../services/user/user.service';

class UserController {
  public async register(req: Request, res: Response, next: NextFunction) {
    const { firstName, lastName, profilePhoto, email, password } = req.body;
    try {
      const { status, success, data, message } = await userService.register(
        firstName,
        lastName,
        profilePhoto,
        email,
        password
      );

      res.status(status).json({
        success,
        data,
        message,
      });
    } catch (error) {
      next(new HttpException(500, 'Server Error'));
    }
  }
  public async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const { status, success, data, message, token } = await userService.login(email, password);
      res.status(status).json({ success, data, message, token });
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  }
  public async getUserById(req: IRequest, res: Response, next: NextFunction) {
    try {
      const userId: string = req.userAuth;
      const { status, success, data, message } = await userService.getUserById(userId);
      res.status(status).json({ success, data, message });
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  }
  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, success, data, message } = await userService.getAllUsers();
      res.status(status).json({ success, data, message });
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  }
  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, success, data, message } = await userService.deleteUser(id);
      res.status(status).json({ success, data, message });
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  }
  public async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { firstName, lastName, profilePhoto, email } = req.body;
      const { status, success, data, message } = await userService.updateUser(
        id,
        firstName,
        lastName,
        profilePhoto,
        email
      );
      res.status(status).json({ success, data, message });
    } catch (error) {
      res.json(error.message);
    }
  }
}

export default UserController;
