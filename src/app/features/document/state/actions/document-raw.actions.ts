import { CustomError } from '../../../../shared/error-handling/custom-error';
import { DocumentModel } from '../../../../core/models/document.model';
import { Action } from '@ngrx/store';

export const GET_BY_ID_RAW = '[DOCUMENT] Get By Id';
export const GET_BY_ID_SUCCESS_RAW = '[DOCUMENT] Get By Id Success';
export const GET_BY_ID_ERROR_RAW = '[DOCUMENT] Get By Id Error';

export const GET_ALL_RAW = '[DOCUMENT] Get All';
export const GET_ALL_SUCCESS_RAW = '[DOCUMENT] Get All Success';
export const GET_ALL_ERROR_RAW = '[DOCUMENT] Get All Error';

export class GetByIdRawAction implements Action {
  public readonly type = GET_BY_ID_RAW;

  constructor(public readonly payload: number) {}
}

export class GetByIdSuccessRawAction implements Action {
  public readonly type = GET_BY_ID_SUCCESS_RAW;

  constructor(public readonly payload: DocumentModel) {}
}

export class GetByIdErrorRawAction implements Action {
  public readonly type = GET_BY_ID_ERROR_RAW;

  constructor(public readonly payload: CustomError) {}
}

export class GetAllRawAction implements Action {
  public readonly type = GET_BY_ID_RAW;
  public readonly payload: void;

  constructor() {}
}

export class GetAllSuccessRawAction implements Action {
  public readonly type = GET_BY_ID_SUCCESS_RAW;

  constructor(public readonly payload: DocumentModel[]) {}
}

export class GetAllErrorRawAction implements Action {
  public readonly type = GET_BY_ID_ERROR_RAW;

  constructor(public readonly payload: CustomError) {}
}

export type Actions =
  | GetByIdRawAction
  | GetByIdSuccessRawAction
  | GetByIdErrorRawAction
  | GetAllRawAction
  | GetAllSuccessRawAction
  | GetAllErrorRawAction;
