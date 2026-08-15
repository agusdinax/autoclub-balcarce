import { Schema, model } from "mongoose";

import { CircuitType } from "./circuit.types";

const circuitSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
      enum: Object.values(CircuitType),
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    mapUrl: {
      type: String,
      default: null,
    },

    imageUrl: {
      type: String,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CircuitModel = model("Circuit", circuitSchema);