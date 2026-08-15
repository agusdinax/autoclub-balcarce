import {
  Schema,
  model,
} from "mongoose";

import {
  ContactStatus,
} from "./contact.types";

const contactSchema =
  new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },

      phone: {
        type: String,
        default: null,
      },

      subject: {
        type: String,
        required: true,
        trim: true,
      },

      message: {
        type: String,
        required: true,
        trim: true,
      },

      status: {
        type: String,
        enum: Object.values(
          ContactStatus,
        ),
        default:
          ContactStatus.UNREAD,
      },
    },
    {
      timestamps: true,
    },
  );

export const ContactModel =
  model(
    "Contact",
    contactSchema,
  );