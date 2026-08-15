import { Router } from "express";

import { validate } from "../../middlewares/validate.middleware";
import { objectIdSchema } from "../../utils/object-id.schema";
import {
  authMiddleware,
} from "../../middlewares/auth.middleware";

import {
  requireRole,
} from "../../middlewares/role.middleware";

import {
  UserRole,
} from "../users/user.types";

import {
  createNewsSchema,
  updateNewsSchema,
} from "./news.schema";

import {
  createNewsController,
  deleteNewsController,
  getNewsByIdController,
  getNewsController,
  updateNewsController,
} from "./news.controller";

export const newsRouter = Router();

/**
 * @swagger
 * tags:
 *   name: News
 *   description: News and announcements published by Auto Club Balcarce
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Get news
 *     description: Returns news ordered by publication date. Results can be filtered by status, circuit and event.
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filter news by publication status
 *         schema:
 *           type: string
 *           enum:
 *             - DRAFT
 *             - PUBLISHED
 *             - ARCHIVED
 *         example: PUBLISHED
 *
 *       - in: query
 *         name: circuit
 *         required: false
 *         description: Filter news associated with a specific circuit
 *         schema:
 *           type: string
 *         example: 68a123456789abcdef123456
 *
 *       - in: query
 *         name: event
 *         required: false
 *         description: Filter news associated with a specific event
 *         schema:
 *           type: string
 *         example: 68e123456789abcdef123456
 *
 *     responses:
 *       200:
 *         description: List of news
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
 *                     $ref: '#/components/schemas/News'
 *
 *       400:
 *         description: Invalid query parameters
 */
newsRouter.get(
  "/",
  getNewsController,
);

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get a news article by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the news article
 *         schema:
 *           type: string
 *         example: 68f123456789abcdef123456
 *
 *     responses:
 *       200:
 *         description: News article found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/News'
 *
 *       400:
 *         description: Invalid ObjectId
 *
 *       404:
 *         description: News article not found
 */
newsRouter.get(
  "/:id",
  validate({
    params: objectIdSchema,
  }),
  getNewsByIdController,
);

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Create a news article
 *     description: Creates a new news article. This operation requires administrator authentication.
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNews'
 *
 *     responses:
 *       201:
 *         description: News article created successfully
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
 *         description: Circuit or event not found
 *
 *       409:
 *         description: Published news must have a publication date
 */
newsRouter.post(
  "/",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate({
    body: createNewsSchema,
  }),
  createNewsController,
);

/**
 * @swagger
 * /news/{id}:
 *   patch:
 *     summary: Update a news article
 *     description: Partially updates an existing news article. This operation requires administrator authentication.
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the news article
 *         schema:
 *           type: string
 *         example: 68f123456789abcdef123456
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateNews'
 *
 *     responses:
 *       200:
 *         description: News article updated successfully
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
 *         description: News article, circuit or event not found
 *
 *       409:
 *         description: Published news must have a publication date
 */
newsRouter.patch(
  "/:id",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate({
    params: objectIdSchema,
    body: updateNewsSchema,
  }),
  updateNewsController,
);

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Delete a news article
 *     description: Permanently deletes a news article. This operation requires administrator authentication.
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the news article
 *         schema:
 *           type: string
 *         example: 68f123456789abcdef123456
 *
 *     responses:
 *       204:
 *         description: News article deleted successfully
 *
 *       400:
 *         description: Invalid ObjectId
 *
 *       401:
 *         description: Authentication required or invalid token
 *
 *       403:
 *         description: Insufficient permissions
 *
 *       404:
 *         description: News article not found
 */
newsRouter.delete(
  "/:id",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate({
    params: objectIdSchema,
  }),
  deleteNewsController,
);