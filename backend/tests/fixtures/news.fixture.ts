import { NewsModel } from "../../src/modules/news/news.model";
import { NewsStatus } from "../../src/modules/news/news.types";

import { createTestCircuit } from "./circuit.fixture";

interface CreateTestNewsOptions {
  circuitId?: string;
  eventId?: string;

  title?: string;
  slug?: string;
  content?: string;
  status?: NewsStatus;

  publishedAt?: Date;
}

export const createTestNews = async (
  options: CreateTestNewsOptions = {},
) => {
  const circuit =
    options.circuitId
      ? null
      : await createTestCircuit();

  const circuitId =
    options.circuitId ??
    circuit!._id.toString();

  return NewsModel.create({
    title:
      options.title ??
      `Test News ${Date.now()}`,

    slug:
      options.slug ??
      `test-news-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`,

    content:
      options.content ??
      "Test news content",

    status:
      options.status ??
      NewsStatus.PUBLISHED,

    circuit: circuitId,

    event:
      options.eventId ?? null,

    publishedAt:
      options.publishedAt ??
      new Date(),
  });
};