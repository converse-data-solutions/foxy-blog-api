import { Router } from "express";
import { AuthController } from "./auth.controller";
import passport from "../../config/passport";
import { loginSchema, signupSchema } from "./auth.schema";
import { validate } from "../../common/middlewares/validate";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: User signup
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Karthik
 *               email:
 *                 type: string
 *                 example: karthi@gmail.com
 *               password:
 *                 type: string
 *                 example: Strong@123
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/signup", validate(signupSchema), AuthController.signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: karthi@gmail.com
 *               password:
 *                 type: string
 *                 example: Strong@123
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", validate(loginSchema), AuthController.login);

/**
 * @swagger
 * /api/auth/verify/{token}:
 *   get:
 *     summary: Verify email
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 */
router.get("/verify/:token", AuthController.verifyEmail);

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Login with Google
 *     description: Redirects the user to Google OAuth consent screen.
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Google login page
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     description: Google redirects back to this endpoint after authentication.
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to frontend dashboard after successful login
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.redirect("/dashboard");
  },
);

export default router;
