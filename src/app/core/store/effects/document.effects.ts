import { Injectable } from '@angular/core';
import { BaseEntityEffects } from 'src/app/shared/state/base-entity.effects';
import { DocumentModel } from '../../models/document.model';
import { DocumentService } from '../../services/document.service';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class DocumentEffects extends BaseEntityEffects<DocumentModel> {
  constructor(
    protected actions$: Actions,
    protected documentService: DocumentService
  ) {
    super(DocumentModel, actions$, documentService);
  }

  @Effect()
  public getDocumentById$: Observable<Action> = this.getEntityById$();
}
