import { AuthToken } from "./authtoken.model";

export const AuthTokenRepository = {
  create: (data: any) => AuthToken.create(data),

  findValidTokenByHash: (tokenHash: string) =>
    AuthToken.findOne({
      tokenHash,
      usedAt: { $exists: false },
      expiresAt: { $gt: new Date() },
    }),
};
