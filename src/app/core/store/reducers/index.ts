import * as fromDocument from './document.reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';

export interface State {
  document: fromDocument.State;
}

export const reducers: ActionReducerMap<State> = {
  document: fromDocument.reducer
};

//#region Selectors

// Document Selectors
export const getDocumentState = (state: State) => state.document;

export const getDocumentLoading = createSelector(
  getDocumentState,
  fromDocument.getLoading
);

export const getDocumentList = createSelector(
  getDocumentState,
  fromDocument.getDocuments
);

//#endregion
