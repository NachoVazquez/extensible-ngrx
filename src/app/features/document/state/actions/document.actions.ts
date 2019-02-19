import { DocumentModel } from '../../../../core/models/document.model';
import * as actions from '../../../../shared/state/base-crud.actions';
import { GET_BY_ID_RAW } from './document-raw.actions';
import { Action } from '@ngrx/store';

export const ARCHIVE_DOCUMENT = '[DOCUMENT] Archive';
export const ARCHIVE_DOCUMENT_SUCCESS = '[DOCUMENT] Archive Success';
export const ARCHIVE_DOCUMENT_ERROR = '[DOCUMENT] Archive Error';

export class ArchiveDocumentAction implements Action {
  public readonly type = ARCHIVE_DOCUMENT;

  constructor(public readonly payload: DocumentModel) {}
}

export class ArchiveDocumentSuccessAction implements Action {
  public readonly type = ARCHIVE_DOCUMENT_SUCCESS;
  public payload: void;

  constructor() {}
}

export class ArchiveDocumentErrorAction implements Action {
  public readonly type = ARCHIVE_DOCUMENT_ERROR;

  constructor(public readonly payload: DocumentModel) {}
}

export type DocumentActions =
  | actions.CrudActions<DocumentModel, number>
  | ArchiveDocumentAction
  | ArchiveDocumentSuccessAction
  | ArchiveDocumentErrorAction;
