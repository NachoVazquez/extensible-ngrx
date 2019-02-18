import { DocumentModel } from '../../../../core/models/document.model';
import { BaseEntityState } from '../../../../shared/state/base-entity.state';
import * as actions from '../actions/document.actions';
import { baseReducer } from 'src/app/shared/state/base-entity.reducer';
import { Map } from 'immutable';

export interface DocumentFeatureState {
  document: DocumentState;
}

export interface DocumentState extends BaseEntityState<DocumentModel, number> {}

const INITIAL_STATE: DocumentState = {
  loading: false,
  entities: Map()
};

export function reducer(
  state: DocumentState = INITIAL_STATE,
  action: actions.Actions
): DocumentState {
  if (!action) {
    return state;
  }

  state = baseReducer<DocumentModel, number>(DocumentModel, state, action);

  return state;
}
