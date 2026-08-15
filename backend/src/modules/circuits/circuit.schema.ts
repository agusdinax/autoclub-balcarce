import { z } from "zod";

import { CircuitType } from "./circuit.types";

export const createCircuitSchema = z.object({
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

  type: z.enum(CircuitType),

  description: z
    .string()
    .min(10)
    .max(5000),

  location: z
    .string()
    .min(3)
    .max(200),

  mapUrl: z
    .url()
    .optional()
    .nullable(),

  imageUrl: z
    .url()
    .optional()
    .nullable(),

  isActive: z
    .boolean()
    .optional()
    .default(true),
});

export const updateCircuitSchema =
  createCircuitSchema.partial();

export type CreateCircuitInput = z.infer<
  typeof createCircuitSchema
>;

export type UpdateCircuitInput = z.infer<
  typeof updateCircuitSchema
>;