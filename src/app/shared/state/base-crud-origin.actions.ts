import { BaseEntity } from 'src/app/shared/models/base-entity.model';
import { CustomError } from './../error-handling/custom-error';
import { Action } from '@ngrx/store';

export function getTypeName<TEntity extends BaseEntity<TKey>, TKey>(
  type: new () => TEntity
): string {
  // Necessary tight coupling
  return new type().constructor.name;
}

export class GetByIdAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = `[${this.context}] ${GetByIdAction.getContextlessType<
    TEntity,
    TKey
  >(this.entityType)}`;
  /**
   * Creates an instance of GetByIdAction.
   * @param entityType The entity clazz
   * @param payload Id of the entity to look up.
   */
  constructor(
    private entityType: new () => TEntity,
    public readonly payload: TKey,
    protected readonly context: string
  ) {}

  static getContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `Get ${typeName} By Id`;
  }
}

export class GetByIdSuccessAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = `[${this.context}] ${GetByIdSuccessAction.getContextlessType<
    TEntity,
    TKey
  >(this.entityType)}`;

  /**
   * Creates an instance of GetByIdSuccessAction.
   * @param  entityType The entity clazz
   * @param  payload The entity instance fetched from server containing the requested properties.
   */
  constructor(
    private entityType: new () => TEntity,
    public readonly payload: TEntity,
    protected context: string
  ) {}

  static getContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `Get ${typeName} By Id Success`;
  }
}

export class GetByIdFailureAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = `[${this.context}] ${GetByIdFailureAction.getContextlessType<
    TEntity,
    TKey
  >(this.entityType)}`;

  /**
   * Creates an instance of GetByIdFailureAction.
   * @param type The entity clazz
   * @param  payload The error.
   */
  constructor(
    private entityType: new () => TEntity,
    public readonly payload: CustomError,
    protected context: string
  ) {}
  static getContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `Get ${typeName} By Id Failure`;
  }
}

export class GetAllAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = `[${this.context}] ${GetAllAction.getContextlessType<
    TEntity,
    TKey
  >(this.entityType)}`;
  public readonly payload: void;
  constructor(
    private entityType: new () => TEntity,
    protected context: string
  ) {}

  static getContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `Get All ${typeName}`;
  }
}

export class GetAllSuccessAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = `[${this.context}] ${GetAllSuccessAction.getContextlessType<
    TEntity,
    TKey
  >(this.entityType)}`;
  /**
   * Creates an instance of GetAllSuccessAction.
   * @param type The entity clazz
   * @param payload The fetched elements
   */
  constructor(
    private entityType: new () => TEntity,
    public readonly payload: TEntity[],
    protected context: string
  ) {}

  static getContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `Get All ${typeName} Success`;
  }
}

export class GetAllFailureAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = `[${this.context}] ${GetAllFailureAction.getContextlessType<
    TEntity,
    TKey
  >(this.entityType)}`;

  constructor(
    private entityType: new () => TEntity,
    public readonly payload: CustomError,
    protected context: string
  ) {}

  static getContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `Get All ${typeName} Failure`;
  }
}

export class CreateAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = `[${this.context}] ${CreateAction.getContextlessType<
    TEntity,
    TKey
  >(this.entityType)}`;

  /**
   * Creates an instance of CreateAction.
   * @param  type The entity clazz
   * @param  payload Contains the entity to create
   */
  constructor(
    private entityType: new () => TEntity,
    public payload: TEntity,
    protected context: string
  ) {}

  static getContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `Create ${typeName}`;
  }
}

export class CreateSuccessAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = `[${this.context}] ${CreateSuccessAction.getContextlessType<
    TEntity,
    TKey
  >(this.entityType)}`;

  /**
   * Creates an instance of CreateSuccessAction.
   * @param  type The entity clazz
   * @param  payload Contains the preassign id of the entity
   *  to be created (optimistic creation) and the entity created.
   */
  constructor(
    private entityType: new () => TEntity,
    public payload: { tempId: string; createdEntity: TEntity },
    protected context: string
  ) {}
  static getContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `Create ${typeName} Success`;
  }
}

