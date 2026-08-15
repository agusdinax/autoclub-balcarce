import bcrypt from "bcrypt";

import {
  UnauthorizedError,
} from "../../errors/unauthorized-error";

import {
  UserModel,
} from "../users/user.model";

import {
  LoginInput,
} from "./auth.schema";

import {
  generateAccessToken,
} from "../../utils/jwt";

export const login = async (
  data: LoginInput,
) => {
  const user =
    await UserModel.findOne({
      email: data.email
        .toLowerCase(),
    });

  if (!user) {
    throw new UnauthorizedError(
      "Invalid email or password",
      "INVALID_CREDENTIALS",
    );
  }

  if (!user.isActive) {
    throw new UnauthorizedError(
      "User account is inactive",
      "USER_INACTIVE",
    );
  }

  const passwordMatches =
    await bcrypt.compare(
      data.password,
      user.passwordHash,
    );

  if (!passwordMatches) {
    throw new UnauthorizedError(
      "Invalid email or password",
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