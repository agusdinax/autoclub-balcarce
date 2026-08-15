import { Router } from "express";

import { validate } from "../../middlewares/validate.middleware";

import {
  createContactSchema,
} from "./contact.schema";

import {
  createContactController,
} from "./contact.controller";

export const contactRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Public contact form
 */

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Send a contact message
 *     description: Allows visitors to send a message to Auto Club Balcarce.
 *     tags: [Contact]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateContact'
 *
 *     responses:
 *       201:
 *         description: Contact message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *
 *       400:
 *         description: Invalid contact information
 */
contactRouter.post(
  "/",
  validate({
    body: createContactSchema,
  }),
  createContactController,
);