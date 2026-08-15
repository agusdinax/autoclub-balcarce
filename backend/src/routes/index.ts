import { Router } from "express";
import { circuitRouter } from "../modules/circuits/circuit.routes";
import {
  circuitLayoutRouter,
} from "../modules/circuit-layouts/circuit-layout.routes";
import {
  categoryRouter,
} from "../modules/categories/category.routes";
export const routes = Router();

routes.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Auto Club Balcarce API is running",
  });
});

routes.use("/circuits", circuitRouter);
routes.use("/circuit-layouts",circuitLayoutRouter);
routes.use("/categories", categoryRouter);