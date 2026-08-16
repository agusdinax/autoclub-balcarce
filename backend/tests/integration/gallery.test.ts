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
  createTestGallery,
} from "../fixtures/gallery.fixture";

describe("Gallery API", () => {
  beforeAll(async () => {
    await connectTestDatabase();
  });

  afterAll(async () => {
    await cleanupTestDatabase();
    await disconnectTestDatabase();
  });

  // ==================================================
  // GET /gallery
  // ==================================================

  describe("GET /api/v1/gallery", () => {
    it("should return galleries", async () => {
      await createTestGallery();

      const response =
        await request(app)
          .get("/api/v1/gallery");

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

    it("should filter galleries by circuit", async () => {
      const gallery =
        await createTestGallery();

      const circuitId =
        gallery.circuit?.toString();

      const response =
        await request(app)
          .get(
            `/api/v1/gallery?circuit=${circuitId}`,
          );

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

    it("should filter galleries by active status", async () => {
      await createTestGallery({
        isActive: true,
      });

      const response =
        await request(app)
          .get(
            "/api/v1/gallery?isActive=true",
          );

      expect(response.status).toBe(200);

      expect(
        response.body.success,
      ).toBe(true);

      for (
        const gallery of response.body.data
      ) {
        expect(
          gallery.isActive,
        ).toBe(true);
      }
    });
  });

  // ==================================================
  // GET /gallery/:id
  // ==================================================

  describe(
    "GET /api/v1/gallery/:id",
    () => {
      it(
        "should return a gallery by ID",
        async () => {
          const gallery =
            await createTestGallery();

          const response =
            await request(app)
              .get(
                `/api/v1/gallery/${gallery._id}`,
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
            gallery._id.toString(),
          );
        },
      );

      it(
        "should return 404 when gallery does not exist",
        async () => {
          const gallery =
            await createTestGallery();

          const id =
            gallery._id.toString();

          await gallery.deleteOne();

          const response =
            await request(app)
              .get(
                `/api/v1/gallery/${id}`,
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
                "/api/v1/gallery/invalid-id",
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
  // POST /gallery
  // ==================================================

  describe(
    "POST /api/v1/gallery",
    () => {
      it(
        "should reject creation without authentication",
        async () => {
          const response =
            await request(app)
              .post(
                "/api/v1/gallery",
              )
              .send({
                title:
                  "Unauthorized Gallery",

                description:
                  "Test gallery",

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
        "should reject creation by USER",
        async () => {
          const token =
            await getAuthToken(
              UserRole.USER,
            );

          const response =
            await request(app)
              .post(
                "/api/v1/gallery",
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                title:
                  "User Gallery",

                description:
                  "Gallery created by user",

                isActive: true,
              });

          expect(
            response.status,
          ).toBe(403);
        },
      );

      it(
        "should allow ADMIN to create a gallery",
        async () => {
          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const response =
            await request(app)
              .post(
                "/api/v1/gallery",
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                title:
                  "Admin Test Gallery",

                description:
                  "Gallery created during integration testing",

                isActive: true,
              });

          expect(
            response.status,
          ).toBe(201);

          expect(
            response.body.success,
          ).toBe(true);

          expect(
            response.body.data.title,
          ).toBe(
            "Admin Test Gallery",
          );
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
                "/api/v1/gallery",
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                title: "",
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

  // ==================================================
  // PATCH /gallery/:id
  // ==================================================

  describe(
    "PATCH /api/v1/gallery/:id",
    () => {
      it(
        "should allow ADMIN to update a gallery",
        async () => {
          const gallery =
            await createTestGallery();

          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const response =
            await request(app)
              .patch(
                `/api/v1/gallery/${gallery._id}`,
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                title:
                  "Updated Gallery",
              });

          expect(
            response.status,
          ).toBe(200);

          expect(
            response.body.success,
          ).toBe(true);

          expect(
            response.body.data.title,
          ).toBe(
            "Updated Gallery",
          );
        },
      );

      it(
        "should reject USER from updating a gallery",
        async () => {
          const gallery =
            await createTestGallery();

          const token =
            await getAuthToken(
              UserRole.USER,
            );

          const response =
            await request(app)
              .patch(
                `/api/v1/gallery/${gallery._id}`,
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                title:
                  "Unauthorized Update",
              });

          expect(
            response.status,
          ).toBe(403);
        },
      );

      it(
        "should return 404 when gallery does not exist",
        async () => {
          const gallery =
            await createTestGallery();

          const id =
            gallery._id.toString();

          await gallery.deleteOne();

          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const response =
            await request(app)
              .patch(
                `/api/v1/gallery/${id}`,
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              )
              .send({
                title:
                  "Updated Gallery",
              });

          expect(
            response.status,
          ).toBe(404);
        },
      );
    },
  );

  // ==================================================
  // DELETE /gallery/:id
  // ==================================================

  describe(
    "DELETE /api/v1/gallery/:id",
    () => {
      it(
        "should allow ADMIN to delete a gallery",
        async () => {
          const gallery =
            await createTestGallery();

          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const response =
            await request(app)
              .delete(
                `/api/v1/gallery/${gallery._id}`,
              )
              .set(
                "Authorization",
                `Bearer ${token}`,
              );

          expect(
            response.status,
          ).toBe(204);

          const deleted =
            await (gallery.constructor as any).findById(
              gallery._id,
            );

          expect(
            deleted,
          ).toBeNull();
        },
      );

      it(
        "should reject USER from deleting a gallery",
        async () => {
          const gallery =
            await createTestGallery();

          const token =
            await getAuthToken(
              UserRole.USER,
            );

          const response =
            await request(app)
              .delete(
                `/api/v1/gallery/${gallery._id}`,
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
        "should return 404 when gallery does not exist",
        async () => {
          const gallery =
            await createTestGallery();

          const id =
            gallery._id.toString();

          await gallery.deleteOne();

          const token =
            await getAuthToken(
              UserRole.ADMIN,
            );

          const response =
            await request(app)
              .delete(
                `/api/v1/gallery/${id}`,
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