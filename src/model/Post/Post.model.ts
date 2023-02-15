import mongoose, { Schema } from 'mongoose';

// create schema

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Post Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Post Description is required'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Post Category is required'],
    },
    numberOfViews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post Author is required'],
    },
    photo: {
      type: String,
      required: [true, 'Post Photo is required'],
    },
  },
  {
    timestamps: true,
  }
);
export const Posts = mongoose.model<mongoose.Document>('Post', postSchema);
