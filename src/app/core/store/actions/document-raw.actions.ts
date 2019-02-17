import { CustomError } from '../../../shared/error-handling/custom-error';
import { DocumentModel } from './../../models/document.model';
import { Action } from '@ngrx/store';

export const GET_BY_ID = '[DOCUMENT] Get By Id';
export const GET_BY_ID_SUCCESS = '[DOCUMENT] Get By Id Success';
export const GET_BY_ID_ERROR = '[DOCUMENT] Get By Id Error';

export class GetByIdAction implements Action {
  public readonly type = GET_BY_ID;

  constructor(public readonly payload: number | string) {}
}

export class GetByIdSuccessAction implements Action {
  public readonly type = GET_BY_ID_SUCCESS;

  constructor(public readonly payload: DocumentModel) {}
}

export class GetByIdFailAction implements Action {
  public readonly type = GET_BY_ID_ERROR;

  constructor(public readonly payload: CustomError) {}
}

export type Actions = GetByIdAction | GetByIdSuccessAction | GetByIdFailAction;
