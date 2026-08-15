import { Router } from "express";

import { validate } from "../../middlewares/validate.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";

import { objectIdSchema } from "../../utils/object-id.schema";

import { UserRole } from "../users/user.types";

import {
  createCircuitSchema,
} from "./circuit.schema";

import {
  createCircuitController,
  getCircuitByIdController,
  getCircuitsController,
} from "./circuit.controller";

export const circuitRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Circuits
 *   description: Main circuits managed by Auto Club Balcarce
 */

/**
 * @swagger
 * /circuits:
 *   get:
 *     summary: Get all circuits
 *     description: Returns the main circuits managed by Auto Club Balcarce.
 *     tags: [Circuits]
 *     responses:
 *       200:
 *         description: List of circuits
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
 *                     $ref: '#/components/schemas/Circuit'
 */
circuitRouter.get(
  "/",
  getCircuitsController,
);

/**
 * @swagger
 * /circuits/{id}:
 *   get:
 *     summary: Get a circuit by ID
 *     description: Returns a specific circuit.
 *     tags: [Circuits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the circuit
 *         schema:
 *           type: string
 *         example: 68a123456789abcdef123456
 *     responses:
 *       200:
 *         description: Circuit found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Circuit'
 *
 *       400:
 *         description: Invalid ObjectId
 *
 *       404:
 *         description: Circuit not found
 */
circuitRouter.get(
  "/:id",
  validate({
    params: objectIdSchema,
  }),
  getCircuitByIdController,
);

/**
 * @swagger
 * /circuits:
 *   post:
 *     summary: Create a new circuit
 *     description: Creates a new circuit. This operation requires administrator authentication.
 *     tags: [Circuits]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCircuit'
 *
 *     responses:
 *       201:
 *         description: Circuit created successfully
 *
 *       400:
 *         description: Invalid request body
 *
 *       401:
 *         description: Authentication required or invalid token
 *
 *       403:
 *         description: Insufficient permissions
 *
 *       409:
 *         description: Circuit already exists
 */
circuitRouter.post(
  "/",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate({
    body: createCircuitSchema,
  }),
  createCircuitController,
);