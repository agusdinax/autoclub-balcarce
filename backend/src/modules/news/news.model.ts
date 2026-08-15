import {
  Schema,
  model,
} from "mongoose";

import {
  NewsStatus,
} from "./news.types";

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      default: null,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: Object.values(
        NewsStatus,
      ),
      default: NewsStatus.DRAFT,
    },

    circuit: {
      type: Schema.Types.ObjectId,
      ref: "Circuit",
      default: null,
    },

    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const NewsModel =
  model(
    "News",
    newsSchema,
  );