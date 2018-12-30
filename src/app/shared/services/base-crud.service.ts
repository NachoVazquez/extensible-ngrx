import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, publishLast, refCount } from 'rxjs/operators';
import {
  ServerDown,
  BadInput,
  NotFoundError,
  UnauthorizedError,
  AntError
} from '../error-handling';
import { InternalServerError } from '../error-handling/internal-server.error';

@Injectable()
export class BaseCrudService<T> {
  public url: string;

  constructor(url: string, public http: HttpClient) {
    this.url = url;
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url + '/getAll').pipe(
      publishLast(),
      refCount(),
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  public get(id: any): Observable<T> {
    return this.http.get<T>(this.url + '/get/' + id).pipe(
      publishLast(),
      refCount(),
      catchError(error => {
        return this.handleError(error);
      })
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
      publishLast(),
      refCount(),
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  public create(resource: T): Observable<T> {
    return this.http.post<T>(this.url + '/post/', resource).pipe(
      publishLast(),
      refCount(),
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  public update(id, resource: T): Observable<T> {
    return this.http.put<T>(this.url + '/put/' + id, resource).pipe(
      publishLast(),
      refCount(),
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  public delete(id) {
    return this.http.delete<T>(this.url + '/delete/' + id).pipe(
      publishLast(),
      refCount(),
      catchError(error => {
        return this.handleError(error);
      })
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

    return throwError(new AntError(error));
  }
}
