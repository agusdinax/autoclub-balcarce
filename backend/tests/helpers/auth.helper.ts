import request from "supertest";

import { app } from "../../src/app";

import {
  UserRole,
} from "../../src/modules/users/user.types";

import {
  createTestUser,
} from "../fixtures/user.fixture";

export const getAuthToken =
  async (
    role: UserRole = UserRole.ADMIN,
  ): Promise<string> => {
    const {
      user,
      password,
    } = await createTestUser({
      role,
    });

    const response =
      await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: user.email,
          password,
        });

    if (response.status !== 200) {
      throw new Error(
        `Unable to authenticate test user. Status: ${response.status}`,
      );
    }

    return response.body.data
      .accessToken;
  };