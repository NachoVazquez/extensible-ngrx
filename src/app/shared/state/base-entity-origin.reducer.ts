import { BaseEntity } from '../models/base-entity.model';
import { BaseEntityState } from './base-entity.state';

import * as crudActions from './base-crud-origin.actions';
import { DocumentModel } from 'src/app/core/models/document.model';

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

  switch (true) {
    case action.type.includes(
      crudActions.GetByIdAction.getContextlessType<TEntity, TKey>(type)
    ):
      return { ...state, loading: true };

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
      crudActions.GetByIdErrorAction.getContextlessType(type)
    ):
      return { ...state, loading: false };

    case action.type.includes(
      crudActions.CreateAction.getContextlessType(type)
    ):
      action = action as crudActions.CreateAction<TEntity, TKey>;
      return {
        ...state,
        entities: state.entities.set(action.payload.id, action.payload)
      };

    case action.type.includes(
      crudActions.CreateSuccessAction.getContextlessType(type)
    ):
      action = action as crudActions.CreateSuccessAction<TEntity, TKey>;
      return {
        ...state,
        entities: state.entities
          .delete(action.payload.tempId)
          .set(action.payload.createdEntity.id, action.payload.createdEntity)
      };

    case action.type.includes(
      crudActions.CreateErrorAction.getContextlessType(type)
    ):
      action = action as crudActions.CreateErrorAction<TEntity, TKey>;

      return {
        ...state,
        entities: state.entities.delete(action.payload)
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
        )
      };
    case action.type.includes(
      crudActions.UpdateSuccessAction.getContextlessType(type)
    ):
      action = action as crudActions.UpdateSuccessAction<TEntity, TKey>;

      return {
        ...state,
        entities: state.entities.set(action.payload.id, action.payload)
      };
    case action.type.includes(
      crudActions.UpdateErrorAction.getContextlessType(type)
    ):
      action = action as crudActions.UpdateErrorAction<TEntity, TKey>;

      return {
        ...state,
        entities: state.entities.set(action.payload.id, action.payload)
      };
    case action.type.includes(
      crudActions.DeleteAction.getContextlessType(type)
    ):
      action = action as crudActions.DeleteAction<TEntity, TKey>;
      return {
        ...state,
        entities: state.entities.delete(action.payload.id)
      };
    case action.type.includes(
      crudActions.DeleteErrorAction.getContextlessType(type)
    ):
      action = action as crudActions.DeleteErrorAction<TEntity, TKey>;

      return {
        ...state,
        entities: state.entities.set(action.payload.id, action.payload)
      };

    default:
      return state;
  }
}
