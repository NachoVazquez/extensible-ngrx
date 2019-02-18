import { CustomError } from './custom-error';

export class ForbiddenError extends CustomError {
  static statusCode = 403;
}
