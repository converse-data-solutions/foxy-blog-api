import { UserRepository } from "./user.repository";
import { compare, hash } from "../../common/utils/hash";

export class UserService {
  static async findById(id: string) {
    return await UserRepository.findByIdWise(id);
  }

 
  static async getByUserId(userId: string) {
    return await UserRepository.getProfile(userId);
  }

  static async upsert(userId: string, data: Partial<{ bio: string; avatarUrl: string }>) {
    return await UserRepository.updateProfile(userId, data);
  }

  static async getMyReactions(userId: string) {
    return await UserRepository.findByUserReaction(userId);
  }

  static async getMyShares(userId: string) {
    return await UserRepository.findByUserShares(userId);
  }

  static async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await UserRepository.verifyUser(userId);
    if (!user) throw new Error("User not found");

    const isMatch = await compare(oldPassword, user.passwordHash!);
    if (!isMatch) throw new Error("Old password is incorrect");

    const hashed = await hash(newPassword);

    await UserRepository.updatePassword(userId, hashed);
    return true;
  }
}
