import { BaseEntity } from '../models/base-entity.model';
import { BaseEntityState } from './base-entity.state';

import * as crudActions from './base-crud.actions';

import { Map } from 'immutable';

/**
 * Modify the state responding to CRUD Actions.
 *
 * @export
 * @param type Type of the entity which state is being manipulated
 * @param state State of the entity
 * @param action Dispatched Action
 * @returns New State
 */
export function baseReducer<TEntity extends BaseEntity<TKey>, TKey>(
  type: new () => TEntity,
  state: BaseEntityState<TEntity, TKey>,
  action: crudActions.CrudActions<TEntity, TKey>
): BaseEntityState<TEntity, TKey> {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case crudActions.GetByIdAction.getType<TEntity, TKey>(type):
    case crudActions.GetAllAction.getType<TEntity, TKey>(type):
      return { ...state, loading: true };

    case crudActions.GetByIdSuccessAction.getType<TEntity, TKey>(type):
      action = action as crudActions.GetByIdSuccessAction<TEntity, TKey>;
      return {
        ...state,
        loading: false,
        entities: state.entities.set(action.payload.id, action.payload)
      };

    case crudActions.GetByIdFailureAction.getType(type):
    case crudActions.GetAllFailureAction.getType(type):
    case crudActions.DeleteSuccessAction.getType(type):
      return { ...state, loading: false };

    case crudActions.GetAllSuccessAction.getType<TEntity, TKey>(type):
      action = action as crudActions.GetAllSuccessAction<TEntity, TKey>;
      return {
        ...state,
        loading: false,
        entities: state.entities.merge(
          action.payload.reduce((acc, curr) => {
            return acc.set(curr.id, curr);
          }, Map<TKey, TEntity>())
        )
      };

    case crudActions.CreateAction.getType(type):
      action = action as crudActions.CreateAction<TEntity, TKey>;
      return {
        ...state,
        entities: state.entities.set(action.payload.tempId, action.payload),
        loading: true
      };

    case crudActions.CreateSuccessAction.getType(type):
      action = action as crudActions.CreateSuccessAction<TEntity, TKey>;
      return {
        ...state,
        entities: state.entities
          .delete(action.payload.tempId)
          .set(action.payload.createdEntity.id, action.payload.createdEntity),
        loading: false
      };

    case crudActions.CreateFailureAction.getType(type):
      action = action as crudActions.CreateFailureAction<TEntity, TKey>;

      return {
        ...state,
        entities: state.entities.delete(action.payload),
        loading: false
      };

    case crudActions.UpdateAction.getType(type):
      action = action as crudActions.UpdateAction<TEntity, TKey>;
      return {
        ...state,
        entities: state.entities.set(
          action.payload.newEntity.id,
          action.payload.newEntity
        ),
        loading: true
      };

    case crudActions.UpdateSuccessAction.getType(type):
      action = action as crudActions.UpdateSuccessAction<TEntity, TKey>;

      return {
        ...state,
        entities: state.entities.set(action.payload.id, action.payload),
        loading: false
      };

    case crudActions.UpdateFailureAction.getType(type):
      action = action as crudActions.UpdateFailureAction<TEntity, TKey>;

      return {
        ...state,
        entities: state.entities.set(action.payload.id, action.payload),
        loading: false
      };

    case crudActions.DeleteAction.getType(type):
      action = action as crudActions.DeleteAction<TEntity, TKey>;
      return {
        ...state,
        entities: state.entities.delete(action.payload.id),
        loading: true
      };

    case crudActions.DeleteFailureAction.getType(type):
      action = action as crudActions.DeleteFailureAction<TEntity, TKey>;

      return {
        ...state,
        entities: state.entities.set(action.payload.id, action.payload),
        loading: false
      };

    default:
      return state;
  }
}
