import { Injectable } from '@angular/core';
import { BaseEntityEffects } from 'src/app/shared/state/base-entity.effects';
import { DocumentModel } from '../../../../core/models/document.model';
import { DocumentService } from '../../../../core/services/document.service';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class DocumentEffects extends BaseEntityEffects<DocumentModel, number> {
  constructor(
    protected actions$: Actions,
    protected documentService: DocumentService
  ) {
    super(DocumentModel, actions$, documentService);
  }

  @Effect()
  public getDocumentById$: Observable<Action> = this.getEntityById$();

  @Effect()
  public getAllDocuments$: Observable<Action> = this.getAllEntities$();

  @Effect()
  public createDocument$: Observable<Action> = this.createEntity$();

  @Effect()
  public updateDocument$: Observable<Action> = this.updateEntity$();

  @Effect()
  public deleteDocument$: Observable<Action> = this.deleteEntity$();
}
