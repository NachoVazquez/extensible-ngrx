import { DocumentModel } from './../../models/document.model';
import { BaseEntityState } from './../../../shared/state/base-entity.state';
import * as actions from '../actions/document.actions';
import { baseReducer } from 'src/app/shared/state/base-entity.reducer';

export interface State extends BaseEntityState<DocumentModel> {}

const INITIAL_STATE: State = {
  loading: false,
  entities: []
};

export function reducer(
  state: State = INITIAL_STATE,
  action: actions.Actions
): State {
  if (!action) {
    return state;
  }

  state = baseReducer<DocumentModel>(DocumentModel, state, action);

  return state;
}

export const getDocuments = (state: State) => state.entities;
export const getLoading = (state: State) => state.loading;
