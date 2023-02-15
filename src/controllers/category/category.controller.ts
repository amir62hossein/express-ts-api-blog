import { Request, Response, NextFunction } from 'express';
import HttpException from '../../exceptions/HttpException';

import { categoriesService } from '../../services/category/categories.service';

class CategoryController {
  public async createCategory(req: Request, res: Response, next: NextFunction) {
    const { user, title } = req.body;
    try {
      const { status, success, data, message } = await categoriesService.createCategory(user, title);
      res.status(status).json({ success, message, data });
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  }
  public async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, success, data, message } = await categoriesService.getCategoryById(req.params.id);
      res.status(status).json({ success, message, data });
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  }
  public async deleteCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, success, data, message } = await categoriesService.deleteCategory(req.params.id);
      res.status(status).json({ success, message, data });
    } catch (error) {
      next(new HttpException(500, 'server error'));
    }
  }
  public async updateCategoryById(req: Request, res: Response, next: NextFunction) {
    const title = req.body.title;
    try {
      const { status, success, data, message } = await categoriesService.updateCategory(req.params.id, title);
      res.status(status).json({ success, message, data });
    } catch (error) {
      next(new HttpException(500, 'server error'));
    }
  }
}

export default CategoryController;
