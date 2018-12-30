export class BaseCrudActionTypeNameFactory {
  typeName: string;

  constructor(public type: { new (): any }) {
    this.typeName = new type().constructor.name;
  }

  get GetById(): string {
    return `[${this.typeName}] Get By Id`;
  }

  get GetByIdSuccess(): string {
    return `[${this.typeName}] Get By Id Success`;
  }

  get GetByIdFailed(): string {
    return `[${this.typeName}] Get By Id Failed`;
  }
}
