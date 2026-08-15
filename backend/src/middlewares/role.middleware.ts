import {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  ForbiddenError,
} from "../errors/forbidden-error";

import {
  UserRole,
} from "../modules/users/user.types";

export const requireRole = (
  ...allowedRoles: UserRole[]
) => {
  return (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      next(
        new ForbiddenError(
          "User role not available",
          "ROLE_NOT_AVAILABLE",
        ),
      );

      return;
    }

    if (
      !allowedRoles.includes(
        req.user.role,
      )
    ) {
      next(
        new ForbiddenError(
          "You do not have permission to perform this action",
          "INSUFFICIENT_PERMISSIONS",
        ),
      );

      return;
    }

    next();
  };
};