import {
  NextFunction,
  Request,
  Response,
} from "express";

import { NotFoundError } from "../../errors/not-found-error";

import {
  CreateNewsInput,
  UpdateNewsInput,
} from "./news.schema";

import {
  createNews,
  deleteNews,
  getNews,
  getNewsById,
  updateNews,
} from "./news.service";

import {
  NewsStatus,
} from "./news.types";

interface NewsQuery {
  status?: NewsStatus;
  circuit?: string;
  event?: string;
}

export const createNewsController =
  async (
    req: Request<
      {},
      {},
      CreateNewsInput
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const news =
        await createNews(req.body);

      res.status(201).json({
        success: true,
        data: news,
      });
    } catch (error) {
      next(error);
    }
  };

export const getNewsController =
  async (
    req: Request<
      {},
      {},
      {},
      NewsQuery
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const news = await getNews(
        req.query,
      );

      res.status(200).json({
        success: true,
        data: news,
      });
    } catch (error) {
      next(error);
    }
  };

export const getNewsByIdController =
  async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const news =
        await getNewsById(
          req.params.id,
        );

      if (!news) {
        throw new NotFoundError(
          "News not found",
          "NEWS_NOT_FOUND",
        );
      }

      res.status(200).json({
        success: true,
        data: news,
      });
    } catch (error) {
      next(error);
    }
  };

export const updateNewsController =
  async (
    req: Request<
      { id: string },
      {},
      UpdateNewsInput
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const news =
        await updateNews(
          req.params.id,
          req.body,
        );

      res.status(200).json({
        success: true,
        data: news,
      });
    } catch (error) {
      next(error);
    }
  };

export const deleteNewsController =
  async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await deleteNews(
        req.params.id,
      );

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };