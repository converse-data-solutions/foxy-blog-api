import { Schema, model, Document, Types } from "mongoose";

export interface IReaction extends Document {
  targetType: "post" | "comment";
  targetId: Types.ObjectId;
  userId: Types.ObjectId;
  reaction: "like" | "clap" | "love" | "insightful";
  createdAt: Date;
}

const ReactionSchema = new Schema<IReaction>(
  {
    targetType: {
      type: String,
      enum: ["post", "comment"],
      required: true,
    },
    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reaction: {
      type: String,
      enum: ["like", "clap", "love", "insightful"],
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

/**
 * Prevent duplicate reaction
 * (one user → one reaction → one target)
 */
ReactionSchema.index(
  { targetType: 1, targetId: 1, userId: 1 },
  { unique: true }
);

export const Reaction = model<IReaction>("Reaction", ReactionSchema);
