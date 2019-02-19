import { HttpErrorResponse } from '@angular/common/http';

export class CustomError {
  constructor(public originalError?: HttpErrorResponse) {}
}
