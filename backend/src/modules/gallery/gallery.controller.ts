import {
  NextFunction,
  Request,
  Response,
} from "express";

import { NotFoundError } from "../../errors/not-found-error";

import {
  CreateGalleryInput,
  UpdateGalleryInput,
} from "./gallery.schema";

import {
  createGallery,
  deleteGallery,
  getGalleries,
  getGalleryById,
  updateGallery,
} from "./gallery.service";

interface GalleryQuery {
  circuit?: string;
  event?: string;
  isActive?: string;
}

export const createGalleryController =
  async (
    req: Request<
      {},
      {},
      CreateGalleryInput
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const gallery =
        await createGallery(
          req.body,
        );

      res.status(201).json({
        success: true,
        data: gallery,
      });
    } catch (error) {
      next(error);
    }
  };

export const getGalleriesController =
  async (
    req: Request<
      {},
      {},
      {},
      GalleryQuery
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const galleries =
        await getGalleries({
          circuit:
            req.query.circuit,

          event:
            req.query.event,

          isActive:
            req.query.isActive !==
            undefined
              ? req.query.isActive ===
                "true"
              : undefined,
        });

      res.status(200).json({
        success: true,
        data: galleries,
      });
    } catch (error) {
      next(error);
    }
  };

export const getGalleryByIdController =
  async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const gallery =
        await getGalleryById(
          req.params.id,
        );

      if (!gallery) {
        throw new NotFoundError(
          "Gallery not found",
          "GALLERY_NOT_FOUND",
        );
      }

      res.status(200).json({
        success: true,
        data: gallery,
      });
    } catch (error) {
      next(error);
    }
  };

export const updateGalleryController =
  async (
    req: Request<
      { id: string },
      {},
      UpdateGalleryInput
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const gallery =
        await updateGallery(
          req.params.id,
          req.body,
        );

      res.status(200).json({
        success: true,
        data: gallery,
      });
    } catch (error) {
      next(error);
    }
  };

export const deleteGalleryController =
  async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await deleteGallery(
        req.params.id,
      );

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };