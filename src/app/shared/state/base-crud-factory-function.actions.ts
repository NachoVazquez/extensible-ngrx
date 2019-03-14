import { BaseEntity } from '../models/base-entity.model';

export function getTypeName<TEntity extends BaseEntity<TKey>, TKey>(type: {
  new (): TEntity;
}): string {
  // Necessary tight coupling
  return new type().constructor.name;
}

export function getById<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity,
  entityId: TKey
) {
  return { type: getByIdActionType(entityType), payload: entityId };
}

export function getByIdActionType<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity
): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Get By id`;
}
