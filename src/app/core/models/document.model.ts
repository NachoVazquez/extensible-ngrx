import { BaseEntity } from 'src/app/shared/models/base-entity.model';

export class DocumentModel extends BaseEntity<number> {
  title: string;
  body: string;
}
