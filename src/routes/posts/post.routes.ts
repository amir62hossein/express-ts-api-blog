import { Router } from 'express';
import PostController from '../../controllers/post/post.controller';
const postRouter = Router();
const postController = new PostController();

postRouter.post('/', postController.createPost);
postRouter.get('/:id', postController.getPostById);
postRouter.get('/', postController.getAllPosts);
postRouter.delete('/:id', postController.deletePost);
postRouter.put('/:id', postController.updatePost);

export { postRouter };
