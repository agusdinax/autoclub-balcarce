import { Router } from "express";

import { validate } from "../../middlewares/validate.middleware";

import {
  authMiddleware,
} from "../../middlewares/auth.middleware";

import {
  requireRole,
} from "../../middlewares/role.middleware";

import {
  objectIdSchema,
} from "../../utils/object-id.schema";

import {
  UserRole,
} from "../users/user.types";

import {
  createCategorySchema,
} from "./category.schema";

import {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
} from "./category.controller";

export const categoryRouter =
  Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Competition categories associated with circuits
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Returns all competition categories associated with circuits.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 */
categoryRouter.get(
  "/",
  getCategoriesController,
);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     description: Returns a specific competition category.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the category
 *         schema:
 *           type: string
 *         example: 68a123456789abcdef123456
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *
 *       400:
 *         description: Invalid ObjectId
 *
 *       404:
 *         description: Category not found
 */
categoryRouter.get(
  "/:id",
  validate({
    params: objectIdSchema,
  }),
  getCategoryByIdController,
);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Creates a competition category associated with a circuit. This operation requires administrator authentication.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *
 *       400:
 *         description: Invalid request body or ObjectId
 *
 *       401:
 *         description: Authentication required or invalid token
 *
 *       403:
 *         description: Insufficient permissions
 *
 *       404:
 *         description: Circuit not found
 *
 *       409:
 *         description: Category already exists for this circuit
 */
categoryRouter.post(
  "/",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate({
    body: createCategorySchema,
  }),
  createCategoryController,
);