export class CreateFailureAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = `[${this.context}] ${CreateFailureAction.getContextlessType<
    TEntity,
    TKey
  >(this.entityType)}`;

  /**
   * Creates an instance of CreateFailureAction.
   * @param type The entity clazz
   * @param payload preassign id (optimistic approach) of the entity that was intended to be created.
   */
  constructor(
    private entityType: new () => TEntity,
    public payload: string,
    protected context: string
  ) {}

  static getContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `Create ${typeName} Failure`;
  }
}

export class UpdateAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = `[${this.context}] ${UpdateAction.getContextlessType<
    TEntity,
    TKey
  >(this.entityType)}`;
  /**
   * Creates an instance of UpdateAction.
   * @param type The entity clazz
   * @param payload Contains the Entity to be updated with
   *  new values and the original entity.
   */
  constructor(
    private entityType: new () => TEntity,
    public payload: { oldEntity: TEntity; newEntity: TEntity },
    protected context: string
  ) {}

  static getContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `Update ${typeName}`;
  }
}

export class UpdateSuccessAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = `[${this.context}] ${UpdateSuccessAction.getContextlessType<
    TEntity,
    TKey
  >(this.entityType)}`;

  /**
   * Creates an instance of UpdateSuccessAction.
   * @param type The entity clazz
   * @param payload The updated entity. We need it in case that it might occur some server side calculations
   */
  constructor(
    private entityType: new () => TEntity,
    public readonly payload: TEntity,
    protected context: string
  ) {}

  static getContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `Update ${typeName} Success`;
  }
}

export class UpdateFailureAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = `[${this.context}] ${UpdateFailureAction.getContextlessType<
    TEntity,
    TKey
  >(this.entityType)}`;
  /**
   * Creates an instance of UpdateFailureAction.
   * @param type The entity clazz
   * @param  payload Entity which updating Failure containing original values (For optimistic approach)
   */
  constructor(
    private entityType: new () => TEntity,
    public payload: TEntity,
    protected context: string
  ) {}

  static getContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `Update ${typeName} Failure`;
  }
}

export class DeleteAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = `[${this.context}] ${DeleteAction.getContextlessType<
    TEntity,
    TKey
  >(this.entityType)}`;

  /**
   * Creates an instance of DeleteAction.
   * @param type The entity clazz
   * @param payload Contains the entity to delete.
   */
  constructor(
    private entityType: new () => TEntity,
    public payload: TEntity,
    protected context: string
  ) {}

  static getContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `Delete ${typeName}`;
  }
}

export class DeleteSuccessAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = `[${this.context}] ${DeleteSuccessAction.getContextlessType<
    TEntity,
    TKey
  >(this.entityType)}`;
  public readonly payload: void;

  /**
   * Creates an instance of DeleteSuccessAction.
   * @param type The entity clazz
   */
  constructor(
    private entityType: new () => TEntity,
    protected context: string
  ) {}

  static getContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `Delete ${typeName} Success`;
  }
}

export class DeleteFailureAction<TEntity extends BaseEntity<TKey>, TKey>
  implements Action {
  readonly type = `[${this.context}] ${DeleteFailureAction.getContextlessType<
    TEntity,
    TKey
  >(this.entityType)}`;

  /**
   * Creates an instance of DeleteFailureAction.
   * @param type The entity clazz
   * @param payload The entity wish deletion failed (For the optimistic approach)
   */
  constructor(
    private entityType: new () => TEntity,
    public payload: TEntity,
    protected context: string
  ) {}

  static getContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
    entityType: new () => TEntity
  ): string {
    const typeName = getTypeName(entityType);
    return `Delete ${typeName} Failure`;
  }
}

export type CrudActions<TEntity extends BaseEntity<TKey>, TKey> =
  | CreateAction<TEntity, TKey>
  | CreateSuccessAction<TEntity, TKey>
  | CreateFailureAction<TEntity, TKey>
  | GetAllAction<TEntity, TKey>
  | GetAllFailureAction<TEntity, TKey>
  | GetAllSuccessAction<TEntity, TKey>
  | GetByIdAction<TEntity, TKey>
  | GetByIdSuccessAction<TEntity, TKey>
  | GetByIdFailureAction<TEntity, TKey>
  | UpdateAction<TEntity, TKey>
  | UpdateSuccessAction<TEntity, TKey>
  | UpdateFailureAction<TEntity, TKey>
  | DeleteAction<TEntity, TKey>
  | DeleteSuccessAction<TEntity, TKey>
  | DeleteFailureAction<TEntity, TKey>;
