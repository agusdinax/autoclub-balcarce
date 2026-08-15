import { z } from "zod";

export const createCircuitLayoutSchema =
  z.object({
    name: z
      .string()
      .min(3)
      .max(150),

    slug: z
      .string()
      .min(3)
      .max(150)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must contain only lowercase letters, numbers and hyphens",
      ),

    circuit: z
      .string()
      .min(1),

    description: z
      .string()
      .min(10)
      .max(5000),

    length: z
      .number()
      .positive()
      .optional(),

    imageUrl: z
      .url()
      .optional()
      .nullable(),

    isActive: z
      .boolean()
      .optional()
      .default(true),
  });

export const updateCircuitLayoutSchema =
  createCircuitLayoutSchema.partial();

export type CreateCircuitLayoutInput =
  z.infer<typeof createCircuitLayoutSchema>;

export type UpdateCircuitLayoutInput =
  z.infer<typeof updateCircuitLayoutSchema>;