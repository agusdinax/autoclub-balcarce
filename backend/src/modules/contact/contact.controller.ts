import {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  CreateContactInput,
} from "./contact.schema";

import {
  createContact,
} from "./contact.service";

export const createContactController =
  async (
    req: Request<
      {},
      {},
      CreateContactInput
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const contact =
        await createContact(
          req.body,
        );

      res.status(201).json({
        success: true,
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  };
  