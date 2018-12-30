import { BaseEntity } from 'src/app/shared/models/base-entity.model';
export interface BaseEntityState<T extends BaseEntity<any>> {
  entities: T[];
  loading: boolean;
}
