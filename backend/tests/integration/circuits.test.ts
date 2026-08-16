import {
  beforeAll,
  afterAll,
  describe,
  expect,
  it,
} from "vitest";

import request from "supertest";

import { app } from "../../src/app";

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

describe("Circuits API", () => {
  beforeAll(async () => {
    await connectTestDatabase();
  });

  afterAll(async () => {
    await cleanupTestDatabase();
    await disconnectTestDatabase();
  });

  // --------------------------------------------------
  // GET /circuits
  // --------------------------------------------------

  describe("GET /api/v1/circuits", () => {
    it("should return circuits", async () => {
      await createTestCircuit();

      const response =
        await request(app)
          .get("/api/v1/circuits");

      expect(response.status).toBe(200);

      expect(
        response.body.success,
      ).toBe(true);

      expect(
        Array.isArray(
          response.body.data,
        ),
      ).toBe(true);
    });
  });

  // --------------------------------------------------
  // GET /circuits/:id
  // --------------------------------------------------

  describe(
    "GET /api/v1/circuits/:id",
    () => {
      it(
        "should return a circuit by ID",
        async () => {
          const circuit =
            await createTestCircuit();

          const response =
            await request(app)
              .get(
                `/api/v1/circuits/${circuit._id}`,
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
            circuit._id.toString(),
          );
        },
      );

      it(
        "should return 404 when circuit does not exist",
        async () => {
          const circuit =
            await createTestCircuit();

          await CircuitModel.findByIdAndDelete(
            circuit._id,
          );

          const response =
            await request(app)
              .get(
                `/api/v1/circuits/${circuit._id}`,
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
                "/api/v1/circuits/invalid-id",
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
  // POST /circuits
  // --------------------------------------------------

  describe(
    "POST /api/v1/circuits",
    () => {
      it(
        "should reject creating a circuit without authentication",
        async () => {
          const response =
            await request(app)
              .post("/api/v1/circuits")
              .send({
                name: "Test Circuit",
                slug: `test-circuit-${Date.now()}`,
                type: "KARTODROMO",
                description:
                  "Test circuit",
                location:
                  "Balcarce, Buenos Aires, Argentina",
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
          const response =
            await request(app)
              .post("/api/v1/circuits")
              .set(
                "Authorization",
                "Bearer invalid-token",
              )
              .send({
                name: "Test Circuit",
                slug: `test-invalid-token-${Date.now()}`,
                type: "KARTODROMO",
                description:
                  "Test circuit",
                location:
                  "Balcarce, Buenos Aires, Argentina",
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
        "should reject a regular user from creating a circuit",
        async () => {
          const token =
            await getAuthToken(
              UserRole.USER,
            );

          const response =
            await request(app)
              .post("/api/v1/circuits")
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                name: "User Test Circuit",
                slug: `test-user-circuit-${Date.now()}`,
                type: "KARTODROMO",
                description:
                  "Circuit created by user",
                location:
                  "Balcarce, Buenos Aires, Argentina",
                isActive: true,
              });

          expect(
            response.status,
          ).toBe(403);

          expect(
            response.body.success,
          ).toBe(false);
        },
      );

      it(
        "should allow an admin to create a circuit",
        async () => {
          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const response =
            await request(app)
              .post("/api/v1/circuits")
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                name:
                  "Admin Test Circuit",
                slug:
                  `test-admin-circuit-${Date.now()}-${Math.random()
                    .toString(36)
                    .slice(2)}`,
                type: "KARTODROMO",
                description:
                  "Circuit created during integration testing",
                location:
                  "Balcarce, Buenos Aires, Argentina",
                isActive: false,
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
            "Admin Test Circuit",
          );
        },
      );

      it(
        "should reject an invalid circuit body",
        async () => {
          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const response =
            await request(app)
              .post("/api/v1/circuits")
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                name: "",
                slug: "",
                type: "INVALID",
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