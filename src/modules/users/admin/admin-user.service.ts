import { User } from "../user.model";
import { AdminUserRepository } from "./admin-user.repository";

 export class AdminUserService {
 static async findAll() {
    return await AdminUserRepository.findAll();
  }

  static async findById(id: string) {
    return await AdminUserRepository.findByIdWise(id);
  }

  static async delete(id: string) {
    return await AdminUserRepository.deleteUser(id);
  }
  static async block(id: string) {
    return await AdminUserRepository.blockUser(id);
  }

}