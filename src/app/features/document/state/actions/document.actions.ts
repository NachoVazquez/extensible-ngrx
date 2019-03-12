import { DocumentComponent } from './../../containers/document.component';
import { DocumentModel } from '../../../../core/models/document.model';
import * as actions from '../../../../shared/state/base-crud-origin.actions';

import { Action } from '@ngrx/store';

export const ARCHIVE_DOCUMENT = '[Document Component] Archive';
export const ARCHIVE_DOCUMENT_SUCCESS = '[Document API] Archive Success';
export const ARCHIVE_DOCUMENT_ERROR = '[Document API] Archive Error';

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
