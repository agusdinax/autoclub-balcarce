import "dotenv/config";

import bcrypt from "bcrypt";

import { connectDatabase } from "../config/database";
import { env } from "../config/env";

import { UserModel } from "../modules/users/user.model";
import { UserRole } from "../modules/users/user.types";

const createAdmin = async () => {
  try {
    await connectDatabase();

    const email =
      "admin@autoclubbalcarce.com";

    const password =
      "Admin123456!";

    const existingUser =
      await UserModel.findOne({
        email,
      });

    if (existingUser) {
      console.log(
        "⚠️ Admin user already exists",
      );

      return;
    }

    const passwordHash =
      await bcrypt.hash(
        password,
        12,
      );

    await UserModel.create({
      email,
      passwordHash,
      role: UserRole.ADMIN,
      isActive: true,
    });

    console.log(
      "✅ Admin user created successfully",
    );

    console.log(
      `📧 Email: ${email}`,
    );

    console.log(
      `🔑 Password: ${password}`,
    );
  } catch (error) {
    console.error(
      "❌ Failed to create admin:",
      error,
    );

    process.exit(1);
  } finally {
    process.exit(0);
  }
};

createAdmin();