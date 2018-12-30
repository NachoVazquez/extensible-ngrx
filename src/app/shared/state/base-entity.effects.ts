import { Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as crudActions from '../../shared/state/base-crud.actions';
import { BaseEntity } from '../models/base-entity.model';
import { BaseCrudService } from '../services/base-crud.service';
import { BaseCrudActionTypeNameFactory } from './base-crud-typename-factory';
import { Observable, of } from 'rxjs';

export abstract class BaseEntityEffects<T extends BaseEntity<any>> {
  constructor(
    protected type: new () => T,
    protected actions$: Actions,
    protected baseService: BaseCrudService<T>
  ) {}

  public getEntityById$(): Observable<Action> {
    // Instantiation of the Action types based on current Entity
    const types: BaseCrudActionTypeNameFactory = new BaseCrudActionTypeNameFactory(
      this.type
    );

    return this.actions$.pipe(
      ofType(types.GetById),
      map((action: crudActions.GetByIdAction<T>) => {
        return action.payload;
      }),
      mergeMap(payload => {
        if (payload) {
          return this.baseService.get(payload.id).pipe(
            map(resp => {
              return new crudActions.GetByIdSuccessAction<T>(this.type, resp);
            }),
            catchError(error =>
              of(new crudActions.GetByIdFailAction<T>(this.type, error))
            )
          );
        }
      })
    );
  }
}
