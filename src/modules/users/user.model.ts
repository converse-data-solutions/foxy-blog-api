import { Schema, model, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  passwordHash?: string;
  authProvider: "local" | "google" | "github" | "linkedin";
  role: "user" | "admin";
  isVerified: boolean;
  isBlocked?: boolean;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: String,
  authProvider: { type: String, default: "local" },
  role: { type: String, default: "user" },
  isVerified: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const User = model<IUser>("User", userSchema);
