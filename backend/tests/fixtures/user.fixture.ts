import { UserModel } from "../../src/modules/users/user.model";
import { UserRole } from "../../src/modules/users/user.types";
import { hashPassword } from "../../src/utils/password";

interface CreateTestUserOptions {
  email?: string;
  password?: string;
  role?: UserRole;
  isActive?: boolean;
}

const uniqueEmail = (): string => {
  return `test-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}@autoclub.test`;
};

export const createTestUser = async (
  options: CreateTestUserOptions = {},
) => {
  const {
    email = uniqueEmail(),
    password = "TestPassword123!",
    role = UserRole.ADMIN,
    isActive = true,
  } = options;

  const passwordHash =
    await hashPassword(password);

  const user = await UserModel.create({
    email,
    passwordHash,
    role,
    isActive,
  });

  return {
    user,
    password,
  };
};