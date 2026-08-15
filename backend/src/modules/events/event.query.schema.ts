import { z } from "zod";

import { objectIdSchema } from "../../utils/object-id.schema";

import {
  EventStatus,
  EventType,
} from "./event.types";

export const eventQuerySchema =
  z
    .object({
      type: z
        .enum(EventType)
        .optional(),

      status: z
        .enum(EventStatus)
        .optional(),

      circuit: objectIdSchema.optional(),

      from: z
        .coerce
        .date()
        .optional(),

      to: z
        .coerce
        .date()
        .optional(),
    })
    .refine(
      (data) =>
        !data.from ||
        !data.to ||
        data.from <= data.to,
      {
        message:
          "'from' date must be before or equal to 'to' date",
        path: ["to"],
      },
    );