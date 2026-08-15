import {
  NextFunction,
  Request,
  Response,
} from "express";

import mongoose from "mongoose";

import { AppError } from "../errors/app-error";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error(error);

  // Application errors
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
    });

    return;
  }

  // Mongoose validation errors
  if (
    error instanceof mongoose.Error.ValidationError
  ) {
    res.status(400).json({
      success: false,
      error: {
        code: "DATABASE_VALIDATION_ERROR",
        message: "Database validation failed",
      },
    });

    return;
  }

  // Invalid MongoDB ObjectId
  if (
    error instanceof mongoose.Error.CastError &&
    error.kind === "ObjectId"
  ) {
    res.status(400).json({
      success: false,
      error: {
        code: "INVALID_OBJECT_ID",
        message: "The provided ID is invalid",
      },
    });

    return;
  }

  // MongoDB duplicate key
  if (
    error instanceof Error &&
    "code" in error &&
    error.code === 11000
  ) {
    res.status(409).json({
      success: false,
      error: {
        code: "DUPLICATE_RESOURCE",
        message:
          "A resource with the same unique value already exists",
      },
    });

    return;
  }

  // Unexpected errors
  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    },
  });
};