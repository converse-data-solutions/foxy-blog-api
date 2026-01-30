import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export const AuthController = {
  async signup(req: Request, res: Response) {
    await AuthService.signup(req.body);

    return res.status(201).json({
      statusCode: 201,
      message: "Signup successful. Verification email sent.",
      data: null,
    });
  },

  async login(req: Request, res: Response) {
    const result = await AuthService.login(
      req.body.email,
      req.body.password
    );

    return res.status(200).json({
      statusCode: 200,
      message: "Login successful",
      data: result,
    });
  },

  async verifyEmail(req: Request, res: Response) {
    await AuthService.verifyEmail(req.params.token as string);

    return res.status(200).json({
      statusCode: 200,
      message: "Email verified successfully",
      data: null,
    });
  },
};
