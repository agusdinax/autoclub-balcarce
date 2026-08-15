import { Schema, model } from "mongoose";

import {
  EventStatus,
  EventType,
} from "./event.types";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    type: {
      type: String,
      enum: Object.values(EventType),
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(EventStatus),
      default: EventStatus.DRAFT,
    },

    date: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    circuit: {
      type: Schema.Types.ObjectId,
      ref: "Circuit",
      required: true,
    },

    layout: {
      type: Schema.Types.ObjectId,
      ref: "CircuitLayout",
      required: true,
    },

    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    imageUrl: {
      type: String,
      default: null,
    },

    registrationUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const EventModel =
  model("Event", eventSchema);