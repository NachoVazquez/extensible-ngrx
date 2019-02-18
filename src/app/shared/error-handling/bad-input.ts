import { CustomError } from './custom-error';

export class BadInput extends CustomError {
  static statusCode = 400;
}
