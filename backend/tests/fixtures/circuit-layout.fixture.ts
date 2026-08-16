import { CircuitLayoutModel } from "../../src/modules/circuit-layouts/circuit-layout.model";

import {
  createTestCircuit,
} from "./circuit.fixture";

interface CreateTestCircuitLayoutOptions {
  circuitId?: string;
  name?: string;
  slug?: string;
}

export const createTestCircuitLayout =
  async (
    options: CreateTestCircuitLayoutOptions = {},
  ) => {
    const circuitId =
      options.circuitId ??
      (
        await createTestCircuit()
      )._id.toString();

    return CircuitLayoutModel.create({
      name:
        options.name ??
        "Test Layout",

      slug:
        options.slug ??
        `test-layout-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}`,

      circuit: circuitId,

      description:
        "Circuit layout created during testing",

      length: 4.592,

      isActive: true,
    });
  };