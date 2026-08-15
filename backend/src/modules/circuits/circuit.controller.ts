import {
  NextFunction,
  Request,
  Response,
} from "express";
import { NotFoundError } from "../../errors/not-found-error";
import {
  createCircuit,
  deleteCircuit,
  getCircuitById,
  getCircuits,
  updateCircuit,
} from "./circuit.service";

import {
  CreateCircuitInput,
  UpdateCircuitInput,
} from "./circuit.schema";

export const createCircuitController = async (
  req: Request<{}, {}, CreateCircuitInput>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const circuit = await createCircuit(
      req.body,
    );

    res.status(201).json({
      success: true,
      data: circuit,
    });
  } catch (error) {
    next(error);
  }
};

export const getCircuitsController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const circuits = await getCircuits();

    res.status(200).json({
      success: true,
      data: circuits,
    });
  } catch (error) {
    next(error);
  }
};

export const getCircuitByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const circuit = await getCircuitById(
      req.params.id,
    );

    if (!circuit) {
      if (!circuit) {
        throw new NotFoundError(
          "Circuit not found",
          "CIRCUIT_NOT_FOUND",
        );
      }
      return;
    }

    res.status(200).json({
      success: true,
      data: circuit,
    });
  } catch (error) {
    next(error);
  }
};