import { BaseEntity } from '../models/base-entity.model';
import { BaseCrudActionTypeNameFactory } from './base-crud-typename-factory';
import { BaseEntityState } from './base-entity.state';

import * as crudActions from './base-crud.actions';

/**
 * Modify the state responding to CRUD Actions.
 *
 * @export
 * @param type Type of the entity which state is being manipulated
 * @param state State of the entity
 * @param action Dispatched Action
 * @returns New State
 */
export function baseReducer<T extends BaseEntity<string | number>>(
  type: new () => T,
  state: BaseEntityState<T>,
  action: crudActions.CrudActions<T>
): BaseEntityState<T> {
  // Instantiation of the Action types based on current Entity
  const actionTypes = new BaseCrudActionTypeNameFactory(type);

  if (!action) {
    return state;
  }

  switch (action.type) {
    case actionTypes.GetById:
      return { ...state, loading: true };

    case actionTypes.GetByIdSuccess:
      return {
        ...state,
        loading: false,
        entities: [...state.entities, action.payload]
      };

    case actionTypes.GetByIdFailed:
      return { ...state, loading: false };

    default:
      return state;
  }
}
