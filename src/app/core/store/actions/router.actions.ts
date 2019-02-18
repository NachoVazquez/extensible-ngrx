import { Action } from '@ngrx/store';
import { RouteModel } from '../../models/route.model';
export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';
export const NAVIGATION_FAILED = '[Router] Navigation Failed';
export const NAVIGATION_SUCCESS = '[Router] Navigation Success';

/**
 * Router Actions
 */
export class GoAction implements Action {
  public readonly type = GO;

  constructor(public payload: RouteModel) {}
}

// tslint:disable-next-line:max-classes-per-file
export class BackAction implements Action {
  public readonly type = BACK;
}

// tslint:disable-next-line:max-classes-per-file
export class ForwardAction implements Action {
  public readonly type = FORWARD;
}

// tslint:disable-next-line:max-classes-per-file
export class NavigationSuccessAction implements Action {
  public readonly type = NAVIGATION_SUCCESS;
}

// tslint:disable-next-line:max-classes-per-file
export class NavigationFailedAction implements Action {
  public readonly type = NAVIGATION_FAILED;
}

// tslint:disable-next-line:max-line-length
export type Actions =
  | GoAction
  | BackAction
  | ForwardAction
  | NavigationSuccessAction
  | NavigationFailedAction;
