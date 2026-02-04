import { Types } from "mongoose";
import { User } from "./user.model";
import { Reaction } from "../reactions/reaction.model";
import { Share } from "../shares/share.model";

export class UserRepository {
  static async create(data: {
    name: string;
    email: string;
    password: string;
    authProvider: string;
    isVerified: boolean;
  }) {
    return await User.create(data);
  }

  static async findByEmail(email: string) {
    return await User.findOne({ email });
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
}
