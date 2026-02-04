import { Types } from "mongoose";
import { Profile } from "./profile.model";
import { User } from "./user.model";
import { UserRepository } from "./user.repository";

export class UserService {
  static async findById(id: string) {
    return await User.findById(id).select("-passwordHash");
  }

  static async findAll() {
    return await User.find().select("-passwordHash");
  }

  static async delete(id: string) {
    return await User.findByIdAndDelete(id);
  }
  static async getByUserId(userId: string) {
    return await Profile.findOne({ userId });
  }

  static async upsert(userId: string, data: any) {
    return await Profile.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { ...data, updatedAt: new Date() },
      { new: true, upsert: true },
    );
  }

  static async getMyReactions(userId: string) {
    return await UserRepository.findByUserReaction(userId);
  }

  static async getMyShares(userId: string) {
    return await UserRepository.findByUserShares(userId);
  }
}
