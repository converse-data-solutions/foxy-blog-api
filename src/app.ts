import dotenv from "dotenv";
dotenv.config();
import express from "express";
import swaggerUi from "swagger-ui-express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import { errorHandler } from "./common/middlewares/error.middleware";
import { swaggerSpec } from "./config/swagger";
import categoryRoutes from "./modules/category";
import postRoutes from "./modules/post";
import tagRoutes from "./modules/tag";
import authModule from "./modules/auth";
import { userRoutes, adminUserRoutes } from "./modules/user";
import {commentRoutes, adminCommentRoutes} from "./modules/comment";
import reactionRoutes from "./modules/reaction";
import  bookmarkRoutes  from "./modules/bookmark";
import postViewRoutes from "./modules/post-view"
import shareRoutes from "./modules/share";
import notificationRoutes from "./modules/notification"


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET!, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authModule);
app.use("/api/posts", postRoutes);
app.use("/api/admin/categories", categoryRoutes);
app.use("/api/admin/tags", tagRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/admin/comment-moderation", adminCommentRoutes);
app.use("/api/reactions", reactionRoutes);
app.use("/api/bookmarks",bookmarkRoutes );
app.use("/api/post-views", postViewRoutes);
app.use("/api/shares", shareRoutes);
app.use("/api/notifications", notificationRoutes);


app.use(errorHandler);


export default app;
