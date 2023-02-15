import Application from './app';
import dotenv from 'dotenv';
dotenv.config();
const app = new Application(parseInt(process.env.PORT));
app.lunchApplication();
