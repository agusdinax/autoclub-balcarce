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
  CategoryModel,
} from "../../src/modules/categories/category.model";

import {
  CircuitModel,
} from "../../src/modules/circuits/circuit.model";

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
  getAuthToken,
} from "../helpers/auth.helper";

import {
  createTestCircuit,
} from "../fixtures/circuit.fixture";

import {
  createTestCategory,
} from "../fixtures/category.fixture";

describe("Categories API", () => {
  beforeAll(async () => {
    await connectTestDatabase();
  });

  afterAll(async () => {
    await cleanupTestDatabase();
    await disconnectTestDatabase();
  });

  // --------------------------------------------------
  // GET /categories
  // --------------------------------------------------

  describe(
    "GET /api/v1/categories",
    () => {
      it(
        "should return categories",
        async () => {
          await createTestCategory();

          const response =
            await request(app)
              .get(
                "/api/v1/categories",
              );

          expect(
            response.status,
          ).toBe(200);

          expect(
            response.body.success,
          ).toBe(true);

          expect(
            Array.isArray(
              response.body.data,
            ),
          ).toBe(true);
        },
      );
    },
  );

  // --------------------------------------------------
  // GET /categories/:id
  // --------------------------------------------------

  describe(
    "GET /api/v1/categories/:id",
    () => {
      it(
        "should return a category by ID",
        async () => {
          const category =
            await createTestCategory();

          const response =
            await request(app)
              .get(
                `/api/v1/categories/${category._id}`,
              );

          expect(
            response.status,
          ).toBe(200);

          expect(
            response.body.success,
          ).toBe(true);

          expect(
            response.body.data._id,
          ).toBe(
            category._id.toString(),
          );
        },
      );

      it(
        "should return 404 when category does not exist",
        async () => {
          const category =
            await createTestCategory();

          await CategoryModel.findByIdAndDelete(
            category._id,
          );

          const response =
            await request(app)
              .get(
                `/api/v1/categories/${category._id}`,
              );

          expect(
            response.status,
          ).toBe(404);

          expect(
            response.body.success,
          ).toBe(false);
        },
      );

      it(
        "should reject an invalid ObjectId",
        async () => {
          const response =
            await request(app)
              .get(
                "/api/v1/categories/invalid-id",
              );

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

  // --------------------------------------------------
  // POST /categories
  // --------------------------------------------------

  describe(
    "POST /api/v1/categories",
    () => {
      it(
        "should reject creation without authentication",
        async () => {
          const circuit =
            await createTestCircuit();

          const response =
            await request(app)
              .post(
                "/api/v1/categories",
              )
              .send({
                name: "Test Category",
                slug: `test-category-${Date.now()}`,
                circuit:
                  circuit._id.toString(),
                description:
                  "Test category",
                isActive: true,
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
        "should reject an invalid access token",
        async () => {
          const circuit =
            await createTestCircuit();

          const response =
            await request(app)
              .post(
                "/api/v1/categories",
              )
              .set(
                "Authorization",
                "Bearer invalid-token",
              )
              .send({
                name: "Test Category",
                slug: `test-invalid-token-${Date.now()}`,
                circuit:
                  circuit._id.toString(),
                description:
                  "Test category",
                isActive: true,
              });

          expect(
            response.status,
          ).toBe(401);
        },
      );

      it(
        "should reject creation by a regular user",
        async () => {
          const circuit =
            await createTestCircuit();

          const token =
            await getAuthToken(
              UserRole.USER,
            );

          const response =
            await request(app)
              .post(
                "/api/v1/categories",
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                name: "User Category",
                slug: `test-user-category-${Date.now()}`,
                circuit:
                  circuit._id.toString(),
                description:
                  "Category created by user",
                isActive: true,
              });

          expect(
            response.status,
          ).toBe(403);
        },
      );

      it(
        "should allow an admin to create a category",
        async () => {
          const circuit =
            await createTestCircuit();

          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const response =
            await request(app)
              .post(
                "/api/v1/categories",
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                name:
                  "Admin Test Category",

                slug:
                  `test-admin-category-${Date.now()}-${Math.random()
                    .toString(36)
                    .slice(2)}`,

                circuit:
                  circuit._id.toString(),

                description:
                  "Category created during integration testing",

                isActive: true,
              });

          expect(
            response.status,
          ).toBe(201);

          expect(
            response.body.success,
          ).toBe(true);

          expect(
            response.body.data.name,
          ).toBe(
            "Admin Test Category",
          );
        },
      );

      it(
        "should return 404 when circuit does not exist",
        async () => {
          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const fakeCircuit =
            new CircuitModel()._id;

          const response =
            await request(app)
              .post(
                "/api/v1/categories",
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                name:
                  "Orphan Category",

                slug:
                  `test-orphan-category-${Date.now()}`,

                circuit:
                  fakeCircuit.toString(),

                description:
                  "Category without circuit",

                isActive: true,
              });

          expect(
            response.status,
          ).toBe(404);

          expect(
            response.body.success,
          ).toBe(false);
        },
      );

      it(
        "should reject an invalid body",
        async () => {
          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const response =
            await request(app)
              .post(
                "/api/v1/categories",
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                name: "",
                slug: "",
                circuit: "invalid",
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