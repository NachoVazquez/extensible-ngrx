import { CustomError } from './custom-error';

export class ServerDown extends CustomError {
  static statusCode = 0;
}
