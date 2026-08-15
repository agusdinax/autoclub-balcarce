import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { objectIdSchema } from "../../utils/object-id.schema";
import {createEventSchema, updateEventSchema,} from "./event.schema";
import {createEventController, getEventByIdController, getEventsController, updateEventController, deleteEventController,} from "./event.controller";

import { eventQuerySchema } from "./event.query.schema";
import {
  authMiddleware,
} from "../../middlewares/auth.middleware";

import {
  requireRole,
} from "../../middlewares/role.middleware";

import {
  UserRole,
} from "../users/user.types";

export const eventRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Races, test days and special events managed by Auto Club Balcarce
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get events
 *     description: Returns events ordered by date. Results can be filtered by type, status, circuit and date range.
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: type
 *         required: false
 *         description: Filter events by type
 *         schema:
 *           type: string
 *           enum:
 *             - RACE
 *             - TEST_DAY
 *             - SPECIAL_EVENT
 *         example: RACE
 *
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filter events by status
 *         schema:
 *           type: string
 *           enum:
 *             - DRAFT
 *             - PUBLISHED
 *             - CANCELLED
 *             - FINISHED
 *         example: PUBLISHED
 *
 *       - in: query
 *         name: circuit
 *         required: false
 *         description: Filter events by circuit MongoDB ObjectId
 *         schema:
 *           type: string
 *         example: 68a123456789abcdef123456
 *
 *       - in: query
 *         name: from
 *         required: false
 *         description: Return events from this date
 *         schema:
 *           type: string
 *           format: date-time
 *         example: 2026-09-01T00:00:00.000Z
 *
 *       - in: query
 *         name: to
 *         required: false
 *         description: Return events until this date
 *         schema:
 *           type: string
 *           format: date-time
 *         example: 2026-09-30T23:59:59.999Z
 *
 *     responses:
 *       200:
 *         description: List of events
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
 *                     $ref: '#/components/schemas/Event'
 *
 *       400:
 *         description: Invalid query parameters
 */
eventRouter.get(
  "/",
  validate({
    query: eventQuerySchema,
  }),
  getEventsController,
);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the event
 *         schema:
 *           type: string
 *         example: 68a123456789abcdef123456
 *
 *     responses:
 *       200:
 *         description: Event found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *
 *       400:
 *         description: Invalid ObjectId
 *
 *       404:
 *         description: Event not found
 */
eventRouter.get(
  "/:id",
  validate({
    params: objectIdSchema,
  }),
  getEventByIdController,
);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: Creates a race, test day or special event associated with a circuit, circuit layout and optional categories.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEvent'
 *
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *       401:
 *         description: Authentication required or invalid token
 *       403:
 *         description: Insufficient permissions
 *       400:
 *         description: Invalid request body or ObjectId
 *
 *       404:
 *         description: Circuit, circuit layout or category not found
 *
 *       409:
 *         description: Circuit layout or category does not belong to the selected circuit
 */
eventRouter.post(
  "/",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate({
    body: createEventSchema,
  }),
  createEventController,
);

/**
 * @swagger
 * /events/{id}:
 *   patch:
 *     summary: Update an event
 *     description: Partially updates an existing event. This operation requires administrator authentication.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the event
 *         schema:
 *           type: string
 *         example: 68a123456789abcdef123456
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEvent'
 *
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Event'
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
 *         description: Event, circuit, layout or category not found
 *
 *       409:
 *         description: Circuit layout or category does not belong to the selected circuit
 */
eventRouter.patch(
  "/:id",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate({
    params: objectIdSchema,
    body: updateEventSchema,
  }),
  updateEventController,
);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event
 *     description: Permanently deletes an event. This operation requires administrator authentication.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the event
 *         schema:
 *           type: string
 *         example: 68a123456789abcdef123456
 *
 *     responses:
 *       204:
 *         description: Event deleted successfully
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
 *         description: Event not found
 */
eventRouter.delete(
  "/:id",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate({
    params: objectIdSchema,
  }),
  deleteEventController,
);