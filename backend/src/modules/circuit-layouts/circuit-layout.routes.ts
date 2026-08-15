import { Router } from "express";

import {
  validate,
} from "../../middlewares/validate.middleware";

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
  createCircuitLayoutSchema,
} from "./circuit-layout.schema";

import {
  createCircuitLayoutController,
  getCircuitLayoutByIdController,
  getCircuitLayoutsController,
} from "./circuit-layout.controller";

export const circuitLayoutRouter =
  Router();

/**
 * @swagger
 * tags:
 *   name: Circuit Layouts
 *   description: Different configurations of each circuit
 */

/**
 * @swagger
 * /circuit-layouts:
 *   get:
 *     summary: Get all circuit layouts
 *     description: Returns all available configurations of the Auto Club Balcarce circuits.
 *     tags: [Circuit Layouts]
 *     responses:
 *       200:
 *         description: List of circuit layouts
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
 *                     $ref: '#/components/schemas/CircuitLayout'
 */
circuitLayoutRouter.get(
  "/",
  getCircuitLayoutsController,
);

/**
 * @swagger
 * /circuit-layouts/{id}:
 *   get:
 *     summary: Get a circuit layout by ID
 *     description: Returns a specific configuration of a circuit.
 *     tags: [Circuit Layouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the circuit layout
 *         schema:
 *           type: string
 *         example: 68b123456789abcdef123456
 *     responses:
 *       200:
 *         description: Circuit layout found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/CircuitLayout'
 *
 *       400:
 *         description: Invalid ObjectId
 *
 *       404:
 *         description: Circuit layout not found
 */
circuitLayoutRouter.get(
  "/:id",
  validate({
    params: objectIdSchema,
  }),
  getCircuitLayoutByIdController,
);

/**
 * @swagger
 * /circuit-layouts:
 *   post:
 *     summary: Create a circuit layout
 *     description: Creates a new configuration for an existing circuit. This operation requires administrator authentication.
 *     tags: [Circuit Layouts]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCircuitLayout'
 *
 *     responses:
 *       201:
 *         description: Circuit layout created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/CircuitLayout'
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
 *         description: Layout already exists
 */
circuitLayoutRouter.post(
  "/",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate({
    body:
      createCircuitLayoutSchema,
  }),
  createCircuitLayoutController,
);