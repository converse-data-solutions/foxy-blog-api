import { Router } from "express";
import { TagController } from "./tag.controller";
import { requireAuth } from "../../common/middlewares/auth.middleware";
import { allowRoles } from "../../common/middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Admin tag management
 */

/**
 * @swagger
 * /api/admin/tags:
 *   post:
 *     summary: Create a new tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *             properties:
 *               name:
 *                 type: string
 *                 example: Node.js
 *               slug:
 *                 type: string
 *                 example: nodejs
 *     responses:
 *       201:
 *         description: Tag created successfully
 */
router.post("/", requireAuth, allowRoles("admin"), TagController.create);

/**
 * @swagger
 * /api/admin/tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: List of tags
 */
router.get("/", TagController.getAll);

/**
 * @swagger
 * /api/admin/tags/{id}:
 *   put:
 *     summary: Update a tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tag ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Tag updated successfully
 */
router.put("/:id", requireAuth, allowRoles("admin"), TagController.update);

/**
 * @swagger
 * /api/admin/tags/{id}:
 *   delete:
 *     summary: Delete a tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag deleted successfully
 */
router.delete("/:id", requireAuth, allowRoles("admin"), TagController.delete);

export default router;
