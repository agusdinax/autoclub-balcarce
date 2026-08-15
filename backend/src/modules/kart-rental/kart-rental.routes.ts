import { Router } from "express";

import { validate } from "../../middlewares/validate.middleware";
import { objectIdSchema } from "../../utils/object-id.schema";

import {
  createKartRentalSchema,
  updateKartRentalSchema,
} from "./kart-rental.schema";

import {
  createKartRentalController,
  deleteKartRentalController,
  getKartRentalByIdController,
  getKartRentalsController,
  updateKartRentalController,
} from "./kart-rental.controller";
import {
  authMiddleware,
} from "../../middlewares/auth.middleware";

import {
  requireRole,
} from "../../middlewares/role.middleware";

import {
  UserRole,
} from "../users/user.types";
export const kartRentalRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Kart Rentals
 *   description: Kart rental configuration and pricing for Auto Club Balcarce kartodromes
 */

/**
 * @swagger
 * /kart-rentals:
 *   get:
 *     summary: Get all kart rental configurations
 *     description: Returns all active and inactive kart rental configurations.
 *     tags: [Kart Rentals]
 *     responses:
 *       200:
 *         description: List of kart rental configurations
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
 *                     $ref: '#/components/schemas/KartRental'
 *
 *       400:
 *         description: Invalid request
 */
kartRentalRouter.get(
  "/",
  getKartRentalsController,
);

/**
 * @swagger
 * /kart-rentals/{id}:
 *   get:
 *     summary: Get a kart rental configuration by ID
 *     tags: [Kart Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the kart rental configuration
 *         schema:
 *           type: string
 *         example: 68f123456789abcdef123456
 *
 *     responses:
 *       200:
 *         description: Kart rental configuration found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/KartRental'
 *
 *       400:
 *         description: Invalid ObjectId
 *
 *       404:
 *         description: Kart rental configuration not found
 */
kartRentalRouter.get(
  "/:id",
  validate({
    params: objectIdSchema,
  }),
  getKartRentalByIdController,
);

/**
 * @swagger
 * /kart-rentals:
 *   post:
 *     summary: Create a kart rental configuration
 *     description: Creates a kart rental configuration for a kartodrome. This operation requires administrator authentication.
 *     tags: [Kart Rentals]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateKartRental'
 *
 *     responses:
 *       201:
 *         description: Kart rental configuration created successfully
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
 *         description: Circuit is not a kartodrome or a rental configuration already exists
 */
kartRentalRouter.post(
  "/",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate({
    body: createKartRentalSchema,
  }),
  createKartRentalController,
);

/**
 * @swagger
 * /kart-rentals/{id}:
 *   patch:
 *     summary: Update a kart rental configuration
 *     description: Partially updates an existing kart rental configuration. This operation requires administrator authentication.
 *     tags: [Kart Rentals]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the kart rental configuration
 *         schema:
 *           type: string
 *         example: 68f123456789abcdef123456
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateKartRental'
 *
 *     responses:
 *       200:
 *         description: Kart rental configuration updated successfully
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
 *         description: Kart rental configuration or circuit not found
 *
 *       409:
 *         description: Circuit is not a kartodrome or another rental configuration already exists
 */
kartRentalRouter.patch(
  "/:id",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate({
    params: objectIdSchema,
    body: updateKartRentalSchema,
  }),
  updateKartRentalController,
);

/**
 * @swagger
 * /kart-rentals/{id}:
 *   delete:
 *     summary: Delete a kart rental configuration
 *     description: Permanently deletes a kart rental configuration. This operation requires administrator authentication.
 *     tags: [Kart Rentals]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the kart rental configuration
 *         schema:
 *           type: string
 *         example: 68f123456789abcdef123456
 *
 *     responses:
 *       204:
 *         description: Kart rental configuration deleted successfully
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
 *         description: Kart rental configuration not found
 */
kartRentalRouter.delete(
  "/:id",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate({
    params: objectIdSchema,
  }),
  deleteKartRentalController,
);