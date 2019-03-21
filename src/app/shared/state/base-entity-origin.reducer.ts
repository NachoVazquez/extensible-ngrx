import { BaseEntity } from '../models/base-entity.model';
import { BaseEntityState } from './base-entity.state';

import * as crudActions from './base-crud-origin.actions';

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
  if (!action || !action.type) {
    return state;
  }

  switch (true) {
    case action.type.includes(
      crudActions.GetByIdSuccessAction.getContextlessType<TEntity, TKey>(type)
    ):
      action = action as crudActions.GetByIdSuccessAction<TEntity, TKey>;
      return {
        ...state,
        loading: false,
        entities: state.entities.set(action.payload.id, action.payload)
      };

    case action.type.includes(
      crudActions.GetByIdFailureAction.getContextlessType(type)
    ):
    case action.type.includes(
      crudActions.GetAllFailureAction.getContextlessType(type)
    ):
    case action.type.includes(
      crudActions.DeleteSuccessAction.getContextlessType(type)
    ):
      return { ...state, loading: false };

    case action.type.includes(
      crudActions.GetAllSuccessAction.getContextlessType<TEntity, TKey>(type)
    ):
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

    case action.type.includes(
      crudActions.GetByIdAction.getContextlessType<TEntity, TKey>(type)
    ):
    case action.type.includes(
      crudActions.GetAllAction.getContextlessType<TEntity, TKey>(type)
    ):
      return { ...state, loading: true };

    case action.type.includes(
      crudActions.CreateSuccessAction.getContextlessType(type)
    ):
      action = action as crudActions.CreateSuccessAction<TEntity, TKey>;
      return {
        ...state,
        entities: state.entities
          .delete(action.payload.tempId)
          .set(action.payload.createdEntity.id, action.payload.createdEntity),
        loading: false
      };

    case action.type.includes(
      crudActions.CreateFailureAction.getContextlessType(type)
    ):
      action = action as crudActions.CreateFailureAction<TEntity, TKey>;

      return {
        ...state,
        entities: state.entities.delete(action.payload),
        loading: false
      };

    case action.type.includes(
      crudActions.CreateAction.getContextlessType(type)
    ):
      action = action as crudActions.CreateAction<TEntity, TKey>;
      return {
        ...state,
        entities: state.entities.set(action.payload.tempId, action.payload),
        loading: true
      };

    case action.type.includes(
      crudActions.UpdateSuccessAction.getContextlessType(type)
    ):
      action = action as crudActions.UpdateSuccessAction<TEntity, TKey>;

      return {
        ...state,
        entities: state.entities.set(action.payload.id, action.payload),
        loading: false
      };

    case action.type.includes(
      crudActions.UpdateFailureAction.getContextlessType(type)
    ):
      action = action as crudActions.UpdateFailureAction<TEntity, TKey>;

      return {
        ...state,
        entities: state.entities.set(action.payload.id, action.payload),
        loading: false
      };

    case action.type.includes(
      crudActions.UpdateAction.getContextlessType(type)
    ):
      action = action as crudActions.UpdateAction<TEntity, TKey>;
      return {
        ...state,
        entities: state.entities.set(
          action.payload.newEntity.id,
          action.payload.newEntity
        ),
        loading: true
      };

    case action.type.includes(
      crudActions.DeleteFailureAction.getContextlessType(type)
    ):
      action = action as crudActions.DeleteFailureAction<TEntity, TKey>;

      return {
        ...state,
        entities: state.entities.set(action.payload.id, action.payload),
        loading: false
      };

    case action.type.includes(
      crudActions.DeleteAction.getContextlessType(type)
    ):
      action = action as crudActions.DeleteAction<TEntity, TKey>;
      return {
        ...state,
        entities: state.entities.delete(action.payload.id),
        loading: true
      };

    default:
      return state;
  }
}
