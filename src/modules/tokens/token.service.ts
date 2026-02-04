import crypto from "crypto";
import { AuthTokenRepository } from "./authtoken.repository";
import { hash } from "../../common/utils/hash";

export class TokenService {
  static async createVerificationToken(userId: string) {
    const raw = crypto.randomBytes(32).toString("hex");
    const tokenHash = await hash(raw);

    await AuthTokenRepository.create({
      userId,
      tokenHash,
      purpose: "verification",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return raw;
  }

  static async verifyToken(token: string) {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const authToken = await AuthTokenRepository.findValidTokenByHash(tokenHash);
    if (!authToken) {
      throw new Error("Invalid token");
    }

    authToken.usedAt = new Date();
    await authToken.save();

    return authToken.userId;
  }
};
