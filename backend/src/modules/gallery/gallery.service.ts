import { CircuitModel } from "../circuits/circuit.model";
import { EventModel } from "../events/event.model";

import { NotFoundError } from "../../errors/not-found-error";

import { GalleryModel } from "./gallery.model";
import {
  CreateGalleryInput,
  UpdateGalleryInput,
} from "./gallery.schema";

interface GalleryFilters {
  circuit?: string;
  event?: string;
  isActive?: boolean;
}

export const createGallery =
  async (
    data: CreateGalleryInput,
  ) => {
    // Verify circuit if provided
    if (data.circuit) {
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
    }

    // Verify event if provided
    if (data.event) {
      const event =
        await EventModel.findById(
          data.event,
        );

      if (!event) {
        throw new NotFoundError(
          "Event not found",
          "EVENT_NOT_FOUND",
        );
      }
    }

    return GalleryModel.create(data);
  };

export const getGalleries =
  async (
    filters: GalleryFilters,
  ) => {
    const query: Record<
      string,
      unknown
    > = {};

    if (filters.circuit) {
      query.circuit =
        filters.circuit;
    }

    if (filters.event) {
      query.event =
        filters.event;
    }

    if (
      filters.isActive !== undefined
    ) {
      query.isActive =
        filters.isActive;
    }

    return GalleryModel.find(query)
      .populate("circuit")
      .populate("event")
      .sort({
        createdAt: -1,
      })
      .lean();
  };

export const getGalleryById =
  async (
    id: string,
  ) => {
    return GalleryModel.findById(id)
      .populate("circuit")
      .populate("event")
      .lean();
  };

export const updateGallery =
  async (
    id: string,
    data: UpdateGalleryInput,
  ) => {
    const gallery =
      await GalleryModel.findById(id);

    if (!gallery) {
      throw new NotFoundError(
        "Gallery not found",
        "GALLERY_NOT_FOUND",
      );
    }

    if (data.circuit) {
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
    }

    if (data.event) {
      const event =
        await EventModel.findById(
          data.event,
        );

      if (!event) {
        throw new NotFoundError(
          "Event not found",
          "EVENT_NOT_FOUND",
        );
      }
    }

    return GalleryModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      },
    )
      .populate("circuit")
      .populate("event")
      .lean();
  };

export const deleteGallery =
  async (
    id: string,
  ) => {
    const gallery =
      await GalleryModel.findByIdAndDelete(
        id,
      );

    if (!gallery) {
      throw new NotFoundError(
        "Gallery not found",
        "GALLERY_NOT_FOUND",
      );
    }

    return gallery;
  };