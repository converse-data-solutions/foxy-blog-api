import { AuthToken } from "./authtoken.model";

export class AuthTokenRepository {
  static async create(data: {
    userId: string;
    tokenHash: string;
    purpose: "verification" | "passwordReset";
    expiresAt: Date;
  }) {
    return await AuthToken.create(data);
  }

 static async findValidTokenByHash(tokenHash: string) {
    return await AuthToken.findOne({
      tokenHash,
      usedAt: { $exists: false },
      expiresAt: { $gt: new Date() },
    });
}
}
