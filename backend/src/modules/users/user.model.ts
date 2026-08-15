import {
  Schema,
  model,
} from "mongoose";

import {
  UserRole,
} from "./user.types";

const userSchema =
  new Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      passwordHash: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        enum: Object.values(
          UserRole,
        ),
        default: UserRole.ADMIN,
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

export const UserModel =
  model(
    "User",
    userSchema,
  );