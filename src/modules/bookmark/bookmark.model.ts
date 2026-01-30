import { Schema, model, Document, Types } from "mongoose";

export interface IBookmark extends Document {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  createdAt: Date;
}

const BookmarkSchema = new Schema<IBookmark>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

/**
 * One bookmark per user per post
 */
BookmarkSchema.index({ userId: 1, postId: 1 }, { unique: true });

export const Bookmark = model<IBookmark>("Bookmark", BookmarkSchema);
