export class BaseCrudActionTypeNameFactory {
  typeName: string;

  constructor(public type: { new (): any }) {
    this.typeName = new type().constructor.name;
  }

  get Create(): string {
    return `[${this.typeName}] Create`;
  }

  get CreateSuccess(): string {
    return `[${this.typeName}] Create Success`;
  }

  get CreateError(): string {
    return `[${this.typeName}] Create Error`;
  }

  get GetById(): string {
    return `[${this.typeName}] Get By id`;
  }

  get GetByIdSuccess(): string {
    return `[${this.typeName}] Get By id Success`;
  }

  get GetByIdError(): string {
    return `[${this.typeName}] Get By id Error`;
  }

  get GetAll(): string {
    return `[${this.typeName}] Get All`;
  }

  get GetAllSuccess(): string {
    return `[${this.typeName}] Get All Success`;
  }

  get GetAllError(): string {
    return `[${this.typeName}] Get All Error`;
  }

  get Update(): string {
    return `[${this.typeName}] Update`;
  }

  get UpdateSuccess(): string {
    return `[${this.typeName}] Update Success`;
  }

  get UpdateError(): string {
    return `[${this.typeName}] Update Error`;
  }

  get Delete(): string {
    return `[${this.typeName}] Delete`;
  }

  get DeleteSuccess(): string {
    return `[${this.typeName}] Delete Success`;
  }

  get DeleteError(): string {
    return `[${this.typeName}] Delete Error`;
  }
}
