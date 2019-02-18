import { DocumentModel } from './../../../../core/models/document.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DocumentState,
  DocumentFeatureState
} from '../reducers/document.reducer';
import { getTypeName } from 'src/app/shared/state/base-crud.actions';

const getDocuments = (state: DocumentState) => state.entities;
const getLoading = (state: DocumentState) => state.loading;

export const documentFeatureState = createFeatureSelector<DocumentFeatureState>(
  getTypeName(DocumentModel)
);

export const documentState = createSelector(
  documentFeatureState,
  state => state.document
);

export const getDocumentLoading = createSelector(
  documentState,
  getLoading
);

export const getDocumentEntities = createSelector(
  documentState,
  getDocuments
);
