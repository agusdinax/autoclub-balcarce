import { CircuitModel } from "../circuits/circuit.model";
import { EventModel } from "../events/event.model";

import { ConflictError } from "../../errors/conflict-error";
import { NotFoundError } from "../../errors/not-found-error";

import { NewsModel } from "./news.model";
import {
  CreateNewsInput,
  UpdateNewsInput,
} from "./news.schema";
import { NewsStatus } from "./news.types";

interface NewsFilters {
  status?: NewsStatus;
  circuit?: string;
  event?: string;
}

export const createNews = async (
  data: CreateNewsInput,
) => {
  // 1. Validate published news
  if (
    data.status === NewsStatus.PUBLISHED &&
    !data.publishedAt
  ) {
    throw new ConflictError(
      "Published news must have a publishedAt date",
      "PUBLISHED_AT_REQUIRED",
    );
  }

  // 2. Verify circuit if provided
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

  // 3. Verify event if provided
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

  // 4. Create news
  return NewsModel.create(data);
};

export const getNews = async (
  filters: NewsFilters,
) => {
  const query: Record<string, unknown> = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.circuit) {
    query.circuit = filters.circuit;
  }

  if (filters.event) {
    query.event = filters.event;
  }

  return NewsModel.find(query)
    .populate("circuit")
    .populate("event")
    .sort({
      publishedAt: -1,
      createdAt: -1,
    })
    .lean();
};

export const getNewsById = async (
  id: string,
) => {
  return NewsModel.findById(id)
    .populate("circuit")
    .populate("event")
    .lean();
};

export const updateNews = async (
  id: string,
  data: UpdateNewsInput,
) => {
  // 1. Verify news exists
  const news =
    await NewsModel.findById(id);

  if (!news) {
    throw new NotFoundError(
      "News not found",
      "NEWS_NOT_FOUND",
    );
  }

  // 2. Determine final status
  const finalStatus =
    data.status ?? news.status;

  // 3. Determine final publishedAt
  const finalPublishedAt =
    data.publishedAt ??
    news.publishedAt;

  // 4. Validate published news
  if (
    finalStatus === NewsStatus.PUBLISHED &&
    !finalPublishedAt
  ) {
    throw new ConflictError(
      "Published news must have a publishedAt date",
      "PUBLISHED_AT_REQUIRED",
    );
  }

  // 5. Verify circuit if provided
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

  // 6. Verify event if provided
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

  // 7. Update
  return NewsModel.findByIdAndUpdate(
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

export const deleteNews = async (
  id: string,
) => {
  const news =
    await NewsModel.findByIdAndDelete(
      id,
    );

  if (!news) {
    throw new NotFoundError(
      "News not found",
      "NEWS_NOT_FOUND",
    );
  }

  return news;
};