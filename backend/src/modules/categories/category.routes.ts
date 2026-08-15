import { Router } from "express";

import { validate } from "../../middlewares/validate.middleware";

import {
  createCategorySchema,
} from "./category.schema";

import {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
} from "./category.controller";

export const categoryRouter = Router();

categoryRouter.get(
  "/",
  getCategoriesController,
);

categoryRouter.get(
  "/:id",
  getCategoryByIdController,
);

categoryRouter.post(
  "/",
  validate(createCategorySchema),
  createCategoryController,
);