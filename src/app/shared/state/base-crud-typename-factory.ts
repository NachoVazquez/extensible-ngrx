import { BaseEntity } from 'src/app/shared/models/base-entity.model';

export function getCreateActionName<
  TEntity extends BaseEntity<TKey>,
  TKey
>(type: { new (): TEntity }): string {
  const typeName = getTypeName(type);
  return `[${typeName}] Create`;
}
export function getCreateSuccessActionName<
  TEntity extends BaseEntity<TKey>,
  TKey
>(type: { new (): TEntity }): string {
  const typeName = getTypeName(type);
  return `[${typeName}] Create Success`;
}
export function getCreateErrorActionName<
  TEntity extends BaseEntity<TKey>,
  TKey
>(type: { new (): TEntity }): string {
  const typeName = getTypeName(type);
  return `[${typeName}] Create Error`;
}

export function getGetByIdActionName<
  TEntity extends BaseEntity<TKey>,
  TKey
>(type: { new (): TEntity }): string {
  const typeName = getTypeName(type);
  return `[${typeName}] Get By id`;
}

export function getGetByIdSuccessActionName<
  TEntity extends BaseEntity<TKey>,
  TKey
>(type: { new (): TEntity }): string {
  const typeName = getTypeName(type);
  return `[${typeName}] Get By id Success`;
}
export function getGetByIdErrorActionName<
  TEntity extends BaseEntity<TKey>,
  TKey
>(type: { new (): TEntity }): string {
  const typeName = getTypeName(type);
  return `[${typeName}] Get By id Error`;
}

export function getGetAllActionName<
  TEntity extends BaseEntity<TKey>,
  TKey
>(type: { new (): TEntity }): string {
  const typeName = getTypeName(type);
  return `[${typeName}] Get All`;
}
export function getGetAllSuccessActionName<
  TEntity extends BaseEntity<TKey>,
  TKey
>(type: { new (): TEntity }): string {
  const typeName = getTypeName(type);
  return `[${typeName}] Get All Success`;
}
export function getGetAllErrorActionName<
  TEntity extends BaseEntity<TKey>,
  TKey
>(type: { new (): TEntity }): string {
  const typeName = getTypeName(type);
  return `[${typeName}] Get All Error`;
}
export function getUpdateActionName<
  TEntity extends BaseEntity<TKey>,
  TKey
>(type: { new (): TEntity }): string {
  const typeName = getTypeName(type);
  return `[${typeName}] Update`;
}
export function getUpdateSuccessActionName<
  TEntity extends BaseEntity<TKey>,
  TKey
>(type: { new (): TEntity }): string {
  const typeName = getTypeName(type);
  return `[${typeName}] Update Success`;
}
export function getUpdateErrorActionName<
  TEntity extends BaseEntity<TKey>,
  TKey
>(type: { new (): TEntity }): string {
  const typeName = getTypeName(type);
  return `[${typeName}] Update Error`;
}

export function getDeleteActionActionName<
  TEntity extends BaseEntity<TKey>,
  TKey
>(type: { new (): TEntity }): string {
  const typeName = getTypeName(type);
  return `[${typeName}] Delete`;
}

export function getDeleteSuccessActionName<
  TEntity extends BaseEntity<TKey>,
  TKey
>(type: { new (): TEntity }): string {
  const typeName = getTypeName(type);
  return `[${typeName}] Delete Success`;
}

export function getDeleteErrorActionName<
  TEntity extends BaseEntity<TKey>,
  TKey
>(type: { new (): TEntity }): string {
  const typeName = getTypeName(type);
  return `[${typeName}] Delete Error`;
}

function getTypeName<TEntity extends BaseEntity<TKey>, TKey>(type: {
  new (): TEntity;
}): string {
  return new type().constructor.name;
}
