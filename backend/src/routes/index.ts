import { Router } from "express";

import {
  circuitRouter,
} from "../modules/circuits/circuit.routes";

import {
  circuitLayoutRouter,
} from "../modules/circuit-layouts/circuit-layout.routes";

import {
  categoryRouter,
} from "../modules/categories/category.routes";

import {
  eventRouter,
} from "../modules/events/event.routes";
import {
  kartRentalRouter,
} from "../modules/kart-rental/kart-rental.routes";
import {
  newsRouter,
} from "../modules/news/news.routes";
import {
  galleryRouter,
} from "../modules/gallery/gallery.routes";
import {
  contactRouter,
} from "../modules/contact/contact.routes";
import {
  authRouter,
} from "../modules/auth/auth.routes";

export const routes = Router();

routes.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Auto Club Balcarce API is running",
  });
});

routes.use(
  "/circuits",
  circuitRouter,
);

routes.use(
  "/circuit-layouts",
  circuitLayoutRouter,
);

routes.use(
  "/categories",
  categoryRouter,
);

routes.use(
  "/events",
  eventRouter,
);
routes.use(
  "/kart-rentals",
  kartRentalRouter,
);
routes.use(
  "/news",
  newsRouter,
);
routes.use(
  "/gallery",
  galleryRouter,
);
routes.use(
  "/contact",
  contactRouter,
);
routes.use(
  "/auth",
  authRouter,
);