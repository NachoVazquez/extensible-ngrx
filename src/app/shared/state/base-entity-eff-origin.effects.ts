import { CustomError } from '../error-handling/custom-error';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, concatMap, filter } from 'rxjs/operators';
import { BaseEntity } from '../models/base-entity.model';
import { BaseCrudService } from '../services/base-crud.service';
import { Observable, of } from 'rxjs';

import * as crudActions from './base-crud-origin.actions';

export function baseEntityEffects<TEntity extends BaseEntity<TKey>, TKey>(
  type: new () => TEntity,
  actions$: Actions,
  baseService: BaseCrudService<TEntity, TKey>
) {
  const httpResponseContext = `${crudActions.getTypeName(type)}/API`;

  return {
    getEntityById$(): Observable<Action> {
      return actions$.pipe(
        filter(action =>
          action.type.includes(
            crudActions.GetByIdAction.getContextlessType<TEntity, TKey>(type)
          )
        ),
        map((action: crudActions.GetByIdAction<TEntity, TKey>) => {
          return action.payload;
        }),
        mergeMap((payload: TKey) => {
          if (payload) {
            return baseService.get(payload).pipe(
              map(resp => {
                return new crudActions.GetByIdSuccessAction<TEntity, TKey>(
                  type,
                  resp,
                  httpResponseContext
                );
              }),
              catchError((error: CustomError) =>
                of(
                  new crudActions.GetByIdFailureAction<TEntity, TKey>(
                    type,
                    error,
                    httpResponseContext
                  )
                )
              )
            );
          }
        })
      );
    }
  };
}
