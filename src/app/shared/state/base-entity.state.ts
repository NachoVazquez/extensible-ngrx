import { BaseEntity } from 'src/app/shared/models/base-entity.model';
import { Map } from 'immutable';

export interface BaseEntityState<TEntity extends BaseEntity<TKey>, TKey> {
  entities: Map<TKey | string, TEntity>;
  loading: boolean;
}
