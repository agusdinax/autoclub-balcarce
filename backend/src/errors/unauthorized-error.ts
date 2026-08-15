import {
  AppError,
} from "./app-error";

export class UnauthorizedError
  extends AppError {
  constructor(
    message = "Unauthorized",
    code = "UNAUTHORIZED",
  ) {
    super(
      message,
      401,
      code,
    );
  }
}