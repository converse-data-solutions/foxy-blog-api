import { hash, compare } from "../../common/utils/hash";
import { signToken } from "../../common/utils/jwt";
import { generateVerificationToken } from "../../common/utils/token";
import { sendMail } from "../../common/utils/mailer";
import { emailVerificationTemplate } from "../../templates/emailVerification";
import { HttpError } from "../../common/utils/httpError";
import { CreateUserDTO } from "./create-user.dto";
import { LoginDTO } from "./login-user.dto";
import { UserRepository } from "../users/user.repository";
import { AuthToken } from "../tokens/authtoken.model";
import { TokenService } from "../tokens/token.service";
import * as crypto from "crypto";
import { forgotPasswordTemplate } from "../../templates/forgotPassword";
export class AuthService {
  static async signup(data: CreateUserDTO) {
    const { name, email, password } = data;

    const existingUser = await UserRepository.findByEmail(email);

    if (existingUser) {
      throw new HttpError("Email already in use", 400);
    }

    const passwordHash = await hash(password);

    const user = await UserRepository.create({
      name,
      email,
      passwordHash,
      authProvider: "local",
      isVerified: false,
    });

    const { rawToken, tokenHash } = generateVerificationToken();

    await AuthToken.create({
      userId: user._id,
      tokenHash,
      purpose: "verification",
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${rawToken}`;

    await sendMail(
      user.email,
      "Verify your email",
      emailVerificationTemplate(user.name, verifyUrl),
    );

    return {
      message: "Signup successful. Please verify your email.",
    };
  }

  static async login(data: LoginDTO) {
    const { email, password } = data;
    const user = await UserRepository.findByEmail(email);

    if (!user || !user.passwordHash) {
      throw new HttpError("Invalid email or password", 401);
    }

    if (!user.isVerified) {
      throw new HttpError("Please verify your email before logging in", 403);
    }
    const valid = await compare(password, user.passwordHash);
    if (!valid) {
      throw new HttpError("Invalid email or password", 401);
    }

    const accessToken = signToken({
      userId: user._id,
      role: user.role,
    });

    return {
      accessToken,
      role: user.role,
    };
  }

  static async verifyEmail(token: string) {
    const userId = await TokenService.verifyToken(token);
    await UserRepository.verifyUser(userId.toString());
    return;
  }

  static async forgotPassword(email: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) return; // security: don't expose user existence

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await UserRepository.setResetToken(user._id.toString(), token, expiresAt);

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await sendMail(
      user.email,
      "Reset your Blog App password",
      forgotPasswordTemplate(user.name, resetUrl),
    );

    return {
      email: user.email,
      token,
    };
  }

  static async resetPassword(token: string, newPassword: string) {
    const user = await UserRepository.findByResetToken(token);
    if (!user) throw new Error("Invalid or expired token");

    const hashed = await hash(newPassword);
    await UserRepository.updatePassword(user.userId.toString(), hashed);

    return true;
  }
}
