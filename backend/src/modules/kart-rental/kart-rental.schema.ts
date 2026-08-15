import { z } from "zod";

import { objectIdSchema } from "../../utils/object-id.schema";

import {
  Currency,
} from "./kart-rental.types";

const rentalOptionSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(100),

  duration: z
    .number()
    .int()
    .positive(),

  price: z
    .number()
    .nonnegative(),

  currency: z
    .enum(Currency),

  description: z
    .string()
    .max(500)
    .optional()
    .nullable(),
});

export const createKartRentalSchema =
  z.object({
    circuit: objectIdSchema,

    title: z
      .string()
      .min(3)
      .max(150),

    description: z
      .string()
      .min(10)
      .max(2000),

    requirements: z
      .array(
        z.string().min(2).max(300),
      )
      .default([]),

    options: z
      .array(rentalOptionSchema)
      .min(1),

    isActive: z
      .boolean()
      .default(true),
  });

export const updateKartRentalSchema =
  createKartRentalSchema.partial();

export type CreateKartRentalInput =
  z.infer<
    typeof createKartRentalSchema
  >;

export type UpdateKartRentalInput =
  z.infer<
    typeof updateKartRentalSchema
  >;