import { UserModel } from "./user.model";

export const getUserByEmail = async (
  email: string,
) => {
  return UserModel.findOne({
    email: email.toLowerCase(),
  });
};

export const getUserById = async (
  id: string,
) => {
  return UserModel.findById(id);
};