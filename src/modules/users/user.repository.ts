import { Types } from "mongoose";
import { User } from "./user.model";
import { Reaction } from "../reactions/reaction.model";
import { Share } from "../shares/share.model";
import { AuthToken } from "../tokens/authtoken.model";
import { Profile } from "./profile.model";

export class UserRepository {
  static async create(data: {
    name: string;
    email: string;
    passwordHash: string;
    authProvider: string;
    isVerified: boolean;
  }) {
    return await User.create(data);
  }

  static async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  static async findByIdWise(id: string) {
    return await User.findOne({_id:id }).select("-passwordHash");
  }

  static async getProfile(userId: string) {
    return await Profile.findOne({ userId });
  }

  static async updateProfile(
    userId: string,
    data: Partial<{ bio: string; avatarUrl: string }>,
  ) {
    Profile.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { ...data, updatedAt: new Date() },
      { new: true, upsert: true },
    );
  }

  static async verifyUser(userId: string) {
    return await User.findByIdAndUpdate(userId, { isVerified: true });
  }

  static async findByUserReaction(userId: string) {
    return await Reaction.find({
      userId: new Types.ObjectId(userId),
    })
      .populate("targetId")
      .sort({ createdAt: -1 });
  }

  static async findByUserShares(userId: string) {
    return await Share.find({
      userId: new Types.ObjectId(userId),
    })
      .populate("platform")
      .sort({ createdAt: -1 });
  }

  static async updatePassword(userId: string, hashedPassword: string) {
    return await User.findByIdAndUpdate(userId, {
      passwordHash: hashedPassword,
    });
  }

  static async setResetToken(userId: string, token: string, expiresAt: Date) {
    return AuthToken.create({
      userId,
      tokenHash: token,
      purpose: "reset-password",
      expiresAt,
    });
  }

  static async findByResetToken(token: string) {
    return AuthToken.findOne({
      tokenHash: token,
      purpose: "reset-password",
      usedAt: { $exists: false },
      expiresAt: { $gt: new Date() },
    });
  }
}
