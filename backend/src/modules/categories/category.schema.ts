import { z } from "zod";
import { objectIdSchema } from "../../utils/object-id.schema";

export const createCategorySchema =
  z.object({
    name: z
      .string()
      .min(2)
      .max(100),

    slug: z
      .string()
      .min(2)
      .max(100)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must contain only lowercase letters, numbers and hyphens",
      ),

    circuit: objectIdSchema,

    description: z
      .string()
      .max(1000)
      .optional()
      .nullable(),

    isActive: z
      .boolean()
      .optional()
      .default(true),
  });

export const updateCategorySchema =
  createCategorySchema.partial();

export type CreateCategoryInput =
  z.infer<typeof createCategorySchema>;

export type UpdateCategoryInput =
  z.infer<typeof updateCategorySchema>;