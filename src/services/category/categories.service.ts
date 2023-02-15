import { IServiceResponse } from '../../interface/serviceResponse.interface';
import { Category } from '../../model/Category/Category.model';
import { CategoryValidationSchema } from '../../validation/category.validation';

class CategoriesService {
  // -------------- create a new category in mongo --------------
  public async createCategory(user: string, title: string): Promise<IServiceResponse> {
    try {
      // validate the req.body
      const { error } = CategoryValidationSchema.validate({ user, title });
      if (error) {
        const errors = [];
        error.details.forEach((err) => {
          errors.push(err.message);
        });
        return { status: 400, success: false, message: errors };
      }
      // save the category in mongo --------------
      const category = await Category.create({
        user,
        title,
      });
      category.save();

      if (category) {
        return { status: 201, success: true, message: 'create category successfully', data: category };
      } else {
        return { status: 500, success: false, message: 'Server Error' };
      }
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
  // -------------- get category by id --------------
  public async getCategoryById(id: string): Promise<IServiceResponse> {
    try {
      // check id is valid or Not
      if (!id) {
        return { status: 400, success: false, message: 'category Id is required' };
      }
      // get category by id from mongo
      const category = await Category.findById(id).exec();
      if (category) {
        return { status: 200, success: true, data: category };
      } else {
        return { status: 404, success: false, message: 'Category Not Found' };
      }
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
  // -------------- delete category --------------
  public async deleteCategory(id: string): Promise<IServiceResponse> {
    try {
      if (!id) {
        return { status: 400, success: false, message: 'category Id is required' };
      }
      const deletedCategory = await Category.findByIdAndRemove({ _id: id });
      if (deletedCategory) {
        return { status: 200, success: true, message: 'category deleted successfully', data: deletedCategory };
      } else {
        return { status: 404, success: false, message: 'Category Not Found' };
      }
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
  //--------------- update category --------------
  public async updateCategory(id: string, title: string): Promise<IServiceResponse> {
    try {
      if (!id) {
        return { status: 400, success: false, message: 'category Id is required' };
      }
      const updatedCategory = await Category.findByIdAndUpdate({ _id: id }, { title });
      if (updatedCategory) {
        return { status: 200, success: true, message: 'category updated successfully', data: updatedCategory };
      } else {
        return { status: 404, success: false, message: 'Category Not Found' };
      }
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
}
export const categoriesService = new CategoriesService();
