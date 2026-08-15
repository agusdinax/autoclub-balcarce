import {
  NextFunction,
  Request,
  Response,
} from "express";

import { NotFoundError } from "../../errors/not-found-error";

import {
  CreateEventInput, 
  UpdateEventInput
} from "./event.schema";

import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  updateEvent
} from "./event.service";

export const createEventController =
  async (
    req: Request<
      {},
      {},
      CreateEventInput
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const event = await createEvent(
        req.body,
      );

      res.status(201).json({
        success: true,
        data: event,
      });
    } catch (error) {
      next(error);
    }
  };

export const getEventsController =
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const events = await getEvents(
        req.query,
      );

      res.status(200).json({
        success: true,
        data: events,
      });
    } catch (error) {
      next(error);
    }
  };
  
export const getEventByIdController =
  async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const event = await getEventById(
        req.params.id,
      );

      if (!event) {
        throw new NotFoundError(
          "Event not found",
          "EVENT_NOT_FOUND",
        );
      }

      res.status(200).json({
        success: true,
        data: event,
      });
    } catch (error) {
      next(error);
    }
  };

  export const updateEventController =
  async (
    req: Request<
      { id: string },
      {},
      UpdateEventInput
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const event = await updateEvent(
        req.params.id,
        req.body,
      );

      res.status(200).json({
        success: true,
        data: event,
      });
    } catch (error) {
      next(error);
    }
  };

export const deleteEventController =
  async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await deleteEvent(req.params.id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };