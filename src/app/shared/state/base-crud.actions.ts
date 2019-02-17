import { CustomError } from './../error-handling/custom-error';
import { Action } from '@ngrx/store';
import { BaseCrudActionTypeNameFactory } from './base-crud-typename-factory';

export class GetByIdAction<TEntity, TKey> implements Action {
  public readonly type: string;
  /**
   * Creates an instance of GetByIdAction.
   * @param type The entity clazz
   * @param payload Id of the entity to look up.
   */
  constructor(type: new () => TEntity, public readonly payload: TKey) {
    this.type = new BaseCrudActionTypeNameFactory(type).GetById;
  }
}

export class GetByIdSuccessAction<TEntity> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of GetByIdSuccessAction.
   * @param  type The entity clazz
   * @param  payload The entity instance fetched from server containing the requested properties.
   */
  constructor(type: new () => TEntity, public readonly payload: TEntity) {
    this.type = new BaseCrudActionTypeNameFactory(type).GetByIdSuccess;
  }
}

export class GetByIdErrorAction<TEntity> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of GetByIdErrorAction.
   * @param type The entity clazz
   * @param  payload The error.
   */
  constructor(type: new () => TEntity, public readonly payload: CustomError) {
    this.type = new BaseCrudActionTypeNameFactory(type).GetById;
  }
}

export class GetAllAction<TEntity> implements Action {
  public readonly type: string;
  public readonly payload = null;
  constructor(type: new () => TEntity) {
    this.type = new BaseCrudActionTypeNameFactory(type).GetAll;
  }
}

export class GetAllSuccessAction<TEntity> implements Action {
  public readonly type: string;
  /**
   * Creates an instance of GetAllSuccessAction.
   * @param type The entity clazz
   * @param payload The fetched elements
   */
  constructor(type: new () => TEntity, public readonly payload: TEntity[]) {
    this.type = new BaseCrudActionTypeNameFactory(type).GetAllSuccess;
  }
}

export class GetAllErrorAction<TEntity> implements Action {
  public readonly type: string;
  public readonly payload: void;

  constructor(type: new () => TEntity) {
    this.type = new BaseCrudActionTypeNameFactory(type).GetAllError;
  }
}

export class CreateAction<TEntity> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of CreateAction.
   * @param  type The entity clazz
   * @param  payload Contains the entity to create
   */
  constructor(
    type: new () => TEntity,
    public payload: { entityToCreate: TEntity }
  ) {
    this.type = new BaseCrudActionTypeNameFactory(type).Create;
  }
}

export class CreateSuccessAction<TEntity> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of CreateSuccessAction.
   * @param  type The entity clazz
   * @param  payload Contains the preassign id of the entity
   *  to be created (optimistic creation) and the entity created.
   */
  constructor(
    type: new () => TEntity,
    public payload: { oldId: number | string; createdEntity: TEntity }
  ) {
    this.type = new BaseCrudActionTypeNameFactory(type).CreateSuccess;
  }
}

export class CreateErrorAction<TEntity> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of CreateErrorAction.
   * @param type The entity clazz
   * @param payload preassign id (optimistic approach) of the entity that was intended to be created.
   */
  constructor(type: new () => TEntity, public payload: any) {
    this.type = new BaseCrudActionTypeNameFactory(type).CreateError;
  }
}

export class UpdateAction<TEntity> implements Action {
  public readonly type: string;
  /**
   * Creates an instance of UpdateAction.
   * @param type The entity clazz
   * @param payload Contains the Entity to be updated with
   *  new values and the original entity.
   */
  constructor(
    type: new () => TEntity,
    public payload: { oldEntity: TEntity; newEntity: TEntity }
  ) {
    this.type = new BaseCrudActionTypeNameFactory(type).Update;
  }
}

export class UpdateSuccessAction<TEntity> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of UpdateSuccessAction.
   * @param type The entity clazz
   * @param payload The updated entity
   */
  constructor(type: new () => TEntity, public readonly payload: TEntity) {
    this.type = new BaseCrudActionTypeNameFactory(type).UpdateSuccess;
  }
}

export class UpdateErrorAction<TEntity> implements Action {
  public readonly type: string;
  /**
   * Creates an instance of UpdateErrorAction.
   * @param type The entity clazz
   * @param  payload Entity which updating Error containing original values (For optimistic approach)
   */
  constructor(type: new () => TEntity, public payload: TEntity) {
    this.type = new BaseCrudActionTypeNameFactory(type).UpdateError;
  }
}

export class DeleteAction<TEntity> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of DeleteAction.
   * @param type The entity clazz
   * @param payload Contains the entity to delete, the id of the owner entity which ordered its deletion
   * (strong dependent) and the type of the owner entity that ordered its deletion.
   */
  constructor(
    type: new () => TEntity,
    public payload: {
      entityToDelete: TEntity;
      ownerId: any;
      ownerType: new () => any;
    }
  ) {
    this.type = new BaseCrudActionTypeNameFactory(type).Delete;
  }
}

export class DeleteSuccessAction<TEntity> implements Action {
  public readonly type: string;
  public readonly payload: any = null;

  /**
   * Creates an instance of DeleteSuccessAction.
   * @param type The entity clazz
   */
  constructor(type: new () => TEntity) {
    this.type = new BaseCrudActionTypeNameFactory(type).DeleteSuccess;
  }
}

export class DeleteErrorAction<TEntity> implements Action {
  public readonly type: string;

  /**
   * Creates an instance of DeleteErrorAction.
   * @param type The entity clazz
   * @param payload The entity wish deletion Error (For the optimistic approach)
   */
  constructor(type: new () => TEntity, public payload: TEntity) {
    this.type = new BaseCrudActionTypeNameFactory(type).DeleteError;
  }
}

export type CrudActions<TEntity> =
  | CreateAction<TEntity>
  | CreateSuccessAction<TEntity>
  | CreateErrorAction<TEntity>
  | GetAllAction<TEntity>
  | GetAllErrorAction<TEntity>
  | GetAllSuccessAction<TEntity>
  | GetByIdAction<TEntity>
  | GetByIdSuccessAction<TEntity>
  | GetByIdErrorAction<TEntity>
  | UpdateAction<TEntity>
  | UpdateSuccessAction<TEntity>
  | UpdateErrorAction<TEntity>
  | DeleteAction<TEntity>
  | DeleteSuccessAction<TEntity>
  | DeleteErrorAction<TEntity>;
