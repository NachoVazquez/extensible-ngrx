import { BaseEntity } from '../models/base-entity.model';
import { action, union, payload } from 'ts-action';
import { TestingCompilerFactory } from '@angular/core/testing/src/test_compiler';

export function getTypeName<TEntity extends BaseEntity<TKey>, TKey>(
  type: new () => TEntity
): string {
  // Necessary tight coupling
  return new type().constructor.name;
}

const getById = <TEntity extends BaseEntity<TKey>, TKey>(
  type: new () => TEntity
) => action(getByIdActionType(type), payload<number>());


function getByIdActionType<TEntity extends BaseEntity<TKey>, TKey>(
  entityType: new () => TEntity
): string {
  const typeName = getTypeName(entityType);
  return `[${typeName}] Get By id`;
}
