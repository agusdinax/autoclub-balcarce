import { Router } from "express";

import { validate } from "../../middlewares/validate.middleware";

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
 *     tags: [Circuit Layouts]
 *     responses:
 *       200:
 *         description: List of circuit layouts
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
 *     tags: [Circuit Layouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Circuit layout found
 *       400:
 *         description: Invalid ObjectId
 *       404:
 *         description: Circuit layout not found
 */
circuitLayoutRouter.get(
  "/:id",
  getCircuitLayoutByIdController,
);

/**
 * @swagger
 * /circuit-layouts:
 *   post:
 *     summary: Create a circuit layout
 *     tags: [Circuit Layouts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCircuitLayout'
 *     responses:
 *       201:
 *         description: Circuit layout created successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Circuit not found
 *       409:
 *         description: Layout already exists
 */
circuitLayoutRouter.post(
  "/",
  validate(createCircuitLayoutSchema),
  createCircuitLayoutController,
);