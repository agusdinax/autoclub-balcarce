import { CircuitModel } from "./circuit.model";
import {
  CreateCircuitInput,
  UpdateCircuitInput,
} from "./circuit.schema";

export const createCircuit = async (
  data: CreateCircuitInput,
) => {
  return CircuitModel.create(data);
};

export const getCircuits = async () => {
  return CircuitModel.find()
    .sort({ name: 1 })
    .lean();
};

export const getCircuitById = async (
  id: string,
) => {
  return CircuitModel.findById(id).lean();
};

export const updateCircuit = async (
  id: string,
  data: UpdateCircuitInput,
) => {
  return CircuitModel.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    },
  ).lean();
};

export const deleteCircuit = async (
  id: string,
) => {
  return CircuitModel.findByIdAndDelete(id);
};