import express, { Express } from 'express';
import { morganMiddleware } from './middlewares/logger/morgan.middleware';
import { databaseconnection } from './config/db.config';
import { userRouter } from './routes/users/user.routes';
import { postRouter } from './routes/posts/post.routes';
import { commentRouter } from './routes/comments/comment.routes';
import { categoryRouter } from './routes/categories/category.routes';
import { errorHandler } from './middlewares/error/errorHandler.middleware';
import { logger } from './utils/logger';


class Application {
  private app: Express;
  private port: number;
  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.databaseconnection();
    this.setupMiddleware();
    this.setupRoutes();
    this.errorHandler();
  }
  private databaseconnection() {
    databaseconnection(); 
  }
  private setupMiddleware() {
    this.app.use(express.json());
    this.app.use(morganMiddleware);
  }
  private setupRoutes() {
    this.app.use('/api/v1/users', userRouter);
    this.app.use('/api/v1/posts', postRouter);
    this.app.use('/api/v1/comments', commentRouter);
    this.app.use('/api/v1/categories', categoryRouter);
  }
  private errorHandler() {
    this.app.use(errorHandler);
  }
  public lunchApplication() {
    this.app.listen(this.port, () => logger.info(`app listening on ${this.port}`));
  }
}
export default Application;
