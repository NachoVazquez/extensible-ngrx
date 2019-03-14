import { BaseEntity } from '../models/base-entity.model';
import { CustomError } from '../error-handling';

export function getTypeName<TEntity extends BaseEntity<TKey>, TKey>(type: {
  new (): TEntity;
}): string {
  // Necessary tight coupling
  return new type().constructor.name;
}

export function getById<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  entityId: TKey,
  context: string
) {
  return {
    type: `[${context}] ${getByIdActionContextlessType(entityType)}`,
    payload: entityId
  };
}

export function getByIdActionContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Get By id`;
}

export function getByIdSuccess<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  entityById: TEntity,
  context: string
) {
  return {
    type: `[${context}] ${getByIdSuccessContextlessType(entityType)}`,
    payload: entityById
  };
}

export function getByIdSuccessContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Get By Id Success`;
}

export function getByIdError<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  error: CustomError,
  context: string
) {
  return {
    type: `[${context}] ${getByIdErrorContextlessType<TEntity, TKey>(
      entityType
    )}`,
    payload: error
  };
}

export function getByIdErrorContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Get By Id Error`;
}

export function getAll<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  context: string
) {
  return {
    type: `[${context}] ${getAllContextlessType<TEntity, TKey>(entityType)}`
  };
}

export function getAllContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity
): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Get All`;
}

export function getAllSuccess<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  allEntities: TEntity[],
  context: string
) {
  return {
    type: `[${context}] ${getAllSuccessContextlessType<TEntity, TKey>(
      entityType
    )}`,
    payload: allEntities
  };
}

export function getAllSuccessContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Get All Success`;
}

export function getAllError<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  error: CustomError,
  context: string
) {
  return {
    type: `[${context}] ${getAllErrorContextlessType<TEntity, TKey>(
      entityType
    )}`,
    payload: error
  };
}

export function getAllErrorContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Get All Error`;
}

export function createEntity<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  entityToCreate: TEntity,
  context: string
) {
  return {
    type: `[${context}] ${createContextlessType<TEntity, TKey>(entityType)}`,
    payload: entityToCreate
  };
}

export function createContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity
) {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Create`;
}

export function createEntitySuccess<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  entityCreated: { tempId: string; createdEntity: TEntity },
  context: string
) {
  return {
    type: `[${context}] ${createSuccessContextlessType<TEntity, TKey>(
      entityType
    )}`,
    payload: entityCreated
  };
}

export function createSuccessContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity) {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Create Success`;
}

export function createEntityError<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  tempIdOfEntity: string,
  context: string
) {
  return {
    type: `[${context}] ${createErrorContextlessType<TEntity, TKey>(
      entityType
    )}`,
    payload: tempIdOfEntity
  };
}

export function createErrorContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity) {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Create Error`;
}

export function updateEntity<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  entityToUpdateAndNewValues: { oldEntity: TEntity; newEntity: TEntity },
  context: string
) {
  return {
    type: `[${context}] ${updateContextlessType(entityType)}`,
    payload: entityToUpdateAndNewValues
  };
}

export function updateContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity
): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Update`;
}

export function updateEntitySuccess<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  updatedEntity: TEntity,
  context: string
) {
  return {
    type: `[${context}] ${updateSuccessContextlessType(entityType)}`,
    payload: updatedEntity
  };
}

export function updateSuccessContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Update Success`;
}

export function updateEntityError<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  originalEntity: TEntity,
  context: string
) {
  return {
    type: `[${context}] ${updateErrorContextlessType(entityType)}`,
    payload: originalEntity
  };
}

export function updateErrorContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Update Error`;
}

export function deleteEntity<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  entityToDelete: TEntity,
  context: string
) {
  return {
    type: `[${context}] ${deleteContextlessType(entityType)}`,
    payload: entityToDelete
  };
}

export function deleteContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity
): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Delete`;
}

export function deleteEntitySuccess<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  context: string
) {
  return {
    type: `[${context}] ${deleteSuccessContextlessType(entityType)}`
  };
}

export function deleteSuccessContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Delete Success`;
}

export function deleteEntityError<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  entityOptimisticallyDeleted: TEntity,
  context: string
) {
  return {
    type: `[${context}] ${deleteErrorContextlessType(entityType)}`,
    payload: entityOptimisticallyDeleted
  };
}

export function deleteErrorContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Delete Error`;
}
