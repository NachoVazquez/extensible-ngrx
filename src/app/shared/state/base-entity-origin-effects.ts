import { CustomError } from '../error-handling/custom-error';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, concatMap, filter } from 'rxjs/operators';
import { BaseEntity } from '../models/base-entity.model';
import { BaseCrudService } from '../services/base-crud.service';
import { Observable, of } from 'rxjs';

import * as crudActions from '../../shared/state/base-crud-origin.actions';

export abstract class BaseEntityEffects<
  TEntity extends BaseEntity<TKey>,
  TKey
> {
  private readonly httpResponseContext;
  constructor(
    protected type: new () => TEntity,
    protected actions$: Actions,
    protected baseService: BaseCrudService<TEntity, TKey>
  ) {
    this.httpResponseContext = `${crudActions.getTypeName(type)} API`;
  }

  public getEntityById$(): Observable<Action> {
    return this.actions$.pipe(
      filter(action =>
        action.type.includes(
          crudActions.GetByIdAction.getContextlessType<TEntity, TKey>(this.type)
        )
      ),
      map((action: crudActions.GetByIdAction<TEntity, TKey>) => {
        return action.payload;
      }),
      mergeMap((payload: TKey) => {
        if (payload) {
          return this.baseService.get(payload).pipe(
            map(resp => {
              return new crudActions.GetByIdSuccessAction<TEntity, TKey>(
                this.type,
                resp,
                this.httpResponseContext
              );
            }),
            catchError((error: CustomError) =>
              of(
                new crudActions.GetByIdErrorAction<TEntity, TKey>(
                  this.type,
                  error,
                  this.httpResponseContext
                )
              )
            )
          );
        }
      })
    );
  }

  public getAllEntities$(): Observable<Action> {
    return this.actions$.pipe(
      filter(action =>
        action.type.includes(
          crudActions.GetAllAction.getContextlessType<TEntity, TKey>(this.type)
        )
      ),
      mergeMap(() => {
        return this.baseService.getAll().pipe(
          map(resp => {
            return new crudActions.GetAllSuccessAction<TEntity, TKey>(
              this.type,
              resp,
              this.httpResponseContext
            );
          }),
          catchError((error: CustomError) =>
            of(
              new crudActions.GetAllErrorAction<TEntity, TKey>(
                this.type,
                error,
                this.httpResponseContext
              )
            )
          )
        );
      })
    );
  }

  public createEntity$(): Observable<Action> {
    return this.actions$.pipe(
      filter(action =>
        action.type.includes(
          crudActions.CreateAction.getContextlessType<TEntity, TKey>(this.type)
        )
      ),
      map((action: crudActions.CreateAction<TEntity, TKey>) => action.payload),
      mergeMap(payload => {
        return this.baseService.create(payload).pipe(
          mergeMap((entityCreated: TEntity) => [
            new crudActions.CreateSuccessAction<TEntity, TKey>(
              this.type,
              {
                tempId: payload.tempId,
                createdEntity: entityCreated
              },
              this.httpResponseContext
            )
          ]),
          catchError(err => {
            return of(
              new crudActions.CreateErrorAction<TEntity, TKey>(
                this.type,
                payload.tempId,
                this.httpResponseContext
              )
            );
          })
        );
      })
    );
  }

  public updateEntity$(): Observable<Action> {
    return this.actions$.pipe(
      filter(action =>
        action.type.includes(
          crudActions.UpdateAction.getContextlessType<TEntity, TKey>(this.type)
        )
      ),
      map((action: crudActions.UpdateAction<TEntity, TKey>) => action.payload),
      concatMap(payload => {
        return this.baseService
          .update(payload.newEntity.id, payload.newEntity)
          .pipe(
            map(
              updatedEntity =>
                new crudActions.UpdateSuccessAction<TEntity, TKey>(
                  this.type,
                  updatedEntity,
                  this.httpResponseContext
                )
            ),
            catchError(err =>
              of(
                new crudActions.UpdateErrorAction<TEntity, TKey>(
                  this.type,
                  payload.oldEntity,
                  this.httpResponseContext
                )
              )
            )
          );
      })
    );
  }

  public deleteEntity$(): Observable<Action> {
    return this.actions$.pipe(
      filter(action =>
        action.type.includes(
          crudActions.DeleteAction.getContextlessType<TEntity, TKey>(this.type)
        )
      ),
      map((action: crudActions.DeleteAction<TEntity, TKey>) => action.payload),
      mergeMap(entityToDelete => {
        return this.baseService.delete(entityToDelete.id).pipe(
          mergeMap(() => [
            new crudActions.DeleteSuccessAction(
              this.type,
              this.httpResponseContext
            )
          ]),
          catchError(err => {
            return of(
              new crudActions.DeleteErrorAction<TEntity, TKey>(
                this.type,
                entityToDelete,
                this.httpResponseContext
              )
            );
          })
        );
      })
    );
  }
}
