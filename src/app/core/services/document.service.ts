import { BaseCrudService } from './../../shared/services/base-crud.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentModel } from '../models/document.model';

@Injectable()
export class DocumentService extends BaseCrudService<DocumentModel> {
  constructor(protected httpClient: HttpClient) {
    super('http://example.com/api/document', httpClient);
  }
}
