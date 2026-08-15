import {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  UnauthorizedError,
} from "../errors/unauthorized-error";

import {
  verifyAccessToken,
} from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    const authorization =
      req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedError(
        "Authentication required",
        "AUTHENTICATION_REQUIRED",
      );
    }

    const [
      scheme,
      token,
    ] = authorization.split(" ");

    if (
      scheme !== "Bearer" ||
      !token
    ) {
      throw new UnauthorizedError(
        "Invalid authorization header",
        "INVALID_AUTHORIZATION_HEADER",
      );
    }

    let payload;

    try {
      payload =
        verifyAccessToken(token);
    } catch {
      throw new UnauthorizedError(
        "Invalid or expired token",
        "INVALID_TOKEN",
      );
    }

    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};