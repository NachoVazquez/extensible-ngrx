import { CustomError } from './custom-error';

export class UnauthorizedError extends CustomError {
  static statusCode = 401;
}
