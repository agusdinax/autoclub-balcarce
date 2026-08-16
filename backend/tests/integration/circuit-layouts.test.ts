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
  CircuitModel,
} from "../../src/modules/circuits/circuit.model";

import {
  CircuitLayoutModel,
} from "../../src/modules/circuit-layouts/circuit-layout.model";

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
  createTestCircuitLayout,
} from "../fixtures/circuit-layout.fixture";

describe("Circuit Layouts API", () => {
  beforeAll(async () => {
    await connectTestDatabase();
  });

  afterAll(async () => {
    await cleanupTestDatabase();
    await disconnectTestDatabase();
  });

  // --------------------------------------------------
  // GET /circuit-layouts
  // --------------------------------------------------

  describe(
    "GET /api/v1/circuit-layouts",
    () => {
      it(
        "should return circuit layouts",
        async () => {
          await createTestCircuitLayout();

          const response =
            await request(app)
              .get(
                "/api/v1/circuit-layouts",
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
  // GET /circuit-layouts/:id
  // --------------------------------------------------

  describe(
    "GET /api/v1/circuit-layouts/:id",
    () => {
      it(
        "should return a circuit layout by ID",
        async () => {
          const layout =
            await createTestCircuitLayout();

          const response =
            await request(app)
              .get(
                `/api/v1/circuit-layouts/${layout._id}`,
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
            layout._id.toString(),
          );
        },
      );

      it(
        "should return 404 when layout does not exist",
        async () => {
          const layout =
            await createTestCircuitLayout();

          await CircuitLayoutModel.findByIdAndDelete(
            layout._id,
          );

          const response =
            await request(app)
              .get(
                `/api/v1/circuit-layouts/${layout._id}`,
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
                "/api/v1/circuit-layouts/invalid-id",
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
  // POST /circuit-layouts
  // --------------------------------------------------

  describe(
    "POST /api/v1/circuit-layouts",
    () => {
      it(
        "should reject creation without authentication",
        async () => {
          const circuit =
            await createTestCircuit();

          const response =
            await request(app)
              .post(
                "/api/v1/circuit-layouts",
              )
              .send({
                name: "Test Layout",
                slug: `test-layout-${Date.now()}`,
                circuit:
                  circuit._id.toString(),
                description:
                  "Test layout",
                length: 4.592,
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
                "/api/v1/circuit-layouts",
              )
              .set(
                "Authorization",
                "Bearer invalid-token",
              )
              .send({
                name: "Test Layout",
                slug: `test-layout-${Date.now()}`,
                circuit:
                  circuit._id.toString(),
                description:
                  "Test layout",
                length: 4.592,
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
                "/api/v1/circuit-layouts",
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                name: "User Layout",
                slug: `test-user-layout-${Date.now()}`,
                circuit:
                  circuit._id.toString(),
                description:
                  "Layout created by user",
                length: 4.592,
                isActive: true,
              });

          expect(
            response.status,
          ).toBe(403);
        },
      );

      it(
        "should allow an admin to create a layout",
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
                "/api/v1/circuit-layouts",
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                name:
                  "Admin Test Layout",

                slug:
                  `test-admin-layout-${Date.now()}-${Math.random()
                    .toString(36)
                    .slice(2)}`,

                circuit:
                  circuit._id.toString(),

                description:
                  "Layout created during integration testing",

                length: 4.592,

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
            "Admin Test Layout",
          );
        },
      );

      it(
        "should reject an invalid circuit",
        async () => {
          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const response =
            await request(app)
              .post(
                "/api/v1/circuit-layouts",
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                name: "Invalid Layout",
                slug: `test-invalid-layout-${Date.now()}`,
                circuit:
                  "invalid-object-id",
                description:
                  "Invalid layout",
                length: 4.592,
                isActive: true,
              });

          expect(
            response.status,
          ).toBe(400);
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
                "/api/v1/circuit-layouts",
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                name: "Orphan Layout",
                slug: `test-orphan-layout-${Date.now()}`,
                circuit:
                  fakeCircuit.toString(),
                description:
                  "Layout without circuit",
                length: 4.592,
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
                "/api/v1/circuit-layouts",
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