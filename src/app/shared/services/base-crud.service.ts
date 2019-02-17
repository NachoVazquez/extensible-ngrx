import { retryBackoff, RetryBackoffConfig } from 'backoff-rxjs';
import { Injectable } from '@angular/core';
import {
  CustomError,
  UnauthorizedError,
  ServerDown,
  BadInput,
  NotFoundError
} from '../error-handling';
import { ForbiddenError } from '../error-handling/forbidden-error';
import { Observable, throwError } from 'rxjs';
import { publishLast, refCount, catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { InternalServerError } from '../error-handling/internal-server.error';

export abstract class BaseCrudService<T> {
  protected readonly retryConfig: RetryBackoffConfig = {
    initialInterval: 1000,
    shouldRetry: (error: CustomError) => error instanceof ServerDown
  };

  constructor(
    protected readonly url: string,
    protected readonly http: HttpClient
  ) {}

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url + '/getAll').pipe(
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public get(id: number | string): Observable<T> {
    return this.http.get<T>(this.url + '/get/' + id).pipe(
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public getWithPagAndSort(
    pageNumber: number,
    pageSize: number,
    columnToSort: string,
    sortDir: string,
    columnsToReturn: string = '*',
    tableToQuery: string = null
  ): Observable<T[]> {
    const fUrl =
      this.url +
      '/getWithPaginationAndFilter?pageNumber=' +
      pageNumber +
      '&pageSize=' +
      pageSize +
      '&columnNameForSorting=' +
      columnToSort +
      '&sortingType=' +
      sortDir +
      '&columnsToReturn=' +
      columnsToReturn +
      (tableToQuery ? '&tableToQuery=' + tableToQuery : '');
    return this.http.get<T[]>(fUrl).pipe(
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public create(resource: T): Observable<T> {
    return this.http.post<T>(this.url + '/post/', resource).pipe(
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public update(id: number | string, resource: T): Observable<T> {
    return this.http.put<T>(this.url + '/put/' + id, resource).pipe(
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public delete(id: number | string) {
    return this.http.delete<T>(this.url + '/delete/' + id).pipe(
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(new ServerDown(error));
    }

    if (error.status === 400) {
      return throwError(new BadInput(error));
    }

    if (error.status === 404) {
      return throwError(new NotFoundError(error));
    }

    if (error.status === 401) {
      return throwError(new UnauthorizedError(error));
    }
    if (error.status === 403) {
      return throwError(new UnauthorizedError(error));
    }

    if (error.status === 500) {
      return throwError(new InternalServerError(error));
    }

    return throwError(new CustomError(error));
  }
}
