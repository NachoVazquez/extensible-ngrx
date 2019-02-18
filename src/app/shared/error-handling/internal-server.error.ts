import { CustomError } from './custom-error';

export class InternalServerError extends CustomError {
  static statusCode = 500;
}
