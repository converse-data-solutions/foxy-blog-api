import { User } from "../user.model";

 
 export class AdminUserRepository {
 static async findAll() {
    return await User.find().select("-passwordHash");
  }
 static async findByIdWise(id: string) {
    return await User.findOne({ id }).select("-passwordHash");
  }

  static async deleteUser(id: string) {
    return await User.findByIdAndDelete(id);
  }
  static async blockUser(id: string) {
    return await User.findByIdAndUpdate(id, { isBlocked: true });
  }
 }