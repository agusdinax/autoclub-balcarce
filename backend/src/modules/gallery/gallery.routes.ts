import { Router } from "express";

import { validate } from "../../middlewares/validate.middleware";
import { objectIdSchema } from "../../utils/object-id.schema";

import {
  createGallerySchema,
  updateGallerySchema,
} from "./gallery.schema";

import {
  createGalleryController,
  deleteGalleryController,
  getGalleriesController,
  getGalleryByIdController,
  updateGalleryController,
} from "./gallery.controller";
import {
  authMiddleware,
} from "../../middlewares/auth.middleware";

import {
  requireRole,
} from "../../middlewares/role.middleware";

import {
  UserRole,
} from "../users/user.types";

export const galleryRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Gallery
 *   description: Photo galleries related to Auto Club Balcarce circuits and events
 */

/**
 * @swagger
 * /gallery:
 *   get:
 *     summary: Get all galleries
 *     description: Returns photo galleries ordered by creation date.
 *     tags: [Gallery]
 *     parameters:
 *       - in: query
 *         name: circuit
 *         required: false
 *         description: Filter galleries associated with a specific circuit
 *         schema:
 *           type: string
 *         example: 68a123456789abcdef123456
 *
 *       - in: query
 *         name: event
 *         required: false
 *         description: Filter galleries associated with a specific event
 *         schema:
 *           type: string
 *         example: 68e123456789abcdef123456
 *
 *       - in: query
 *         name: isActive
 *         required: false
 *         description: Filter galleries by active status
 *         schema:
 *           type: boolean
 *         example: true
 *
 *     responses:
 *       200:
 *         description: List of galleries
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
 *                     $ref: '#/components/schemas/Gallery'
 *
 *       400:
 *         description: Invalid query parameters
 */
galleryRouter.get(
  "/",
  getGalleriesController,
);

/**
 * @swagger
 * /gallery/{id}:
 *   get:
 *     summary: Get a gallery by ID
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the gallery
 *         schema:
 *           type: string
 *         example: 68f123456789abcdef123456
 *
 *     responses:
 *       200:
 *         description: Gallery found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Gallery'
 *
 *       400:
 *         description: Invalid ObjectId
 *
 *       404:
 *         description: Gallery not found
 */
galleryRouter.get(
  "/:id",
  validate({
    params: objectIdSchema,
  }),
  getGalleryByIdController,
);

/**
 * @swagger
 * /gallery:
 *   post:
 *     summary: Create a gallery
 *     description: Creates a photo gallery optionally associated with a circuit and/or event. This operation requires administrator authentication.
 *     tags: [Gallery]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateGallery'
 *
 *     responses:
 *       201:
 *         description: Gallery created successfully
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
 */
galleryRouter.post(
  "/",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate({
    body: createGallerySchema,
  }),
  createGalleryController,
);

/**
 * @swagger
 * /gallery/{id}:
 *   patch:
 *     summary: Update a gallery
 *     description: Partially updates an existing photo gallery. This operation requires administrator authentication.
 *     tags: [Gallery]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the gallery
 *         schema:
 *           type: string
 *         example: 68f123456789abcdef123456
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateGallery'
 *
 *     responses:
 *       200:
 *         description: Gallery updated successfully
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
 *         description: Gallery, circuit or event not found
 */
galleryRouter.patch(
  "/:id",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate({
    params: objectIdSchema,
    body: updateGallerySchema,
  }),
  updateGalleryController,
);

/**
 * @swagger
 * /gallery/{id}:
 *   delete:
 *     summary: Delete a gallery
 *     description: Permanently deletes a photo gallery. This operation requires administrator authentication.
 *     tags: [Gallery]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the gallery
 *         schema:
 *           type: string
 *         example: 68f123456789abcdef123456
 *
 *     responses:
 *       204:
 *         description: Gallery deleted successfully
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
 *         description: Gallery not found
 */
galleryRouter.delete(
  "/:id",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate({
    params: objectIdSchema,
  }),
  deleteGalleryController,
);