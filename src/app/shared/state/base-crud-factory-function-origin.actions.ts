import { BaseEntity } from '../models/base-entity.model';
import { CustomError } from '../error-handling';
import { action, payload } from 'ts-action';

//   export enum AuthApiActionTypes {
//   LoginSuccess = '[Auth/API] Login Success',
//   LoginFailure = '[Auth/API] Login Failure',
//   LoginRedirect = '[Auth/API] Login Redirect',
// }

// export const AuthApiActions = {
//   loginRedirect: () => createAction(AuthApiActionTypes.LoginRedirect),
//   loginSuccess: (user: User) =>
//     createAction(AuthApiActionTypes.LoginSuccess, { user }),
//   loginFailure: (error: any) =>
//     createAction(AuthApiActionTypes.LoginFailure, { error }),
// };

// export type AuthApiActions = ActionsUnion<typeof AuthApiActions>;

export function getTypeName<TEntity extends BaseEntity<TKey>, TKey>(
  type: new () => TEntity
): string {
  // Necessary tight coupling
  return new type().constructor.name;
}

// export function getById<TEntity extends BaseEntity<TKey>, TKey>(
//   entityType: new () => TEntity,
//   entityId: TKey,
//   context: string
// ) {
//   return {
//     type: `[${context}] ${getByIdActionContextlessType(entityType)}`,
//     payload: entityId
//   };
// }

export const getById = <TEntity extends BaseEntity<TKey>, TKey>(
  type: new () => TEntity,
  context: string
) =>
  action(
    `[${context}] ${getByIdActionContextlessType(type)}`,
    payload<number>()
  );

export function getByIdActionContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Get By id`;
}

// export function getByIdSuccess<TEntity extends BaseEntity<TKey>, TKey>(
//   entityType: new () => TEntity,
//   entityById: TEntity,
//   context: string
// ) {
//   return {
//     type: `[${context}] ${getByIdSuccessContextlessType(entityType)}`,
//     payload: entityById
//   };
// }

export const getByIdSuccess = <TEntity extends BaseEntity<TKey>, TKey>(
  type: new () => TEntity,
  context: string
) =>
  action(
    `[${context}] ${getByIdSuccessContextlessType(type)}`,
    payload<TEntity>()
  );

export function getByIdSuccessContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Get By Id Success`;
}

// export function getByIdFailure<TEntity extends BaseEntity<TKey>, TKey>(
//   entityType: new () => TEntity,
//   error: CustomError,
//   context: string
// ) {
//   return {
//     type: `[${context}] ${getByIdFailureContextlessType<TEntity, TKey>(
//       entityType
//     )}`,
//     payload: error
//   };
// }

export const getByIdFailure = <TEntity extends BaseEntity<TKey>, TKey>(
  type: new () => TEntity,
  context: string
) =>
  action(
    `[${context}] ${getByIdFailureContextlessType(type)}`,
    payload<CustomError>()
  );

export function getByIdFailureContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Get By Id Failure`;
}

// export function getAll<TEntity extends BaseEntity<TKey>, TKey>(
//   entityType: new () => TEntity,
//   context: string
// ) {
//   return {
//     type: `[${context}] ${getAllContextlessType<TEntity, TKey>(entityType)}`
//   };
// }

export const getAll = <TEntity extends BaseEntity<TKey>, TKey>(
  type: new () => TEntity,
  context: string
) => action(`[${context}] ${getAllContextlessType(type)}`);

export function getAllContextlessType<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity
): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Get All`;
}

// export function getAllSuccess<TEntity extends BaseEntity<TKey>, TKey>(
//   entityType: new () => TEntity,
//   allEntities: TEntity[],
//   context: string
// ) {
//   return {
//     type: `[${context}] ${getAllSuccessContextlessType<TEntity, TKey>(
//       entityType
//     )}`,
//     payload: allEntities
//   };
// }

export const getAllSuccess = <TEntity extends BaseEntity<TKey>, TKey>(
  type: new () => TEntity,
  context: string
) =>
  action(
    `[${context}] ${getAllSuccessContextlessType(type)}`,
    payload<TEntity[]>()
  );

export function getAllSuccessContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Get All Success`;
}

// export function getAllFailure<TEntity extends BaseEntity<TKey>, TKey>(
//   entityType: new () => TEntity,
//   error: CustomError,
//   context: string
// ) {
//   return {
//     type: `[${context}] ${getAllFailureContextlessType<TEntity, TKey>(
//       entityType
//     )}`,
//     payload: error
//   };
// }

export const getAllFailure = <TEntity extends BaseEntity<TKey>, TKey>(
  type: new () => TEntity,
  context: string
) =>
  action(
    `[${context}] ${getAllFailureContextlessType(type)}`,
    payload<CustomError>()
  );

export function getAllFailureContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Get All Failure`;
}

// export function createEntity<TEntity extends BaseEntity<TKey>, TKey>(
//   entityType: new () => TEntity,
//   entityToCreate: TEntity,
//   context: string
// ) {
//   return {
//     type: `[${context}] ${createContextlessType<TEntity, TKey>(entityType)}`,
//     payload: entityToCreate
//   };
// }

export const createEntity = <TEntity extends BaseEntity<TKey>, TKey>(
  type: new () => TEntity,
  context: string
) => action(`[${context}] ${createContextlessType(type)}`, payload<TEntity>());

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

export function createEntityFailure<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  tempIdOfEntity: string,
  context: string
) {
  return {
    type: `[${context}] ${createFailureContextlessType<TEntity, TKey>(
      entityType
    )}`,
    payload: tempIdOfEntity
  };
}

export function createFailureContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity) {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Create Failure`;
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

export function updateEntityFailure<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  originalEntity: TEntity,
  context: string
) {
  return {
    type: `[${context}] ${updateFailureContextlessType(entityType)}`,
    payload: originalEntity
  };
}

export function updateFailureContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Update Failure`;
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

export function deleteEntityFailure<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  entityOptimisticallyDeleted: TEntity,
  context: string
) {
  return {
    type: `[${context}] ${deleteFailureContextlessType(entityType)}`,
    payload: entityOptimisticallyDeleted
  };
}

export function deleteFailureContextlessType<
  TEntity extends BaseEntity<TKey>,
  TKey
>(entityType: new () => TEntity): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Delete Failure`;
}
