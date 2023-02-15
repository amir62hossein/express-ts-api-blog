import { Request, Response, NextFunction } from 'express';
import HttpException from '../../exceptions/HttpException';
import { commentService } from '../../services/comments/comments.service';

class CommentController {
  public async createComment(req: Request, res: Response, next: NextFunction) {
    const { post, user, description } = req.body;
    try {
      const { status, success, data, message } = await commentService.createComment(post, user, description);
      res.status(status).json({ success, data, message });
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  }
  public async getCommentById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { status, success, data, message } = await commentService.getCommentById(id);
      res.status(status).json({ success, data, message });
    } catch (error) {
      res.json(error.message);
    }
  }
  public async deleteCommentById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const { status, success, data, message } = await commentService.deleteCommentById(id);
      res.status(status).json({ success, data, message });
    } catch (error) {
      next(new HttpException(500, 'server error'));
    }
  }
  public async updateCommentById(req: Request, res: Response, next: NextFunction) {
    const { description } = req.body;
    const { id } = req.params;
    try {
      const { status, success, data, message } = await commentService.updateCommentById(id, description);
      res.status(status).json({ success, data, message });
    } catch (error) {
      next(new HttpException(500, 'server error'));
    }
  }
}
export default CommentController;
