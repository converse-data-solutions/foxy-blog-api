import jwt from "jsonwebtoken";

export interface AuthJwtPayload extends jwt.JwtPayload {
  userId: string;
  role: "admin" | "user"; // adjust as needed
}
