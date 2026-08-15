import jwt, {
  SignOptions,
} from "jsonwebtoken";

import { z } from "zod";

import { env } from "../config/env";

import {
  UserRole,
} from "../modules/users/user.types";

export const jwtPayloadSchema =
  z.object({
    userId: z.string().min(1),

    role: z.enum(
      Object.values(UserRole) as [
        UserRole,
        ...UserRole[],
      ],
    ),
  });

export type JwtPayload =
  z.infer<typeof jwtPayloadSchema>;

export const generateAccessToken = (
  payload: JwtPayload,
): string => {
  return jwt.sign(
    payload,
    env.JWT_SECRET,
    {
      expiresIn:
        env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
    },
  );
};

export const verifyAccessToken = (
  token: string,
): JwtPayload => {
  const decoded = jwt.verify(
    token,
    env.JWT_SECRET,
  );

  const result =
    jwtPayloadSchema.safeParse(
      decoded,
    );

  if (!result.success) {
    throw new Error(
      "Invalid JWT payload",
    );
  }

  return result.data;
};