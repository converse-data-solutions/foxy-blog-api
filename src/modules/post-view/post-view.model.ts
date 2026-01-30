import { Schema, model, Document, Types } from "mongoose";

export interface IPostView extends Document {
  postId: Types.ObjectId;
  userId?: Types.ObjectId | null;
  sessionId?: string | null;
  viewedAt: Date;
}

const PostViewSchema = new Schema<IPostView>({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  sessionId: {
    type: String,
    default: null,
  },
  viewedAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Prevent duplicate views
 * - logged-in users: one view per user per post
 * - guests: one view per session per post
 */
PostViewSchema.index(
  { postId: 1, userId: 1 },
  { unique: true, partialFilterExpression: { userId: { $exists: true } } }
);

PostViewSchema.index(
  { postId: 1, sessionId: 1 },
  { unique: true, partialFilterExpression: { sessionId: { $exists: true } } }
);

export const PostView = model<IPostView>("PostView", PostViewSchema);
