import { DocumentService } from './../../services/document.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as actions from '../actions/document-raw.actions';
@Injectable()
export class DocumentRawEffects {
  constructor(
    private actions$: Actions,
    private documentService: DocumentService
  ) {}

  @Effect() getById$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_BY_ID),
    map((action: actions.GetByIdAction) => action.payload),
    mergeMap((id: number | string) => {
      return this.documentService.get(id).pipe(
        map(resp => {
          return new actions.GetByIdSuccessAction(resp);
        }),
        catchError(error => of(new actions.GetByIdFailAction(error)))
      );
    })
  );
}
