import { BaseEntity } from 'src/app/shared/models/base-entity.model';
import { CustomError } from './../error-handling/custom-error';
import { Action } from '@ngrx/store';

export function getTypeName<TEntity extends BaseEntity<TKey>, TKey>(type: {
  new (): TEntity;
}): string {
  // Necessary tight coupling
  return new type().constructor.name;
}

export class GetByIdAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = GetByIdAction.getType<TEntity, TKey>(this.entityType);
  /**
   * Creates an instance of GetByIdAction.
   * @param entityType The entity clazz
   * @param payload Id of the entity to look up.
   */
  constructor(
    private entityType: new () => TEntity,
    public readonly payload: TKey
  ) {}

  static getType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `[${typeName}] Get By id`;
  }
}

export class GetByIdSuccessAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = GetByIdSuccessAction.getType<TEntity, TKey>(this.entityType);

  /**
   * Creates an instance of GetByIdSuccessAction.
   * @param  entityType The entity clazz
   * @param  payload The entity instance fetched from server containing the requested properties.
   */
  constructor(
    private entityType: new () => TEntity,
    public readonly payload: TEntity
  ) {}

  static getType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `[${typeName}] Get By id Success`;
  }
}

export class GetByIdErrorAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = GetByIdErrorAction.getType<TEntity, TKey>(this.entityType);

  /**
   * Creates an instance of GetByIdErrorAction.
   * @param type The entity clazz
   * @param  payload The error.
   */
  constructor(
    private entityType: new () => TEntity,
    public readonly payload: CustomError
  ) {}
  static getType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `[${typeName}] Get By id Error`;
  }
}

export class GetAllAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = GetAllAction.getType<TEntity, TKey>(this.entityType);
  public readonly payload: void;
  constructor(private entityType: new () => TEntity) {}

  static getType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `[${typeName}] Get All`;
  }
}

export class GetAllSuccessAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = GetAllSuccessAction.getType<TEntity, TKey>(this.entityType);
  /**
   * Creates an instance of GetAllSuccessAction.
   * @param type The entity clazz
   * @param payload The fetched elements
   */
  constructor(
    private entityType: new () => TEntity,
    public readonly payload: TEntity[]
  ) {}

  static getType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `[${typeName}] Get All Success`;
  }
}

export class GetAllErrorAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = GetAllErrorAction.getType<TEntity, TKey>(this.entityType);

  constructor(
    private entityType: new () => TEntity,
    public readonly payload: CustomError
  ) {}

  static getType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `[${typeName}] Get All Error`;
  }
}

export class CreateAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = CreateAction.getType<TEntity, TKey>(this.entityType);

  /**
   * Creates an instance of CreateAction.
   * @param  type The entity clazz
   * @param  payload Contains the entity to create
   */
  constructor(private entityType: new () => TEntity, public payload: TEntity) {}

  static getType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `[${typeName}] Create`;
  }
}

export class CreateSuccessAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = CreateSuccessAction.getType<TEntity, TKey>(this.entityType);

  /**
   * Creates an instance of CreateSuccessAction.
   * @param  type The entity clazz
   * @param  payload Contains the preassign id of the entity
   *  to be created (optimistic creation) and the entity created.
   */
  constructor(
    private entityType: new () => TEntity,
    public payload: { tempId: string; createdEntity: TEntity }
  ) {}
  static getType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `[${typeName}] Create Success`;
  }
}

export class CreateErrorAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = CreateErrorAction.getType<TEntity, TKey>(this.entityType);

  /**
   * Creates an instance of CreateErrorAction.
   * @param type The entity clazz
   * @param payload preassign id (optimistic approach) of the entity that was intended to be created.
   */
  constructor(private entityType: new () => TEntity, public payload: string) {}

  static getType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `[${typeName}] Create Error`;
  }
}

export class UpdateAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = UpdateAction.getType<TEntity, TKey>(this.entityType);
  /**
   * Creates an instance of UpdateAction.
   * @param type The entity clazz
   * @param payload Contains the Entity to be updated with
   *  new values and the original entity.
   */
  constructor(
    private entityType: new () => TEntity,
    public payload: { oldEntity: TEntity; newEntity: TEntity }
  ) {}

  static getType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `[${typeName}] Update`;
  }
}

export class UpdateSuccessAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = UpdateSuccessAction.getType<TEntity, TKey>(this.entityType);

  /**
   * Creates an instance of UpdateSuccessAction.
   * @param type The entity clazz
   * @param payload The updated entity. We need it in case that it might occur some server side calculations
   */
  constructor(
    private entityType: new () => TEntity,
    public readonly payload: TEntity
  ) {}

  static getType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `[${typeName}] Update Success`;
  }
}

export class UpdateErrorAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = UpdateErrorAction.getType<TEntity, TKey>(this.entityType);
  /**
   * Creates an instance of UpdateErrorAction.
   * @param type The entity clazz
   * @param  payload Entity which updating Error containing original values (For optimistic approach)
   */
  constructor(private entityType: new () => TEntity, public payload: TEntity) {}

  static getType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `[${typeName}] Update Error`;
  }
}

export class DeleteAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = DeleteAction.getType<TEntity, TKey>(this.entityType);

  /**
   * Creates an instance of DeleteAction.
   * @param type The entity clazz
   * @param payload Contains the entity to delete.
   */
  constructor(
    private entityType: new () => TEntity,
    public payload: {
      entityToDelete: TEntity;
    }
  ) {}

  static getType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `[${typeName}] Delete`;
  }
}

export class DeleteSuccessAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = DeleteSuccessAction.getType<TEntity, TKey>(this.entityType);
  public readonly payload: void;

  /**
   * Creates an instance of DeleteSuccessAction.
   * @param type The entity clazz
   */
  constructor(private entityType: new () => TEntity) {}

  static getType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `[${typeName}] Delete Success`;
  }
}

export class DeleteErrorAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = DeleteErrorAction.getType<TEntity, TKey>(this.entityType);

  /**
   * Creates an instance of DeleteErrorAction.
   * @param type The entity clazz
   * @param payload The entity wish deletion failed (For the optimistic approach)
   */
  constructor(private entityType: new () => TEntity, public payload: TEntity) {}

  static getType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `[${typeName}] Delete Error`;
  }
}

export type CrudActions<TEntity extends BaseEntity<TKey>, TKey> =
  | CreateAction<TEntity, TKey>
  | CreateSuccessAction<TEntity, TKey>
  | CreateErrorAction<TEntity, TKey>
  | GetAllAction<TEntity, TKey>
  | GetAllErrorAction<TEntity, TKey>
  | GetAllSuccessAction<TEntity, TKey>
  | GetByIdAction<TEntity, TKey>
  | GetByIdSuccessAction<TEntity, TKey>
  | GetByIdErrorAction<TEntity, TKey>
  | UpdateAction<TEntity, TKey>
  | UpdateSuccessAction<TEntity, TKey>
  | UpdateErrorAction<TEntity, TKey>
  | DeleteAction<TEntity, TKey>
  | DeleteSuccessAction<TEntity, TKey>
  | DeleteErrorAction<TEntity, TKey>;
