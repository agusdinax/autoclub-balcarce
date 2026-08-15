import { z } from "zod";

export const createContactSchema =
  z.object({
    name: z
      .string()
      .min(2)
      .max(100)
      .trim(),

    email: z
      .email(),

    phone: z
      .string()
      .max(30)
      .optional()
      .nullable(),

    subject: z
      .string()
      .min(3)
      .max(150)
      .trim(),

    message: z
      .string()
      .min(10)
      .max(3000)
      .trim(),
  });

export type CreateContactInput =
  z.infer<
    typeof createContactSchema
  >;