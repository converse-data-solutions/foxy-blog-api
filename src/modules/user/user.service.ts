import { Types } from "mongoose";
import { Profile } from "./profile.model";
import { User } from "./user.model";

export const UserService = {
  findById(id: string) {
    return User.findById(id).select("-passwordHash");
  },

  findAll() {
    return User.find().select("-passwordHash");
  },

  updateRole(id: string, role: "user" | "admin") {
    return User.findByIdAndUpdate(id, { role }, { new: true });
  },

  delete(id: string) {
    return User.findByIdAndDelete(id);
  },
  getByUserId(userId: string) {
    return Profile.findOne({ userId });
  },

  async upsert(userId: string, data: any) {
    return Profile.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { ...data, updatedAt: new Date() },
      { new: true, upsert: true }
    );
  },
};
