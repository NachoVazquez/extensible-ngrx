import { Injectable } from '@angular/core';
import { BaseEntityEffects } from 'src/app/shared/state/base-entity.effects';
import { DocumentModel } from '../../../../core/models/document.model';
import { DocumentService } from '../../../../core/services/document.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import * as actions from '../actions/document.actions';
import { map, concatMap, mergeMap, catchError } from 'rxjs/operators';

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

  @Effect()
  public archiveDocument$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ARCHIVE_DOCUMENT),
    map((action: actions.ArchiveDocumentAction) => action.payload),
    mergeMap(documentToArchive => {
      return this.documentService.archive(documentToArchive.id).pipe(
        mergeMap(() => [new actions.ArchiveDocumentSuccessAction()]),
        catchError(err => {
          return of(new actions.ArchiveDocumentErrorAction(documentToArchive));
        })
      );
    })
  );
}
