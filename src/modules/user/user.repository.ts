// repositories/user.repository.ts
import { User } from "../user/user.model";

export class UserRepository {
  static create(data: any) {
    return User.create(data);
  }

  static findByEmail(email: string) {
    return User.findOne({ email });
  }

  static verifyUser(userId: string) {
    return User.findByIdAndUpdate(userId, { isVerified: true });
  }
}
