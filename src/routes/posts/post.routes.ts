import { Router } from 'express';
import PostController from '../../controllers/post/post.controller';
import { upload } from '../../middlewares/uploads/upload.middleware';
const postRouter = Router();
const postController = new PostController();

postRouter.post('/',upload.single("photo") ,postController.createPost);
postRouter.get('/:id', postController.getPostById);
postRouter.get('/:page/:limit', postController.getAllPosts);
postRouter.delete('/:id', postController.deletePost);
postRouter.put('/:id', postController.updatePost);

export { postRouter };
