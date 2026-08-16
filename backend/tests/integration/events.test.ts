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
  UserRole,
} from "../../src/modules/users/user.types";

import {
  EventType,
  EventStatus,
} from "../../src/modules/events/event.types";

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

import {
  createTestCategory,
} from "../fixtures/category.fixture";

import {
  createTestEvent,
} from "../fixtures/event.fixture";

describe("Events API", () => {
  beforeAll(async () => {
    await connectTestDatabase();
  });

  afterAll(async () => {
    await cleanupTestDatabase();
    await disconnectTestDatabase();
  });

  // ==================================================
  // GET /events
  // ==================================================

  describe("GET /api/v1/events", () => {
    it("should return events", async () => {
      await createTestEvent();

      const response =
        await request(app)
          .get("/api/v1/events");

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

    it("should filter events by type", async () => {
      await createTestEvent({
        type: EventType.RACE,
      });

      const response =
        await request(app)
          .get(
            `/api/v1/events?type=${EventType.RACE}`,
          );

      expect(response.status).toBe(200);

      expect(
        response.body.success,
      ).toBe(true);

      for (
        const event of response.body.data
      ) {
        expect(event.type).toBe(
          EventType.RACE,
        );
      }
    });

    it("should filter events by status", async () => {
      await createTestEvent({
        status:
          EventStatus.PUBLISHED,
      });

      const response =
        await request(app)
          .get(
            `/api/v1/events?status=${EventStatus.PUBLISHED}`,
          );

      expect(response.status).toBe(200);

      for (
        const event of response.body.data
      ) {
        expect(event.status).toBe(
          EventStatus.PUBLISHED,
        );
      }
    });

    it("should filter events by circuit", async () => {
      const circuit =
        await createTestCircuit();

      await createTestEvent({
        circuitId:
          circuit._id.toString(),
      });

      const response =
        await request(app)
          .get(
            `/api/v1/events?circuit=${circuit._id}`,
          );

      expect(response.status).toBe(200);

      for (
        const event of response.body.data
      ) {
        expect(
          event.circuit._id,
        ).toBe(
          circuit._id.toString(),
        );
      }
    });

    it("should filter events by date range", async () => {
      const date =
        new Date(
          "2027-01-15T12:00:00.000Z",
        );

      await createTestEvent({
        date,
      });

      const response =
        await request(app)
          .get(
            "/api/v1/events" +
              "?from=2027-01-01T00:00:00.000Z" +
              "&to=2027-01-31T23:59:59.999Z",
          );

      expect(response.status).toBe(200);

      expect(
        response.body.data.length,
      ).toBeGreaterThan(0);
    });
  });

  // ==================================================
  // GET /events/:id
  // ==================================================

  describe(
    "GET /api/v1/events/:id",
    () => {
      it("should return an event by ID", async () => {
        const event =
          await createTestEvent();

        const response =
          await request(app)
            .get(
              `/api/v1/events/${event._id}`,
            );

        expect(response.status).toBe(200);

        expect(
          response.body.success,
        ).toBe(true);

        expect(
          response.body.data._id,
        ).toBe(
          event._id.toString(),
        );
      });

      it("should return 404 when event does not exist", async () => {
        const event =
          await createTestEvent();

        const id =
          event._id.toString();

        await event.deleteOne();

        const response =
          await request(app)
            .get(
              `/api/v1/events/${id}`,
            );

        expect(response.status).toBe(404);

        expect(
          response.body.success,
        ).toBe(false);
      });

      it("should reject an invalid ObjectId", async () => {
        const response =
          await request(app)
            .get(
              "/api/v1/events/invalid-id",
            );

        expect(response.status).toBe(400);

        expect(
          response.body.success,
        ).toBe(false);
      });
    },
  );

  // ==================================================
  // POST /events
  // ==================================================

  describe(
    "POST /api/v1/events",
    () => {
      it("should reject creation without authentication", async () => {
        const circuit =
          await createTestCircuit();

        const layout =
          await createTestCircuitLayout({
            circuitId:
              circuit._id.toString(),
          });

        const category =
          await createTestCategory({
            circuitId:
              circuit._id.toString(),
          });

        const response =
          await request(app)
            .post(
              "/api/v1/events",
            )
            .send({
              title:
                "Unauthorized Event",

              type:
                EventType.RACE,

              status:
                EventStatus.PUBLISHED,

              date:
                new Date().toISOString(),

              circuit:
                circuit._id.toString(),

              layout:
                layout._id.toString(),

              categories: [
                category._id.toString(),
              ],
            });

        expect(response.status).toBe(401);
      });

      it("should reject creation by USER", async () => {
        const circuit =
          await createTestCircuit();

        const layout =
          await createTestCircuitLayout({
            circuitId:
              circuit._id.toString(),
          });

        const category =
          await createTestCategory({
            circuitId:
              circuit._id.toString(),
          });

        const token =
          await getAuthToken(
            UserRole.USER,
          );

        const response =
          await request(app)
            .post(
              "/api/v1/events",
            )
            .set(
              "Authorization",
              `Bearer ${token}`,
            )
            .send({
              title:
                "User Event",

              type:
                EventType.RACE,

              status:
                EventStatus.PUBLISHED,

              date:
                new Date().toISOString(),

              circuit:
                circuit._id.toString(),

              layout:
                layout._id.toString(),

              categories: [
                category._id.toString(),
              ],
            });

        expect(response.status).toBe(403);
      });

      it("should allow ADMIN to create an event", async () => {
        const circuit =
          await createTestCircuit();

        const layout =
          await createTestCircuitLayout({
            circuitId:
              circuit._id.toString(),
          });

        const category =
          await createTestCategory({
            circuitId:
              circuit._id.toString(),
          });

        const token =
          await getAuthToken(
            UserRole.ADMIN,
          );

        const response =
          await request(app)
            .post(
              "/api/v1/events",
            )
            .set(
              "Authorization",
              `Bearer ${token}`,
            )
            .send({
              title:
                "Admin Test Event",

              type:
                EventType.RACE,

              status:
                EventStatus.PUBLISHED,

              date:
                new Date(
                  Date.now() +
                    86400000,
                ).toISOString(),

              circuit:
                circuit._id.toString(),

              layout:
                layout._id.toString(),

              categories: [
                category._id.toString(),
              ],
            });

        expect(response.status).toBe(201);

        expect(
          response.body.success,
        ).toBe(true);

        expect(
          response.body.data.title,
        ).toBe(
          "Admin Test Event",
        );
      });
    },
  );
});