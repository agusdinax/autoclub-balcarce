import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
} from "vitest";

import request from "supertest";

import { app } from "../../src/app";

import {
  UserModel,
} from "../../src/modules/users/user.model";

import {
  UserRole,
} from "../../src/modules/users/user.types";

import {
  connectTestDatabase,
  disconnectTestDatabase,
} from "../config/database";

import {
  cleanupTestDatabase,
} from "../helpers/database.helper";

import {
  createTestUser,
} from "../fixtures/user.fixture";

describe("Auth API", () => {
  beforeAll(async () => {
    await connectTestDatabase();
  });

  afterAll(async () => {
    await cleanupTestDatabase();
    await disconnectTestDatabase();
  });

  // --------------------------------------------------
  // POST /auth/login
  // --------------------------------------------------

  describe(
    "POST /api/v1/auth/login",
    () => {
      it(
        "should login with valid credentials",
        async () => {
          const testUser =
            await createTestUser({
              role: UserRole.ADMIN,
            });

          const response =
            await request(app)
              .post(
                "/api/v1/auth/login",
              )
              .send({
                email:
                  testUser.user.email,
                password:
                  testUser.password,
              });

          expect(
            response.status,
          ).toBe(200);

          expect(
            response.body.success,
          ).toBe(true);

          expect(
            response.body.data,
          ).toHaveProperty(
            "accessToken",
          );

          expect(
            response.body.data,
          ).toHaveProperty(
            "user",
          );

          expect(
            response.body.data.user.email,
          ).toBe(
            testUser.user.email,
          );

          expect(
            response.body.data.user.role,
          ).toBe(UserRole.ADMIN);
        },
      );

      it(
        "should reject invalid credentials",
        async () => {
          const testUser =
            await createTestUser({
              role: UserRole.ADMIN,
            });

          const response =
            await request(app)
              .post(
                "/api/v1/auth/login",
              )
              .send({
                email:
                  testUser.user.email,
                password:
                  "WrongPassword123!",
              });

          expect(
            response.status,
          ).toBe(401);

          expect(
            response.body.success,
          ).toBe(false);
        },
      );

      it(
        "should reject a non-existing user",
        async () => {
          const response =
            await request(app)
              .post(
                "/api/v1/auth/login",
              )
              .send({
                email:
                  `does-not-exist-${Date.now()}@autoclub.test`,
                password:
                  "TestPassword123!",
              });

          expect(
            response.status,
          ).toBe(401);

          expect(
            response.body.success,
          ).toBe(false);
        },
      );

      it(
        "should reject an inactive user",
        async () => {
          const testUser =
            await createTestUser({
              role: UserRole.ADMIN,
            });

          await UserModel.findByIdAndUpdate(
            testUser.user._id,
            {
              isActive: false,
            },
          );

          const response =
            await request(app)
              .post(
                "/api/v1/auth/login",
              )
              .send({
                email:
                  testUser.user.email,
                password:
                  testUser.password,
              });

          expect(
            response.status,
          ).toBe(401);

          expect(
            response.body.success,
          ).toBe(false);
        },
      );

      it(
        "should reject an invalid login body",
        async () => {
          const response =
            await request(app)
              .post(
                "/api/v1/auth/login",
              )
              .send({
                email:
                  "invalid-email",
                password: "",
              });

          expect(
            response.status,
          ).toBe(400);

          expect(
            response.body.success,
          ).toBe(false);
        },
      );
    },
  );
});