import { Router } from 'express';
import CategoryController from '../../controllers/category/category.controller';
const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post('/', categoryController.createCategory);
categoryRouter.get('/:id', categoryController.getCategoryById);
categoryRouter.delete('/:id', categoryController.deleteCategoryById);
categoryRouter.put('/:id', categoryController.updateCategoryById);

export { categoryRouter };
