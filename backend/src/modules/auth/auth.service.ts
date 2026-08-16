import { UnauthorizedError } from "../../errors/unauthorized-error";

import {
  comparePassword,
} from "../../utils/password";

import {
  generateAccessToken,
} from "../../utils/jwt";

import {
  getUserByEmail,
} from "../users/user.service";

interface LoginInput {
  email: string;
  password: string;
}

export const login = async (
  data: LoginInput,
) => {
  const user =
    await getUserByEmail(data.email);

  if (!user || !user.isActive) {
    throw new UnauthorizedError(
      "Invalid credentials",
      "INVALID_CREDENTIALS",
    );
  }

  const passwordMatches =
    await comparePassword(
      data.password,
      user.passwordHash,
    );

  if (!passwordMatches) {
    throw new UnauthorizedError(
      "Invalid credentials",
      "INVALID_CREDENTIALS",
    );
  }

  const accessToken =
    generateAccessToken({
      userId: user._id.toString(),
      role: user.role,
    });

  return {
    accessToken,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  };
};