import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    title: {
      type: String,
      required: [true, 'User is required'],
    },
  },
  {
    timestamps: true,
  }
);
export const Category = mongoose.model<mongoose.Document>('Category', categorySchema);
