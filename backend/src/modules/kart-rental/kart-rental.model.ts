import {
  Schema,
  model,
} from "mongoose";

const rentalOptionSchema =
  new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      duration: {
        type: Number,
        required: true,
        min: 1,
      },

      price: {
        type: Number,
        required: true,
        min: 0,
      },

      currency: {
        type: String,
        enum: ["ARS", "USD"],
        required: true,
      },

      description: {
        type: String,
        default: null,
      },
    },
    {
      _id: false,
    },
  );

const kartRentalSchema =
  new Schema(
    {
      circuit: {
        type: Schema.Types.ObjectId,
        ref: "Circuit",
        required: true,
        unique: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
        trim: true,
      },

      requirements: [
        {
          type: String,
          trim: true,
        },
      ],

      options: {
        type: [rentalOptionSchema],
        required: true,
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

export const KartRentalModel =
  model(
    "KartRental",
    kartRentalSchema,
  );