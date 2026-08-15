import {
  NextFunction,
  Request,
  Response,
} from "express";

import { NotFoundError } from "../../errors/not-found-error";

import {
  CreateKartRentalInput,
  UpdateKartRentalInput,
} from "./kart-rental.schema";

import {
  createKartRental,
  deleteKartRental,
  getKartRentalById,
  getKartRentals,
  updateKartRental,
} from "./kart-rental.service";

export const createKartRentalController =
  async (
    req: Request<
      {},
      {},
      CreateKartRentalInput
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const rental =
        await createKartRental(req.body);

      res.status(201).json({
        success: true,
        data: rental,
      });
    } catch (error) {
      next(error);
    }
  };

export const getKartRentalsController =
  async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const rentals =
        await getKartRentals();

      res.status(200).json({
        success: true,
        data: rentals,
      });
    } catch (error) {
      next(error);
    }
  };

export const getKartRentalByIdController =
  async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const rental =
        await getKartRentalById(
          req.params.id,
        );

      if (!rental) {
        throw new NotFoundError(
          "Kart rental configuration not found",
          "KART_RENTAL_NOT_FOUND",
        );
      }

      res.status(200).json({
        success: true,
        data: rental,
      });
    } catch (error) {
      next(error);
    }
  };

export const updateKartRentalController =
  async (
    req: Request<
      { id: string },
      {},
      UpdateKartRentalInput
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const rental =
        await updateKartRental(
          req.params.id,
          req.body,
        );

      res.status(200).json({
        success: true,
        data: rental,
      });
    } catch (error) {
      next(error);
    }
  };

export const deleteKartRentalController =
  async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await deleteKartRental(
        req.params.id,
      );

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };