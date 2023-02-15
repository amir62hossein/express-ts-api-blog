import { IServiceResponse } from '../../interface/serviceResponse.interface';
import { User } from '../../model/User/User.model';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/generateToken';
import { IUser } from '../../interface/user.interface';
import { UserValidationSchema } from '../../validation/user.validation';

class UserService {
  public async register(
    firstName: string,
    lastName: string,
    profilePhoto: string,
    email: string,
    password: number
  ): Promise<IServiceResponse> {
    try {
      // validation req.body
      const { error } = UserValidationSchema.validate({ firstName, lastName, profilePhoto, email, password });
      if (error) {
        const errors = [];
        error.details.forEach((err) => {
          errors.push(err.message);
        });
        return { status: 400, success: false, message: errors };
      }
      // check if the user is already registered
      const userFound = await User.findOne({ email: email });
      if (userFound) {
        return { status: 400, success: false, message: 'User already registered' };
      }
      // hash user password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // add user in database

      const user = await User.create({
        firstName,
        lastName,
        profilePhoto,
        email,
        password: hashedPassword,
      });
      user.save();

      return { status: 201, success: true, message: 'user register successfully', data: user };
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
  public async login(email: string, password: string): Promise<IServiceResponse> {
    try {
      // check if user not registered
      const user = await User.findOne({ email });
      if (!user) return { status: 404, success: false, message: 'user not found' };
      // verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!user || !isPasswordValid) {
        return { status: 400, success: false, message: 'Invalid email or password' };
      }
      return { status: 200, success: true, message: 'login successful', data: user, token: generateToken(user._id) };
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
  public async getUserById(id: string): Promise<IServiceResponse> {
    try {
      const user = await User.findById(id);
      if (!user) {
        return { status: 404, success: false, message: 'user not found' };
      } else {
        return { status: 200, success: true, data: user };
      }
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
  public async getAllUsers(): Promise<IServiceResponse> {
    try {
      const users: IUser[] = await User.find();
      return { status: 200, success: true, data: users };
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
  public async deleteUser(id: string): Promise<IServiceResponse> {
    try {
      const deletedUser = await User.findByIdAndRemove({ _id: id }).exec();
      if (deletedUser) {
        return { status: 200, success: true, message: 'user deleted successfully', data: deletedUser };
      } else {
        return { status: 404, success: false, message: 'user Not Found' };
      }
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
  public async updateUser(
    id: string,
    firstName: string,
    lastName: string,
    profilePhoto: string,
    email: string
  ): Promise<IServiceResponse> {
    try {
      const updateUser = await User.findByIdAndUpdate({ _id: id }, { firstName, lastName, profilePhoto, email }).exec();
      if (updateUser) {
        return { status: 200, success: true, message: 'user update successfully', data: updateUser };
      } else {
        return { status: 404, success: false, message: 'user not found' };
      }
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
}
export const userService = new UserService();
