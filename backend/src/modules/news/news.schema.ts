import { z } from "zod";

import { objectIdSchema } from "../../utils/object-id.schema";

import {
  NewsStatus,
} from "./news.types";

export const createNewsSchema =
  z.object({
    title: z
      .string()
      .min(5)
      .max(200),

    slug: z
      .string()
      .min(3)
      .max(200)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Invalid slug format",
      ),

    excerpt: z
      .string()
      .min(10)
      .max(500),

    content: z
      .string()
      .min(20),

    imageUrl: z
      .url()
      .nullable()
      .optional(),

    publishedAt: z
      .coerce
      .date()
      .nullable()
      .optional(),

    status: z
      .enum(NewsStatus)
      .default(
        NewsStatus.DRAFT,
      ),

    circuit: objectIdSchema
      .nullable()
      .optional(),

    event: objectIdSchema
      .nullable()
      .optional(),
  });

export const updateNewsSchema =
  createNewsSchema.partial();

export type CreateNewsInput =
  z.infer<
    typeof createNewsSchema
  >;

export type UpdateNewsInput =
  z.infer<
    typeof updateNewsSchema
  >;