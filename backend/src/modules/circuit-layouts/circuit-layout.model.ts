import { Schema, model } from "mongoose";

const circuitLayoutSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    circuit: {
      type: Schema.Types.ObjectId,
      ref: "Circuit",
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    length: {
      type: Number,
      min: 0,
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

circuitLayoutSchema.index(
  {
    circuit: 1,
    slug: 1,
  },
  {
    unique: true,
  },
);

export const CircuitLayoutModel =
  model(
    "CircuitLayout",
    circuitLayoutSchema,
  );