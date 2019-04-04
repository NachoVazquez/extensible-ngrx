import { DocumentModel } from './../../../../core/models/document.model';
import * as actions from '../actions/document-raw.actions';
import { Map } from 'immutable';

export interface DocumentFeatureRawState {
  document: DocumentRawState;
}

export interface DocumentRawState {
  loading: boolean;
  documents: Map<number, DocumentModel>;
}

const INITIAL_STATE: DocumentRawState = {
  loading: false,
  documents: Map()
};

export function reducer(
  state = INITIAL_STATE,
  action: actions.DocumentActions
): DocumentRawState {
  // A protection for null or undefined actions.
  // Trust me can happen and cause pain.
  if (!action) {
    return state;
  }

  switch (action.type) {
    case actions.GET_BY_ID_RAW:
    case actions.GET_ALL_RAW:
      return { ...state, loading: true };

    case actions.GET_BY_ID_SUCCESS_RAW: {
      action = action as actions.GetByIdSuccessRawAction;
      return {
        ...state,
        loading: false,
        documents: state.documents.set(action.payload.id, action.payload)
      };
    }

    case actions.GET_BY_ID_ERROR_RAW: {
      return {
        ...state,
        loading: false
      };
    }

    default: {
      return state;
    }
  }
}
