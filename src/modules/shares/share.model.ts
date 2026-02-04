import { Schema, model, Document, Types } from "mongoose";

export interface IShare extends Document {
  postId: Types.ObjectId;
  userId?: Types.ObjectId | null;
  platform: "twitter" | "linkedin" | "whatsapp" | "facebook" | "copy_link";
  sharedAt: Date;
}

const ShareSchema = new Schema<IShare>({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null, // guest share
  },
  platform: {
    type: String,
    enum: ["twitter", "linkedin", "whatsapp", "facebook", "copy_link"],
    required: true,
  },
  sharedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Share = model<IShare>("Share", ShareSchema);
