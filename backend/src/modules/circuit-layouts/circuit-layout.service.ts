import { CircuitModel } from "../circuits/circuit.model";

import {
  CircuitLayoutModel,
} from "./circuit-layout.model";

import {
  CreateCircuitLayoutInput,
  UpdateCircuitLayoutInput,
} from "./circuit-layout.schema";

export const createCircuitLayout =
  async (
    data: CreateCircuitLayoutInput,
  ) => {
    const circuit =
      await CircuitModel.findById(
        data.circuit,
      );

    if (!circuit) {
      throw new Error(
        "Circuit not found",
      );
    }

    return CircuitLayoutModel.create(data);
  };

export const getCircuitLayouts =
  async () => {
    return CircuitLayoutModel.find()
      .populate("circuit")
      .sort({ name: 1 })
      .lean();
  };

export const getCircuitLayoutById =
  async (id: string) => {
    return CircuitLayoutModel.findById(id)
      .populate("circuit")
      .lean();
  };