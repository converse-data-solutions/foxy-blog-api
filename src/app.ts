import dotenv from "dotenv";
dotenv.config();
import express from "express";
import swaggerUi from "swagger-ui-express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import { errorHandler } from "./common/middlewares/error.middleware";
import { swaggerSpec } from "./config/swagger";
import { uploadConfig } from "./config/upload.validation";
import apiRoutes from "./routes";


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }),
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", apiRoutes);

if (process.env.NODE_ENV !== "production") {
  app.use("/uploads", express.static(uploadConfig.staticPath));
}

app.use(errorHandler);

export default app;
