import { CategoryModel } from "../../src/modules/categories/category.model";
import { createTestCircuit } from "./circuit.fixture";

interface CreateTestCategoryOptions {
  circuitId?: string;
  name?: string;
  slug?: string;
}

export const createTestCategory = async (
  options: CreateTestCategoryOptions = {},
) => {
  const circuitId =
    options.circuitId ??
    (
      await createTestCircuit()
    )._id.toString();

  return CategoryModel.create({
    name:
      options.name ??
      "Test Category",

    slug:
      options.slug ??
      `test-category-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`,

    circuit: circuitId,

    description:
      "Category created during testing",

    isActive: true,
  });
};