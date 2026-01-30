import { Schema, model, Document, Types } from "mongoose";

export interface IComment extends Document {
  postId: Types.ObjectId;
  authorId: Types.ObjectId;
  parentCommentId?: Types.ObjectId | null;
  body: string;
  status: "visible" | "hidden" | "deleted";
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    body: { type: String, required: true },
    status: {
      type: String,
      enum: ["visible", "hidden", "deleted"],
      default: "visible",
    },
  },
  { timestamps: true }
);

export const Comment = model<IComment>("Comment", CommentSchema);
