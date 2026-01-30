import { Request, Response } from "express";
import { UserService } from "./user.service";


export const AdminUserController = {
  async getAllUsers(req: Request, res: Response) {
    const users = await UserService.findAll();
    res.json(users);
  },

  async updateUserRole(req: Request, res: Response) {
    const user = await UserService.updateRole(req.params.id as string, req.body.role);
    res.json(user);
  },

  async deleteUser(req: Request, res: Response) {
    await UserService.delete(req.params.id as string);
    res.json({ message: "User deleted successfully" });
  },
};
