import { Schema, model, Types } from "mongoose";

export interface IAuthToken {
  userId: Types.ObjectId;
  tokenHash: string;
  purpose: "verification";
  expiresAt: Date;
  usedAt?: Date;
  createdAt: Date;
}

const authTokenSchema = new Schema<IAuthToken>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  tokenHash: { type: String, required: true },
  purpose: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  usedAt: Date,
  createdAt: { type: Date, default: Date.now },
});

export const AuthToken = model<IAuthToken>("AuthToken", authTokenSchema);
