import { Router } from "express";
import { upload } from "../../config/multer.config";
import { requireAuth } from "../../common/middlewares/auth.middleware";
import { ImageController } from "./upload.controller";

const router = Router();

/**
 * @swagger
 * /api/images/upload/{type}:
 *   post:
 *     summary: Upload an image
 *     description: |
 *       Upload an image file.
 *       
 *       - In **development**, image is stored locally
 *       - In **production**, image is uploaded to AWS S3
 *       
 *       The uploaded image is registered in the Image database
 *       and can later be attached to a blog post or user profile.
 *     tags:
 *       - Images
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - avatar
 *             - userCover
 *             - blogCover
 *         description: Image category
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (jpg, png, jpeg)
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image uploaded successfully
 *                 url:
 *                   type: string
 *                   example: /uploads/blogCover/170000000.png
 *       400:
 *         description: Image missing or invalid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
  "/upload/:type",
  requireAuth,
  upload.single("image"),
  ImageController.upload
);


/**
 * @swagger
 * /api/images/upload/gallery/{type}:
 *   post:
 *     summary: Upload blog image gallery (multi-select)
 *     tags:
 *       - Images
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           example: blogGallery
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Uploaded
 */

router.post(
  "/upload/gallery/:type",
  requireAuth,
  upload.array("images", 5),
  ImageController.uploadGallery
);


export default router;
