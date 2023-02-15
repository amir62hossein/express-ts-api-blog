import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';
dotenv.config();

export const databaseconnection = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO);
    logger.info('connection established');
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
databaseconnection();  
