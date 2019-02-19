import { DocumentModel } from '../../../../core/models/document.model';
import { BaseEntityState } from '../../../../shared/state/base-entity.state';
import * as actions from '../actions/document.actions';
import { baseReducer } from 'src/app/shared/state/base-entity.reducer';
import { Map } from 'immutable';
import { CrudActions } from 'src/app/shared/state/base-crud.actions';

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
  action: actions.DocumentActions
): DocumentState {
  if (!action) {
    return state;
  }

  state = baseReducer<DocumentModel, number>(
    DocumentModel,
    state,
    action as CrudActions<DocumentModel, number>
  );

  if (action.type === actions.ARCHIVE_DOCUMENT_SUCCESS) {
    action = action as actions.ArchiveDocumentAction;
    return { ...state, entities: state.entities.remove(action.payload.id) };
  }

  if (action.type === actions.ARCHIVE_DOCUMENT_ERROR) {
    action = action as actions.ArchiveDocumentErrorAction;
    return {
      ...state,
      entities: state.entities.set(action.payload.id, action.payload)
    };
  }

  return state;
}
