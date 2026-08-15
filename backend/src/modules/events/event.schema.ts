import { z } from "zod";

import { objectIdSchema } from "../../utils/object-id.schema";

import {
  EventStatus,
  EventType,
} from "./event.types";

export const createEventSchema = z.object({
  title: z
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

  type: z.enum(EventType),

  status: z
    .enum(EventStatus)
    .optional()
    .default(EventStatus.DRAFT),

  date: z.coerce.date(),

  description: z
    .string()
    .min(10)
    .max(5000),

  circuit: objectIdSchema,

  layout: objectIdSchema,

  categories: z
    .array(objectIdSchema)
    .default([]),

  imageUrl: z
    .url()
    .optional()
    .nullable(),

  registrationUrl: z
    .url()
    .optional()
    .nullable(),
});

export const updateEventSchema =
  createEventSchema.partial();

export type CreateEventInput =
  z.infer<typeof createEventSchema>;

export type UpdateEventInput =
  z.infer<typeof updateEventSchema>;