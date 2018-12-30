import { DocumentModel } from './../../models/document.model';
import { Action } from '@ngrx/store';

export const GET_BY_ID = '[DOCUMENT] Get By Id';
export const GET_BY_ID_SUCCESS = '[DOCUMENT] Get By Id Success';
export const GET_BY_ID_FAIL = '[DOCUMENT] Get By Id Fail';

export class GetByIdAction implements Action {
  public readonly type = GET_BY_ID;

  constructor(public payload: number) {}
}

export class GetByIdSuccessAction implements Action {
  public readonly type = GET_BY_ID_SUCCESS;

  constructor(public payload: DocumentModel) {}
}

export class GetByIdFailAction implements Action {
  public readonly type = GET_BY_ID_FAIL;

  constructor(public payload: any) {}
}

export type Actions = GetByIdAction | GetByIdSuccessAction | GetByIdFailAction;
