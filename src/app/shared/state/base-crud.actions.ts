import { Action } from '@ngrx/store';
import { BaseCrudActionTypeNameFactory } from './base-crud-typename-factory';

export class GetByIdAction<T> implements Action {
  public readonly type: string;
  /**
   * Creates an instance of GetByIdAction.
   * @param type The entity clazz
   * @param payload Id of the entity to look up.
   */
  constructor(type: new () => T, public payload: any) {
    this.type = new BaseCrudActionTypeNameFactory(type).GetById;
  }
}

export class GetByIdSuccessAction<T> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of GetByIdSuccessAction.
   * @param  type The entity clazz
   * @param  payload The fetched entity instance from server containing the requested properties.
   */
  constructor(type: new () => T, public payload: T) {
    this.type = new BaseCrudActionTypeNameFactory(type).GetByIdSuccess;
  }
}

export class GetByIdFailAction<T> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of GetByIdFailedAction.
   * @param type The entity clazz
   * @param  payload The error.
   */
  constructor(type: new () => T, public payload: any) {
    this.type = new BaseCrudActionTypeNameFactory(type).GetById;
  }
}

export type CrudActions<T> =
  | GetByIdAction<T>
  | GetByIdSuccessAction<T>
  | GetByIdFailAction<T>;
