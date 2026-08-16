import mongoose from "mongoose";
import { env } from "./env";

export const connectDatabase =
  async (): Promise<void> => {
    try {
      const uri =
        env.NODE_ENV === "test"
          ? env.MONGODB_TEST_URI
          : env.MONGODB_URI;

      if (!uri) {
        throw new Error(
          "MONGODB_TEST_URI is required when NODE_ENV=test",
        );
      }

      await mongoose.connect(uri);

      console.log(
        "✅ MongoDB connected",
      );
    } catch (error) {
      console.error(
        "❌ MongoDB connection failed",
      );

      console.error(error);

      throw error;
    }
  };