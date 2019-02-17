import { DocumentModel } from './../../models/document.model';
import * as actions from '../actions/document-raw.actions';

export interface State {
  loading: boolean;
  documents: DocumentModel[];
}

const INITIAL_STATE: State = {
  loading: false,
  documents: []
};

export function reducer(state = INITIAL_STATE, action: actions.Actions): State {
  // A protection for null or undefined actions.
  // Trust me can happen and cause pain.
  if (!action) {
    return state;
  }

  switch (action.type) {
    case actions.GET_BY_ID: {
      return { ...state, loading: true };
    }
    case actions.GET_BY_ID_SUCCESS: {
      return {
        ...state,
        loading: false,
        documents: [...state.documents, action.payload]
      };
    }

    case actions.GET_BY_ID_ERROR: {
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

// Selectors
export const getLoading = (state: State) => state.loading;
export const getDocuments = (state: State) => state.documents;
