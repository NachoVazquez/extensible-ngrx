import { Injectable } from '@angular/core';
import { baseEntityEffects } from 'src/app/shared/state/base-entity-eff-origin.effects';
import { DocumentModel } from '../../../../core/models/document.model';
import { DocumentService } from '../../../../core/services/document.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import * as actions from '../actions/document.actions';

@Injectable()
export class DocumentEffects {
  private baseActions;
  constructor(
    protected actions$: Actions<actions.DocumentActions>,
    protected documentService: DocumentService
  ) {
    this.baseActions = baseEntityEffects(
      DocumentModel,
      actions$,
      documentService
    );
  }

  @Effect()
  public getDocumentById$: Observable<
    Action
  > = this.baseActions.getEntityById$();
}
