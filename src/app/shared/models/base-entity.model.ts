export abstract class BaseEntity<TKey> {
  id: TKey;
  tempId?: string;
}
