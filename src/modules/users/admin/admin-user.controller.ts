import { Request, Response } from "express";
import { AdminUserService } from "./admin-user.service";

export const AdminUserController = {
  async getAllUsers(req: Request, res: Response) {
    const users = await AdminUserService.findAll();
    res.json(users);
  },

  async deleteUser(req: Request, res: Response) {
    await AdminUserService.delete(req.params.id as string);
    res.json({ message: "User deleted successfully" });
  },
  async blockUser(req: Request, res: Response) {
    await AdminUserService.block(req.params.id as string);
    res.json({ message: "User blocked successfully" });
  },
};
