import { IServiceResponse } from '../../interface/serviceResponse.interface';
import { Posts } from '../../model/Post/Post.model';
import { PostValidationSchema } from '../../validation/post.validation';

class PostService {
  public async createPost(
    title: string,
    description: string,
    category: string,
    user: string,
    photo: string
  ): Promise<IServiceResponse> {
    try {
      //validate req.body
      const { error } = PostValidationSchema.validate({ title, description, category, user, photo });
      if (error) {
        const errors = [];
        error.details.forEach((err) => {
          errors.push(err.message);
        });
        return { status: 400, success: false, message: errors };
      }
      // add post to database
      const post = await Posts.create({ title, description, category, user, photo });
      if (post) {
        return { status: 201, success: true, message: 'post category successfully', data: post };
      } else {
        return { status: 500, success: false, message: 'Server Error' };
      }
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
  public async getPostById(id: string): Promise<IServiceResponse> {
    try {
      const post = await Posts.findById({ _id: id }).exec();
      if (post) {
        return { status: 200, success: true, data: post };
      } else {
        return { status: 404, success: false, message: 'post Not Found' };
      }
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
  public async getAllPosts(page, limit): Promise<IServiceResponse> {
    try {
      const posts = await Posts.find({})
        .skip(page * limit)
        .limit(limit)
        .exec();
      return { status: 200, success: true, data: posts };
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
  public async deletePostById(id: string): Promise<IServiceResponse> {
    try {
      const deletedPost = await Posts.findByIdAndRemove({ _id: id }).exec();
      if (deletedPost) {
        return { status: 200, success: true, message: 'post deleted successfully', data: deletedPost };
      } else {
        return { status: 404, success: false, message: 'post Not Found' };
      }
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
  public async updatePostById(
    id: string,
    title: string,
    description: string,
    photo: string
  ): Promise<IServiceResponse> {
    try {
      if (!id) {
        return { status: 400, success: false, message: 'post Id is required' };
      }
      const updatePost = await Posts.findByIdAndUpdate({ _id: id }, { title, description, photo });
      if (updatePost) {
        return { status: 200, success: true, message: 'post updated successfully', data: updatePost };
      } else {
        return { status: 404, success: false, message: 'post Not Found' };
      }
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
}

export const postService = new PostService();
