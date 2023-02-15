import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Post is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is required'],
    },
    description: {
      type: String,
      required: [true, 'Comment Description is required'],
    },
  },
  {
    timestamps: true,
  }
);
export const Comments = mongoose.model<mongoose.Document>('Comment', commentSchema);
