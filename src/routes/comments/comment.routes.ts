import { Router } from 'express';
import CommentController from '../../controllers/comment/comment.controller';
const commentRouter = Router();
const commentController = new CommentController();

commentRouter.post('/', commentController.createComment);
commentRouter.get('/:id', commentController.getCommentById);
commentRouter.delete('/:id', commentController.deleteCommentById);
commentRouter.put('/:id', commentController.updateCommentById);

export { commentRouter };
