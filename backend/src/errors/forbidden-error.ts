import {
  AppError,
} from "./app-error";

export class ForbiddenError
  extends AppError {
  constructor(
    message = "Forbidden",
    code = "FORBIDDEN",
  ) {
    super(
      message,
      403,
      code,
    );
  }
}