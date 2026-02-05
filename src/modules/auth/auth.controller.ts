import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthRequest } from "../../types/auth-request";
import { success } from "zod";

export const AuthController = {
  async signup(req: Request, res: Response) {
    await AuthService.signup(req.body);

    return res.status(201).json({
      success:true,
      statusCode: 201,
      message: "Signup successful. Verification email sent.",
    });
  },

  async login(req: Request, res: Response) {
    const result = await AuthService.login(req.body);

    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: "Login successful",
      data: result,
    });
  },

  async verifyEmail(req: Request, res: Response) {
    await AuthService.verifyEmail(req.params.token as string);

    return res.status(200).json({
      success:true,
      statusCode: 200,
      message: "Email verified successfully",
    });
  },

  async logout(req: Request, res: Response) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Logged out successfully",
    });
  },


  // 📩 Forgot password
  async forgotPassword(req: Request, res: Response) {
    
      const { email } = req.body;

      const result = await AuthService.forgotPassword(email);

      res.json({
        message: "If the email exists, a reset link has been sent",
      });
  },

  // 🔁 Reset password
  async resetPassword(req: Request, res: Response) {
      const { token, newPassword } = req.body;

      await AuthService.resetPassword(token, newPassword);

      res.json({ message: "Password reset successfully" });
   
  },
};
