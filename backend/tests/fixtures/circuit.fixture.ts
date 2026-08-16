import { CircuitModel } from "../../src/modules/circuits/circuit.model";
import { CircuitType } from "../../src/modules/circuits/circuit.types";

export const createTestCircuit = async () => {
  return CircuitModel.create({
    name: "Test Circuit",
    slug: "test-circuit",
    type: CircuitType.AUTODROMO,
    description: "Circuit used for automated tests",
    location: "Test Location",
    isActive: true,
  });
};