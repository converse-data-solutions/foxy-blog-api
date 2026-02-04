import { AdminDashboardRepository } from "./admin.dashboard.repository";

export class AdminDashboardService {
  static async getDashboardData() {
    const [
      stats,
      recentBlogs,
      recentUsers,
      reports
    ] = await Promise.all([
      AdminDashboardRepository.getStats(),
      AdminDashboardRepository.getRecentBlogs(),
      AdminDashboardRepository.getRecentUsers(),
      AdminDashboardRepository.getRecentComments()
    ]);

    return {
      stats,
      recentBlogs,
      recentUsers,
      reports
    };
  }
};
