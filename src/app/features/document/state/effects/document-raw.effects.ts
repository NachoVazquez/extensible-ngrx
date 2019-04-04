import { DocumentService } from '../../../../core/services/document.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as actions from '../actions/document-raw.actions';
@Injectable()
export class DocumentRawEffects {
  constructor(
    private actions$: Actions<actions.DocumentActions>,
    private documentService: DocumentService
  ) {}

  @Effect() getById$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_BY_ID_RAW),
    map((action: actions.GetByIdRawAction) => action.payload),
    mergeMap((id: number) => {
      return this.documentService.get(id).pipe(
        map(resp => {
          return new actions.GetByIdSuccessRawAction(resp);
        }),
        catchError(error => of(new actions.GetByIdErrorRawAction(error)))
      );
    })
  );

  @Effect() geAll$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_ALL_RAW),
    mergeMap(() => {
      return this.documentService.getAll().pipe(
        map(resp => {
          return new actions.GetAllSuccessRawAction(resp);
        }),
        catchError(error => of(new actions.GetAllErrorRawAction(error)))
      );
    })
  );
}
