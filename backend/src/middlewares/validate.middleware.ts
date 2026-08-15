import {
  NextFunction,
  Request,
  Response,
} from "express";

import { ZodSchema } from "zod";

type ValidationSchemas = {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
};

export const validate = (
  schemas: ValidationSchemas,
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    const errors: Record<string, unknown> = {};

    if (schemas.body) {
      const result =
        schemas.body.safeParse(req.body);

      if (!result.success) {
        errors.body =
          result.error.flatten()
            .fieldErrors;
      } else {
        req.body = result.data;
      }
    }

    if (schemas.params) {
      const result =
        schemas.params.safeParse(
          req.params,
        );

      if (!result.success) {
        errors.params =
          result.error.flatten()
            .fieldErrors;
      }
    }

    if (schemas.query) {
      const result =
        schemas.query.safeParse(
          req.query,
        );

      if (!result.success) {
        errors.query =
          result.error.flatten()
            .fieldErrors;
      }
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message:
            "Invalid request data",
          details: errors,
        },
      });

      return;
    }

    next();
  };
};