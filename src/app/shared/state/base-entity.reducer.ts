import { BaseEntity } from '../models/base-entity.model';
import { BaseEntityState } from './base-entity.state';

import * as crudActions from './base-crud.actions';
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

  switch (action.type) {
    case crudActions.GetByIdAction.getType<TEntity, TKey>(type):
      return { ...state, loading: true };

    case crudActions.GetByIdSuccessAction.getType<TEntity, TKey>(type):
      action = action as crudActions.GetByIdSuccessAction<TEntity, TKey>;
      return {
        ...state,
        loading: false,
        entities: state.entities.set(action.payload.id, action.payload)
      };

    case crudActions.GetByIdErrorAction.getType(type):
      return { ...state, loading: false };

    case crudActions.CreateAction.getType(type):
      action = action as crudActions.CreateAction<TEntity, TKey>;
      return {
        ...state,
        entities: state.entities.set(action.payload.id, action.payload)
      };

    case crudActions.CreateSuccessAction.getType(type):
      action = action as crudActions.CreateSuccessAction<TEntity, TKey>;
      return {
        ...state,
        entities: state.entities
          .delete(action.payload.tempId)
          .set(action.payload.createdEntity.id, action.payload.createdEntity)
      };

    case crudActions.CreateErrorAction.getType(type):
      action = action as crudActions.CreateErrorAction<TEntity, TKey>;

      return {
        ...state,
        entities: state.entities.delete(action.payload)
      };

    case crudActions.UpdateAction.getType(type):
      action = action as crudActions.UpdateAction<TEntity, TKey>;
      return {
        ...state,
        entities: state.entities.set(
          action.payload.newEntity.id,
          action.payload.newEntity
        )
      };
    case crudActions.UpdateSuccessAction.getType(type):
      action = action as crudActions.UpdateSuccessAction<TEntity, TKey>;

      return {
        ...state,
        entities: state.entities.set(action.payload.id, action.payload)
      };
    case crudActions.UpdateErrorAction.getType(type):
      action = action as crudActions.UpdateErrorAction<TEntity, TKey>;

      return {
        ...state,
        entities: state.entities.set(action.payload.id, action.payload)
      };
    case crudActions.DeleteAction.getType(type):
      action = action as crudActions.DeleteAction<TEntity, TKey>;
      return {
        ...state,
        entities: state.entities.delete(action.payload.id)
      };
    case crudActions.DeleteErrorAction.getType(type):
      action = action as crudActions.DeleteErrorAction<TEntity, TKey>;

      return {
        ...state,
        entities: state.entities.set(action.payload.id, action.payload)
      };

    default:
      return state;
  }
}
