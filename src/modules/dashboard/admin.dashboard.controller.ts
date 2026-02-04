import { Request, Response } from "express";
import { AdminDashboardService } from "./admin.dashboard.service";

export const AdminDashboardController = {
  async getDashboard(req: Request, res: Response) {
    const data = await AdminDashboardService.getDashboardData();

    return res.status(200).json({
      statusCode: 200,
      message: "Admin dashboard data fetched successfully",
      data
    });
  }
};
