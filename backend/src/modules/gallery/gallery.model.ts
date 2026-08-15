import {
  Schema,
  model,
} from "mongoose";

const galleryImageSchema =
  new Schema(
    {
      url: {
        type: String,
        required: true,
      },

      caption: {
        type: String,
        default: null,
      },

      order: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    {
      _id: false,
    },
  );

const gallerySchema =
  new Schema(
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

      description: {
        type: String,
        default: null,
      },

      images: {
        type: [galleryImageSchema],
        required: true,
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

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    },
  );

export const GalleryModel =
  model(
    "Gallery",
    gallerySchema,
  );