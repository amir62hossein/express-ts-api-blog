import { Router } from 'express';
import UserController from '../../controllers/user/user.controller';
import { isLogin } from '../../middlewares/auth/isLogin.middleware';
const userRouter = Router();
const userController = new UserController();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/profile', isLogin, userController.getUserById);
userRouter.get('/', userController.getAllUsers);
userRouter.delete('/:id', userController.deleteUser);
userRouter.put('/:id', userController.updateUser);

export { userRouter };
