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

export class AuthService {
  static async signup(data:CreateUserDTO) {
    const { name, email, password } = data;

    const existingUser = await UserRepository.findByEmail(email);

    if (existingUser) {
      throw new HttpError("Email already in use", 400);
    }

    const passwordHash = await hash(password);

    const user = await UserRepository.create({
      name,
      email,
      password: passwordHash,
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

  static async login(data:LoginDTO) {
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
      role:user.role
    };
  }

  static async verifyEmail(token: string) {
    const userId = await TokenService.verifyToken(token);
    await UserRepository.verifyUser(userId.toString());
    return;
  }
};
