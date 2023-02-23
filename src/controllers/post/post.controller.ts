import { Request, Response, NextFunction } from 'express';
import HttpException from '../../exceptions/HttpException';
import { postService } from '../../services/post/post.service';

class PostController {
  public async createPost(req: Request, res: Response, next: NextFunction) {
    const { title, description, category, user, photo } = req.body;
    try {
      const { status, success, data, message } = await postService.createPost(
        title,
        description,
        category,
        user,
        photo
      );
      res.status(status).json({ success, message, data });
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  }
  public async getPostById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const { status, success, data, message } = await postService.getPostById(id);
      res.status(status).json({ success, message, data });
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  }
  public async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const  page = parseInt(req.params.page) - 1;
      const  limit = req.params.limit
      const { status, success, data, message } = await postService.getAllPosts( page, limit);
      res.status(status).json({ success, message, data });
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  }
  public async deletePost(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const { status, success, data, message } = await postService.deletePostById(id);
      res.status(status).json({ success, message, data });
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  }
  public async updatePost(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { title, description, photo } = req.body;
    try {
      const { status, success, data, message } = await postService.updatePostById(id, title, description, photo);
      res.status(status).json({ success, message, data });
    } catch (error) {
      next(new HttpException(500, 'internal error'));
    }
  }
}
export default PostController;
 