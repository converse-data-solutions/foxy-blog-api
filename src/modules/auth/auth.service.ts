import { hash, compare } from "../../common/utils/hash";
import { signToken } from "../../common/utils/jwt";
import { User } from "../user/user.model";
import { generateVerificationToken } from "../../common/utils/token";
import { sendMail } from "../../common/utils/mailer";
import { emailVerificationTemplate } from "../../templates/emailVerification";
import { HttpError } from "../../common/utils/httpError";
import { UserRepository } from "../user/user.repository";
import { TokenService } from "../Token/token.service";
import { AuthToken } from "../Token/authtoken.model";

export const AuthService = {
  async signup(data: { name: string; email: string; password: string }) {
    const { name, email, password } = data;

    // 1️⃣ Check if email already exists
    const existingUser = await UserRepository.findByEmail(email);

    if (existingUser) {
      throw new HttpError("Email already in use", 400);
    }

    // 2️⃣ Hash password
    const passwordHash = await hash(password);

    // 3️⃣ Create new user
    const user = await User.create({
      name,
      email,
      passwordHash,
      authProvider: "local",
      isVerified: false,
    });

    // 4️⃣ Generate verification token
    const { rawToken, tokenHash } = generateVerificationToken();

    await AuthToken.create({
      userId: user._id,
      tokenHash,
      purpose: "verification",
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });

    // 5️⃣ Send verification email
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${rawToken}`;

    await sendMail(
      user.email,
      "Verify your email",
      emailVerificationTemplate(user.name, verifyUrl),
    );

    return {
      message: "Signup successful. Please verify your email.",
    };
  },

  async login(email: string, password: string) {
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
    };
  },

  async verifyEmail(token: string) {
    const userId = await TokenService.verifyToken(token);
    await UserRepository.verifyUser(userId.toString());
    return;
  },
};
