import { CircuitModel } from "../circuits/circuit.model";
import { NotFoundError } from "../../errors/not-found-error";

import { CategoryModel } from "./category.model";

import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./category.schema";

export const createCategory = async (
  data: CreateCategoryInput,
) => {
  const circuit =
    await CircuitModel.findById(
      data.circuit,
    );

  if (!circuit) {
    throw new NotFoundError(
      "Circuit not found",
      "CIRCUIT_NOT_FOUND",
    );
  }

  return CategoryModel.create(data);
};

export const getCategories = async () => {
  return CategoryModel.find()
    .populate("circuit")
    .sort({ name: 1 })
    .lean();
};

export const getCategoryById = async (
  id: string,
) => {
  return CategoryModel.findById(id)
    .populate("circuit")
    .lean();
};