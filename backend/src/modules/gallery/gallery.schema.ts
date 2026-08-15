import { z } from "zod";

import { objectIdSchema } from "../../utils/object-id.schema";

const galleryImageSchema = z.object({
  url: z.url(),

  caption: z
    .string()
    .max(300)
    .nullable()
    .optional(),

  order: z
    .number()
    .int()
    .min(0),
});

export const createGallerySchema =
  z.object({
    title: z
      .string()
      .min(3)
      .max(200),

    slug: z
      .string()
      .min(3)
      .max(200)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Invalid slug format",
      ),

    description: z
      .string()
      .max(1000)
      .optional()
      .nullable(),

    images: z
      .array(galleryImageSchema)
      .min(1),

    circuit: objectIdSchema
      .nullable()
      .optional(),

    event: objectIdSchema
      .nullable()
      .optional(),

    isActive: z
      .boolean()
      .default(true),
  });

export const updateGallerySchema =
  createGallerySchema.partial();

export type CreateGalleryInput =
  z.infer<
    typeof createGallerySchema
  >;

export type UpdateGalleryInput =
  z.infer<
    typeof updateGallerySchema
  >;