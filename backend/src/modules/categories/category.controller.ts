import {
  NextFunction,
  Request,
  Response,
} from "express";
import { NotFoundError } from "../../errors/not-found-error";
import {
  CreateCategoryInput,
} from "./category.schema";

import {
  createCategory,
  getCategories,
  getCategoryById,
} from "./category.service";

export const createCategoryController = async (
  req: Request<{}, {}, CreateCategoryInput>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const category = await createCategory(
      req.body,
    );

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoriesController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const categories = await getCategories();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const category = await getCategoryById(
      req.params.id,
    );

    if (!category) {
        throw new NotFoundError(
            "Category not found",
            "CATEGORY_NOT_FOUND",
        );
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};