import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  static statusCode = 404;
}
