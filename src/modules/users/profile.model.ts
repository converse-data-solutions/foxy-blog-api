import { Schema, model, Document, Types } from "mongoose";

export interface IProfile extends Document {
  userId: Types.ObjectId;
  bio?: string;
  avatarUrl?: string;
  coverUrl?: string;
  website?: string;
  socials?: Record<string, string>;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>({
  userId: { type: Schema.Types.ObjectId, ref: "User", unique: true },
  bio: String,
  avatarUrl: String,
  coverUrl: String,
  website: String,
  socials: {
    type: Map,
    of: String,
  },
  updatedAt: { type: Date, default: Date.now },
});

export const Profile = model<IProfile>("Profile", ProfileSchema);
