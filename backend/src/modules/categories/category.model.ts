import { Schema, model } from "mongoose";

const categorySchema = new Schema(
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

categorySchema.index(
  {
    circuit: 1,
    slug: 1,
  },
  {
    unique: true,
  },
);

export const CategoryModel =
  model("Category", categorySchema);