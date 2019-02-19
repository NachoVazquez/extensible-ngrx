import { retryBackoff, RetryBackoffConfig } from 'backoff-rxjs';
import {
  CustomError,
  UnauthorizedError,
  ServerDown,
  BadInput,
  NotFoundError
} from '../error-handling';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { InternalServerError } from '../error-handling/internal-server.error';
import { ForbiddenError } from '../error-handling/forbidden-error';
import { BaseEntity } from '../models/base-entity.model';

export abstract class BaseCrudService<TEntity extends BaseEntity<TKey>, TKey> {
  protected readonly retryConfig: RetryBackoffConfig = {
    initialInterval: 1000,
    shouldRetry: (error: CustomError) => error instanceof ServerDown
  };

  constructor(
    protected readonly url: string,
    protected readonly http: HttpClient
  ) {}

  public getAll(): Observable<TEntity[]> {
    return this.http.get<TEntity[]>(`${this.url}/getAll`).pipe(
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public get(id: TKey): Observable<TEntity> {
    return this.http.get<TEntity>(`${this.url}/get/${id}`).pipe(
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public create(resource: TEntity): Observable<TEntity> {
    return this.http.post<TEntity>(`${this.url}/post/`, resource).pipe(
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public update(id: TKey, resource: TEntity): Observable<TEntity> {
    return this.http.put<TEntity>(`${this.url}/put/${id}`, resource).pipe(
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public delete(id: TKey) {
    return this.http.delete<void>(`${this.url}/delete/${id}`).pipe(
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === ServerDown.statusCode) {
      return throwError(new ServerDown(error));
    }

    if (error.status === BadInput.statusCode) {
      return throwError(new BadInput(error));
    }

    if (error.status === NotFoundError.statusCode) {
      return throwError(new NotFoundError(error));
    }

    if (error.status === UnauthorizedError.statusCode) {
      return throwError(new UnauthorizedError(error));
    }
    if (error.status === ForbiddenError.statusCode) {
      return throwError(new ForbiddenError(error));
    }

    if (error.status === InternalServerError.statusCode) {
      return throwError(new InternalServerError(error));
    }

    return throwError(new CustomError(error));
  }
}
