import {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  LoginInput,
} from "./auth.schema";

import {
  login,
} from "./auth.service";

export const loginController =
  async (
    req: Request<
      {},
      {},
      LoginInput
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result =
        await login(req.body);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };