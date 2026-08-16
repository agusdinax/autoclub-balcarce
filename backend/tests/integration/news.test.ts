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
  NewsStatus,
} from "../../src/modules/news/news.types";

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
  createTestNews,
} from "../fixtures/news.fixture";

describe("News API", () => {
  beforeAll(async () => {
    await connectTestDatabase();
  });

  afterAll(async () => {
    await cleanupTestDatabase();
    await disconnectTestDatabase();
  });

  // ==================================================
  // GET /news
  // ==================================================

  describe("GET /api/v1/news", () => {
    it("should return news", async () => {
      await createTestNews();

      const response =
        await request(app)
          .get("/api/v1/news");

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

    it("should filter news by status", async () => {
      await createTestNews({
        status: NewsStatus.PUBLISHED,
      });

      const response =
        await request(app)
          .get(
            `/api/v1/news?status=${NewsStatus.PUBLISHED}`,
          );

      expect(response.status).toBe(200);

      expect(
        response.body.success,
      ).toBe(true);

      for (
        const news of response.body.data
      ) {
        expect(news.status).toBe(
          NewsStatus.PUBLISHED,
        );
      }
    });

    it("should filter news by circuit", async () => {
      const news =
        await createTestNews();

      const response =
        await request(app)
          .get(
            `/api/v1/news?circuit=${news.circuit}`,
          );

      expect(response.status).toBe(200);

      expect(
        response.body.success,
      ).toBe(true);
    });
  });

  // ==================================================
  // GET /news/:id
  // ==================================================

  describe("GET /api/v1/news/:id", () => {
    it("should return a news article", async () => {
      const news =
        await createTestNews();

      const response =
        await request(app)
          .get(
            `/api/v1/news/${news._id}`,
          );

      expect(response.status).toBe(200);

      expect(
        response.body.success,
      ).toBe(true);

      expect(
        response.body.data._id,
      ).toBe(
        news._id.toString(),
      );
    });

    it("should return 404 when news does not exist", async () => {
      const news =
        await createTestNews();

      const id =
        news._id.toString();

      await news.deleteOne();

      const response =
        await request(app)
          .get(
            `/api/v1/news/${id}`,
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
            "/api/v1/news/invalid-id",
          );

      expect(response.status).toBe(400);

      expect(
        response.body.success,
      ).toBe(false);
    });
  });

  // ==================================================
  // POST /news
  // ==================================================

  describe("POST /api/v1/news", () => {
    it("should reject creation without authentication", async () => {
      const response =
        await request(app)
          .post("/api/v1/news")
          .send({
            title: "Unauthorized News",
            slug: `unauthorized-${Date.now()}`,
            content: "Test content",
            status: NewsStatus.PUBLISHED,
          });

      expect(response.status).toBe(401);

      expect(
        response.body.success,
      ).toBe(false);
    });

    it("should reject creation by USER", async () => {
      const token =
        await getAuthToken(
          UserRole.USER,
        );

      const response =
        await request(app)
          .post("/api/v1/news")
          .set(
            "Authorization",
            `Bearer ${token}`,
          )
          .send({
            title: "User News",
            slug: `user-news-${Date.now()}`,
            content: "Test content",
            status: NewsStatus.PUBLISHED,
          });

      expect(response.status).toBe(403);
    });

    it("should allow ADMIN to create news", async () => {
      const token =
        await getAuthToken(
          UserRole.ADMIN,
        );

      const response =
        await request(app)
          .post("/api/v1/news")
          .set(
            "Authorization",
            `Bearer ${token}`,
          )
          .send({
            title:
              "Admin Test News",

            slug:
              `admin-news-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2)}`,

            content:
              "News created during integration testing",

            status:
              NewsStatus.PUBLISHED,
          });

      expect(response.status).toBe(201);

      expect(
        response.body.success,
      ).toBe(true);

      expect(
        response.body.data.title,
      ).toBe(
        "Admin Test News",
      );
    });

    it("should reject an invalid body", async () => {
      const token =
        await getAuthToken(
          UserRole.ADMIN,
        );

      const response =
        await request(app)
          .post("/api/v1/news")
          .set(
            "Authorization",
            `Bearer ${token}`,
          )
          .send({
            title: "",
            slug: "",
            content: "",
          });

      expect(response.status).toBe(400);

      expect(
        response.body.success,
      ).toBe(false);
    });
  });

  // ==================================================
  // PATCH /news/:id
  // ==================================================

  describe(
    "PATCH /api/v1/news/:id",
    () => {
      it("should allow ADMIN to update news", async () => {
        const news =
          await createTestNews();

        const token =
          await getAuthToken(
            UserRole.ADMIN,
          );

        const response =
          await request(app)
            .patch(
              `/api/v1/news/${news._id}`,
            )
            .set(
              "Authorization",
              `Bearer ${token}`,
            )
            .send({
              title:
                "Updated Test News",
            });

        expect(response.status).toBe(200);

        expect(
          response.body.success,
        ).toBe(true);

        expect(
          response.body.data.title,
        ).toBe(
          "Updated Test News",
        );
      });

      it("should reject USER from updating news", async () => {
        const news =
          await createTestNews();

        const token =
          await getAuthToken(
            UserRole.USER,
          );

        const response =
          await request(app)
            .patch(
              `/api/v1/news/${news._id}`,
            )
            .set(
              "Authorization",
              `Bearer ${token}`,
            )
            .send({
              title:
                "Unauthorized Update",
            });

        expect(response.status).toBe(403);
      });
    },
  );

  // ==================================================
  // DELETE /news/:id
  // ==================================================

  describe(
    "DELETE /api/v1/news/:id",
    () => {
      it("should allow ADMIN to delete news", async () => {
        const news =
          await createTestNews();

        const token =
          await getAuthToken(
            UserRole.ADMIN,
          );

        const response =
          await request(app)
            .delete(
              `/api/v1/news/${news._id}`,
            )
            .set(
              "Authorization",
              `Bearer ${token}`,
            );

        expect(response.status).toBe(204);

        const deleted =
          await (news.constructor as any).findById(
            news._id,
          );

        expect(deleted).toBeNull();
      });

      it("should reject USER from deleting news", async () => {
        const news =
          await createTestNews();

        const token =
          await getAuthToken(
            UserRole.USER,
          );

        const response =
          await request(app)
            .delete(
              `/api/v1/news/${news._id}`,
            )
            .set(
              "Authorization",
              `Bearer ${token}`,
            );

        expect(response.status).toBe(403);
      });

      it("should return 404 when deleting non-existing news", async () => {
        const news =
          await createTestNews();

        await news.deleteOne();

        const token =
          await getAuthToken(
            UserRole.ADMIN,
          );

        const response =
          await request(app)
            .delete(
              `/api/v1/news/${news._id}`,
            )
            .set(
              "Authorization",
              `Bearer ${token}`,
            );

        expect(response.status).toBe(404);
      });
    },
  );
});