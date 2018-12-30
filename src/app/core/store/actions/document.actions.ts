import { DocumentModel } from './../../models/document.model';
import * as actions from '../../../shared/state/base-crud.actions';

export type Actions = actions.CrudActions<DocumentModel>;
