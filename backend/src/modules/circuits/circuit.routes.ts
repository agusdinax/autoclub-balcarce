import { Router } from "express";

import { validate } from "../../middlewares/validate.middleware";

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
 *     tags: [Circuits]
 *     responses:
 *       200:
 *         description: List of circuits
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
 *     tags: [Circuits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Circuit found
 *       400:
 *         description: Invalid ObjectId
 *       404:
 *         description: Circuit not found
 */
circuitRouter.get(
  "/:id",
  getCircuitByIdController,
);

/**
 * @swagger
 * /circuits:
 *   post:
 *     summary: Create a new circuit
 *     tags: [Circuits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCircuit'
 *     responses:
 *       201:
 *         description: Circuit created successfully
 *       400:
 *         description: Invalid request body
 *       409:
 *         description: Circuit already exists
 */
circuitRouter.post(
  "/",
  validate(createCircuitSchema),
  createCircuitController,
);