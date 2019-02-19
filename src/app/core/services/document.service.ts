import { BaseCrudService } from './../../shared/services/base-crud.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentModel } from '../models/document.model';
import { retryBackoff } from 'backoff-rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DocumentService extends BaseCrudService<DocumentModel, number> {
  constructor(protected httpClient: HttpClient) {
    super('http://example.com/api/document', httpClient);
  }

  public archive(id: number) {
    return this.http.delete<void>(`${this.url}/archive/${id}`).pipe(
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }
}
