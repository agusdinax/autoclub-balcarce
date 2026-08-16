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
  UserRole,
} from "../../src/modules/users/user.types";

import {
  CircuitType,
} from "../../src/modules/circuits/circuit.types";

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
  createTestKartRental,
} from "../fixtures/kart-rental.fixture";

describe("Kart Rental API", () => {
  beforeAll(async () => {
    await connectTestDatabase();
  });

  afterAll(async () => {
    await cleanupTestDatabase();
    await disconnectTestDatabase();
  });

  // ==================================================
  // GET /kart-rentals
  // ==================================================

  describe(
    "GET /api/v1/kart-rentals",
    () => {
      it(
        "should return kart rental configurations",
        async () => {
          await createTestKartRental();

          const response =
            await request(app)
              .get(
                "/api/v1/kart-rentals",
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

  // ==================================================
  // GET /kart-rentals/:id
  // ==================================================

  describe(
    "GET /api/v1/kart-rentals/:id",
    () => {
      it(
        "should return a kart rental by ID",
        async () => {
          const rental =
            await createTestKartRental();

          const response =
            await request(app)
              .get(
                `/api/v1/kart-rentals/${rental._id}`,
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
            rental._id.toString(),
          );
        },
      );

      it(
        "should return 404 when kart rental does not exist",
        async () => {
          const rental =
            await createTestKartRental();

          const id =
            rental._id.toString();

          await rental.deleteOne();

          const response =
            await request(app)
              .get(
                `/api/v1/kart-rentals/${id}`,
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
                "/api/v1/kart-rentals/invalid-id",
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

  // ==================================================
  // POST
  // ==================================================

  describe(
    "POST /api/v1/kart-rentals",
    () => {
      it(
        "should reject creation without authentication",
        async () => {
          const circuit =
            await createTestCircuit({
              type:
                CircuitType.KARTODROMO,
            });

          const response =
            await request(app)
              .post(
                "/api/v1/kart-rentals",
              )
              .send({
                circuit:
                  circuit._id.toString(),

                name:
                  "Unauthorized Rental",

                description:
                  "Test rental",

                price: 10000,

                durationMinutes: 10,

                isActive: true,
              });

          expect(
            response.status,
          ).toBe(401);
        },
      );

      it(
        "should reject creation by USER",
        async () => {
          const circuit =
            await createTestCircuit({
              type:
                CircuitType.KARTODROMO,
            });

          const token =
            await getAuthToken(
              UserRole.USER,
            );

          const response =
            await request(app)
              .post(
                "/api/v1/kart-rentals",
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                circuit:
                  circuit._id.toString(),

                name:
                  "User Rental",

                description:
                  "Test rental",

                price: 10000,

                durationMinutes: 10,

                isActive: true,
              });

          expect(
            response.status,
          ).toBe(403);
        },
      );

      it(
        "should allow ADMIN to create kart rental",
        async () => {
          const circuit =
            await createTestCircuit({
              type:
                CircuitType.KARTODROMO,
            });

          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const response =
            await request(app)
              .post(
                "/api/v1/kart-rentals",
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                circuit:
                  circuit._id.toString(),

                name:
                  "Admin Test Rental",

                description:
                  "Rental created during integration testing",

                price: 15000,

                durationMinutes: 10,

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
            "Admin Test Rental",
          );
        },
      );

      it(
        "should reject rental for an AUTODROMO",
        async () => {
          const circuit =
            await createTestCircuit({
              type:
                CircuitType.AUTODROMO,
            });

          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const response =
            await request(app)
              .post(
                "/api/v1/kart-rentals",
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                circuit:
                  circuit._id.toString(),

                name:
                  "Invalid Rental",

                description:
                  "Rental on autodrome",

                price: 10000,

                durationMinutes: 10,

                isActive: true,
              });

          expect(
            response.status,
          ).toBe(409);

          expect(
            response.body.success,
          ).toBe(false);
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
            new (
              await import(
                "../../src/modules/circuits/circuit.model"
              )
            ).CircuitModel()._id;

          const response =
            await request(app)
              .post(
                "/api/v1/kart-rentals",
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                circuit:
                  fakeCircuit.toString(),

                name:
                  "Orphan Rental",

                description:
                  "Rental without circuit",

                price: 10000,

                durationMinutes: 10,

                isActive: true,
              });

          expect(
            response.status,
          ).toBe(404);
        },
      );
    },
  );

  // ==================================================
  // PATCH
  // ==================================================

  describe(
    "PATCH /api/v1/kart-rentals/:id",
    () => {
      it(
        "should allow ADMIN to update kart rental",
        async () => {
          const rental =
            await createTestKartRental();

          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const response =
            await request(app)
              .patch(
                `/api/v1/kart-rentals/${rental._id}`,
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                price: 20000,
              });

          expect(
            response.status,
          ).toBe(200);

          expect(
            response.body.success,
          ).toBe(true);

          expect(
            response.body.data.price,
          ).toBe(20000);
        },
      );

      it(
        "should reject USER from updating kart rental",
        async () => {
          const rental =
            await createTestKartRental();

          const token =
            await getAuthToken(
              UserRole.USER,
            );

          const response =
            await request(app)
              .patch(
                `/api/v1/kart-rentals/${rental._id}`,
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                price: 20000,
              });

          expect(
            response.status,
          ).toBe(403);
        },
      );

      it(
        "should return 404 when kart rental does not exist",
        async () => {
          const rental =
            await createTestKartRental();

          const id =
            rental._id.toString();

          await rental.deleteOne();

          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const response =
            await request(app)
              .patch(
                `/api/v1/kart-rentals/${id}`,
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                price: 20000,
              });

          expect(
            response.status,
          ).toBe(404);
        },
      );
    },
  );

  // ==================================================
  // DELETE
  // ==================================================

  describe(
    "DELETE /api/v1/kart-rentals/:id",
    () => {
      it(
        "should allow ADMIN to delete kart rental",
        async () => {
          const rental =
            await createTestKartRental();

          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const response =
            await request(app)
              .delete(
                `/api/v1/kart-rentals/${rental._id}`,
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              );

          expect(
            response.status,
          ).toBe(204);
        },
      );

      it(
        "should reject USER from deleting kart rental",
        async () => {
          const rental =
            await createTestKartRental();

          const token =
            await getAuthToken(
              UserRole.USER,
            );

          const response =
            await request(app)
              .delete(
                `/api/v1/kart-rentals/${rental._id}`,
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              );

          expect(
            response.status,
          ).toBe(403);
        },
      );

      it(
        "should return 404 when kart rental does not exist",
        async () => {
          const rental =
            await createTestKartRental();

          const id =
            rental._id.toString();

          await rental.deleteOne();

          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const response =
            await request(app)
              .delete(
                `/api/v1/kart-rentals/${id}`,
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              );

          expect(
            response.status,
          ).toBe(404);
        },
      );
    },
  );
});