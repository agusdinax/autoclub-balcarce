import { GalleryModel } from "../../src/modules/gallery/gallery.model";

import { createTestCircuit } from "./circuit.fixture";

interface CreateTestGalleryOptions {
  circuitId?: string;
  eventId?: string;

  title?: string;
  description?: string;
  isActive?: boolean;
}

export const createTestGallery = async (
  options: CreateTestGalleryOptions = {},
) => {
  const circuit =
    options.circuitId
      ? null
      : await createTestCircuit();

  const circuitId =
    options.circuitId ??
    circuit?._id.toString();

  return GalleryModel.create({
    title:
      options.title ??
      `Test Gallery ${Date.now()}`,

    description:
      options.description ??
      "Gallery created during integration testing",

    circuit: circuitId ?? null,

    event:
      options.eventId ?? null,

    isActive:
      options.isActive ?? true,
  });
};