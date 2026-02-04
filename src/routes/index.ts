import { Router } from "express";
import authRoutes from "../modules/auth";
import adminDashboardRoutes from "../modules/dashboard";
import { adminCommentRoutes, commentRoutes } from "../modules/comments";
import reactionRoutes from "../modules/reactions";
import bookmarkRoutes from "../modules/bookmarks";
import postViewRoutes from "../modules/post-view";
import shareRoutes from "../modules/shares";
import { adminUserRoutes, userRoutes } from "../modules/users";
import notificationRoutes from "../modules/notifications";
import postRoutes from "../modules/posts";
import uploadRoutes from "../modules/uploads";
import categoryRoutes from "../modules/categories";
import tagRoutes from "../modules/tags";

import {
  authLimiter,
  commentLimiter,
  reactionLimiter,
  bookmarkLimiter,
  uploadLimiter,
  readLimiter,
  adminLimiter,
} from "../config/rate-limit.config";

const router = Router();

/* 🔐 Auth */
router.use("/auth", authLimiter, authRoutes);

/* 📝 Engagement */
router.use("/comments", commentLimiter, commentRoutes);
router.use("/reactions", reactionLimiter, reactionRoutes);
router.use("/bookmarks", bookmarkLimiter, bookmarkRoutes);
router.use("/shares", readLimiter, shareRoutes);

/* 👀 Views & public reads */
router.use("/views", readLimiter, postViewRoutes);
router.use("/posts", readLimiter, postRoutes);

/* 👤 Users */
router.use("/users", readLimiter, userRoutes);
router.use("/notifications", readLimiter, notificationRoutes);

/* 📤 Uploads */
router.use("/images", uploadLimiter, uploadRoutes);

/* 🔐 Admin (STRICT) */
router.use("/admin/categories", adminLimiter, categoryRoutes);
router.use("/admin/tags", adminLimiter, tagRoutes);
router.use("/admin/users", adminLimiter, adminUserRoutes);
router.use("/admin/comments", adminLimiter, adminCommentRoutes);
router.use("/admin/dashboard", adminLimiter, adminDashboardRoutes);

export default router;
