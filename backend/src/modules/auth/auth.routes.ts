import { Router } from "express";

import {
  validate,
} from "../../middlewares/validate.middleware";

import {
  loginSchema,
} from "./auth.schema";

import {
  loginController,
} from "./auth.controller";

export const authRouter =
  Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and access management
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     description: Authenticates an administrator and returns a JWT access token.
 *     tags: [Auth]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *
 *       400:
 *         description: Invalid request body
 *
 *       401:
 *         description: Invalid email or password, or inactive user
 */
authRouter.post(
  "/login",
  validate({
    body: loginSchema,
  }),
  loginController,
);