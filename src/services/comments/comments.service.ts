import { IServiceResponse } from '../../interface/serviceResponse.interface';
import { Comments } from '../../model/Comment/Comment.model';
import { CommentValidationSchema } from '../../validation/comment.validation';

class CommentService {
  public async createComment(post: string, user: string, description: string): Promise<IServiceResponse> {
    try {
      // ----------- validate req.body -----------
      const { error } = CommentValidationSchema.validate({ post, user, description });
      if (error) {
        const errors = [];
        error.details.forEach((err) => {
          errors.push(err.message);
        });
        return { status: 400, success: false, message: errors };
      }
      // ------------save comment ----------------
      const newComment = await Comments.create({ post, user, description });
      newComment.save();
      if (newComment) {
        return { status: 201, success: true, message: 'create category successfully', data: newComment };
      } else {
        return { status: 500, success: false, message: 'Server Error' };
      }
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
  public async getCommentById(id: string): Promise<IServiceResponse> {
    try {
      const comment = await Comments.findById({ _id : id}).exec();
      if (comment) {
        return { status: 200, success: true, data: comment };
      } else {
        return { status: 404, success: false, message: 'comment Not Found' };
      }
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
  public async deleteCommentById(id: string): Promise<IServiceResponse> {
    try {
      if (!id) {
        return { status: 400, success: false, message: 'category Id is required' };
      }
      const deletedComment = await Comments.findByIdAndRemove({ _id: id });
      if (deletedComment) {
        return { status: 200, success: true, message: 'comment deleted successfully', data: deletedComment };
      } else {
        return { status: 404, success: false, message: 'comment Not Found' };
      }
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
  public async updateCommentById(id: string , description : string): Promise<IServiceResponse> {
    try {
      if (!id) {
        return { status: 400, success: false, message: 'category Id is required' };
      }
      const updateComment = await Comments.findByIdAndUpdate({ _id: id} , { description})
      if (updateComment) {
        return { status: 200, success: true, message: 'comment updated successfully', data: updateComment };
      } else {
        return { status: 404, success: false, message: 'comment Not Found' };
      }
    } catch (error) {
      return { status: 500, success: false, message: error.message };
    }
  }
}

export const commentService = new CommentService();
