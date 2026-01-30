import { Router } from "express";
import { CategoryController } from "./category.controller";
import { requireAuth } from "../../common/middlewares/auth.middleware";
import { allowRoles } from "../../common/middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Admin category management
 */

/**
 * @swagger
 * /api/admin/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
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
 *                 example: Technology
 *               slug:
 *                 type: string
 *                 example: technology
 *               description:
 *                 type: string
 *                 example: Tech related blogs
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.post("/", requireAuth, allowRoles("admin"), CategoryController.create);

/**
 * @swagger
 * /api/admin/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/", CategoryController.getAll);

/**
 * @swagger
 * /api/admin/categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Category updated
 */
router.put("/:id",requireAuth, allowRoles("admin"), CategoryController.update);

/**
 * @swagger
 * /api/admin/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 */
router.delete("/:id", requireAuth, allowRoles("admin"),CategoryController.delete);

export default router;
