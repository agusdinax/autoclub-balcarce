import mongoose from "mongoose";
import { env } from "../../src/config/env";

export const connectTestDatabase =
  async (): Promise<void> => {
    const uri = env.MONGODB_TEST_URI;

    if (!uri) {
      throw new Error(
        "MONGODB_TEST_URI is required for integration tests",
      );
    }

    await mongoose.connect(uri);
  };

export const disconnectTestDatabase =
  async (): Promise<void> => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  };