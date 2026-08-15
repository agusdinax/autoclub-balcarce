import {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  createCircuitLayout,
  getCircuitLayoutById,
  getCircuitLayouts,
} from "./circuit-layout.service";

import {
  CreateCircuitLayoutInput,
} from "./circuit-layout.schema";

export const createCircuitLayoutController =
  async (
    req: Request<
      {},
      {},
      CreateCircuitLayoutInput
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const layout =
        await createCircuitLayout(
          req.body,
        );

      res.status(201).json({
        success: true,
        data: layout,
      });
    } catch (error) {
      next(error);
    }
  };

export const getCircuitLayoutsController =
  async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const layouts =
        await getCircuitLayouts();

      res.status(200).json({
        success: true,
        data: layouts,
      });
    } catch (error) {
      next(error);
    }
  };

export const getCircuitLayoutByIdController =
  async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const layout =
        await getCircuitLayoutById(
          req.params.id,
        );

      if (!layout) {
        res.status(404).json({
          success: false,
          error: {
            code: "CIRCUIT_LAYOUT_NOT_FOUND",
            message:
              "Circuit layout not found",
          },
        });

        return;
      }

      res.status(200).json({
        success: true,
        data: layout,
      });
    } catch (error) {
      next(error);
    }
  };