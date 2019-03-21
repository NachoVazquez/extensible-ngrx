import { DocumentModel } from './../../core/models/document.model';
import * as crudActions from './base-crud-origin.actions';

describe('getContextlessTypeName function', () => {
  it('#getContextlessTypeName should produce the entity class name', () => {
    const actualDocumentEntityName = crudActions.getTypeName(DocumentModel);

    const expectedDocumentEntityName = 'DocumentModel';

    expect(actualDocumentEntityName).toBe(expectedDocumentEntityName);
  });

  //#region GetById
  it('#GetByIdAction.getContextlessType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.GetByIdAction.getContextlessType(
      DocumentModel
    );

    const expectedType = `Get DocumentModel By Id`;

    expect(actualType).toBe(expectedType);
  });

  it('#GetByIdAction.type instance should produce the correct action type of the entity with the correct origin', () => {
    const actualType = new crudActions.GetByIdAction<DocumentModel, number>(
      DocumentModel,
      5,
      'Document Component'
    ).type;

    const expectedType = `[Document Component] Get DocumentModel By Id`;

    expect(actualType).toBe(expectedType);
  });

  it('#GetByIdSuccessAction.getContextlessType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.GetByIdSuccessAction.getContextlessType(
      DocumentModel
    );

    const expectedType = `Get DocumentModel By Id Success`;

    expect(actualType).toBe(expectedType);
  });

  it('#GetByIdSuccessAction.type instance should produce the correct action type of the entity with the correct origin', () => {
    const actualType = new crudActions.GetByIdSuccessAction<
      DocumentModel,
      number
    >(DocumentModel, { id: 5, title: 'empty', body: 'empty' }, 'Document/API')
      .type;

    const expectedType = `[Document/API] Get DocumentModel By Id Success`;

    expect(actualType).toBe(expectedType);
  });

  it('#GetByIdFailureAction.getContextlessType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.GetByIdFailureAction.getContextlessType(
      DocumentModel
    );

    const expectedType = `Get DocumentModel By Id Failure`;

    expect(actualType).toBe(expectedType);
  });

  it('#GetByIdFailureAction.type instance should produce the correct action type of the entity with the correct origin', () => {
    const actualType = new crudActions.GetByIdFailureAction<
      DocumentModel,
      number
    >(DocumentModel, null, 'Document/API').type;

    const expectedType = `[Document/API] Get DocumentModel By Id Failure`;

    expect(actualType).toBe(expectedType);
  });
  //#endregion

  //#region GetAll
  it('#GetAllAction.getContextlessType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.GetAllAction.getContextlessType(
      DocumentModel
    );

    const expectedType = `Get All DocumentModel`;

    expect(actualType).toBe(expectedType);
  });

  it('#GetAllAction.type instance should produce the correct action type of the entity with the correct origin', () => {
    const actualType = new crudActions.GetAllAction<DocumentModel, number>(
      DocumentModel,
      'Document Component'
    ).type;

    const expectedType = `[Document Component] Get All DocumentModel`;

    expect(actualType).toBe(expectedType);
  });

  it('#GetAllSuccessAction.getContextlessType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.GetAllSuccessAction.getContextlessType(
      DocumentModel
    );

    const expectedType = `Get All DocumentModel Success`;

    expect(actualType).toBe(expectedType);
  });

  it('#GetAllSuccessAction.type instance should produce the correct action type of the entity with the correct origin', () => {
    const actualType = new crudActions.GetAllSuccessAction<
      DocumentModel,
      number
    >(DocumentModel, [], 'Document/API').type;

    const expectedType = `[Document/API] Get All DocumentModel Success`;

    expect(actualType).toBe(expectedType);
  });

  it('#GetAllFailureAction.getContextlessType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.GetAllFailureAction.getContextlessType(
      DocumentModel
    );

    const expectedType = `Get All DocumentModel Failure`;

    expect(actualType).toBe(expectedType);
  });

  it('#GetAllFailureAction.type instance should produce the correct action type of the entity with the correct origin', () => {
    const actualType = new crudActions.GetAllFailureAction<
      DocumentModel,
      number
    >(DocumentModel, null, 'Document/API').type;

    const expectedType = `[Document/API] Get All DocumentModel Failure`;

    expect(actualType).toBe(expectedType);
  });
  //#endregion

  //#region Create
  it('#CreateAction.getContextlessType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.CreateAction.getContextlessType(
      DocumentModel
    );

    const expectedType = `Create DocumentModel`;

    expect(actualType).toBe(expectedType);
  });

  it('#CreateAction.type instance should produce the correct action type of the entity with the correct origin', () => {
    const actualType = new crudActions.CreateAction<DocumentModel, number>(
      DocumentModel,
      null,
      'Document Component'
    ).type;

    const expectedType = `[Document Component] Create DocumentModel`;

    expect(actualType).toBe(expectedType);
  });

  it('#CreateSuccessAction.getContextlessType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.CreateSuccessAction.getContextlessType(
      DocumentModel
    );

    const expectedType = `Create DocumentModel Success`;

    expect(actualType).toBe(expectedType);
  });

  it('#CreateSuccessAction.type instance should produce the correct action type of the entity with the correct origin', () => {
    const actualType = new crudActions.CreateSuccessAction<
      DocumentModel,
      number
    >(DocumentModel, null, 'Document/API').type;

    const expectedType = `[Document/API] Create DocumentModel Success`;

    expect(actualType).toBe(expectedType);
  });

  it('#CreateFailureAction.getContextlessType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.CreateFailureAction.getContextlessType(
      DocumentModel
    );

    const expectedType = `Create DocumentModel Failure`;

    expect(actualType).toBe(expectedType);
  });

  it('#CreateFailureAction.type instance should produce the correct action type of the entity with the correct origin', () => {
    const actualType = new crudActions.CreateFailureAction<
      DocumentModel,
      number
    >(DocumentModel, null, 'Document/API').type;

    const expectedType = `[Document/API] Create DocumentModel Failure`;

    expect(actualType).toBe(expectedType);
  });
  //#endregion

  //#region Update
  it('#UpdateAction.getContextlessType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.UpdateAction.getContextlessType(
      DocumentModel
    );

    const expectedType = `Update DocumentModel`;

    expect(actualType).toBe(expectedType);
  });

  it('#UpdateAction.type instance should produce the correct action type of the entity with the correct origin', () => {
    const actualType = new crudActions.UpdateAction<DocumentModel, number>(
      DocumentModel,
      null,
      'Document Component'
    ).type;

    const expectedType = `[Document Component] Update DocumentModel`;

    expect(actualType).toBe(expectedType);
  });

  it('#UpdateSuccessAction.getContextlessType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.UpdateSuccessAction.getContextlessType(
      DocumentModel
    );

    const expectedType = `Update DocumentModel Success`;

    expect(actualType).toBe(expectedType);
  });

  it('#CreateSuccessAction.type instance should produce the correct action type of the entity with the correct origin', () => {
    const actualType = new crudActions.CreateSuccessAction<
      DocumentModel,
      number
    >(DocumentModel, null, 'Document/API').type;

    const expectedType = `[Document/API] Create DocumentModel Success`;

    expect(actualType).toBe(expectedType);
  });

  it('#UpdateFailureAction.getContextlessType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.UpdateFailureAction.getContextlessType(
      DocumentModel
    );

    const expectedType = `Update DocumentModel Failure`;

    expect(actualType).toBe(expectedType);
  });

  it('#UpdateFailureAction.type instance should produce the correct action type of the entity with the correct origin', () => {
    const actualType = new crudActions.UpdateFailureAction<
      DocumentModel,
      number
    >(DocumentModel, null, 'Document/API').type;

    const expectedType = `[Document/API] Update DocumentModel Failure`;

    expect(actualType).toBe(expectedType);
  });
  //#endregion

  //#region Delete
  it('#DeleteAction.getContextlessType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.DeleteAction.getContextlessType(
      DocumentModel
    );

    const expectedType = `Delete DocumentModel`;

    expect(actualType).toBe(expectedType);
  });

  it('#DeleteAction.getContextlessType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.DeleteAction.getContextlessType(
      DocumentModel
    );

    const expectedType = `Delete DocumentModel`;

    expect(actualType).toBe(expectedType);
  });

  it('#DeleteSuccessAction.getContextlessType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.DeleteSuccessAction.getContextlessType(
      DocumentModel
    );

    const expectedType = `Delete DocumentModel Success`;

    expect(actualType).toBe(expectedType);
  });

    it('#DeleteSuccessAction.type instance should produce the correct action type of the entity with the correct origin', () => {
        const actualType = new crudActions.DeleteSuccessAction<
            DocumentModel,
            number
        >(DocumentModel, 'Document/API').type;

        const expectedType = `[Document/API] Delete DocumentModel Success`;

        expect(actualType).toBe(expectedType);
    });

  it('#DeleteFailureAction.getContextlessType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.DeleteFailureAction.getContextlessType(
      DocumentModel
    );

    const expectedType = `Delete DocumentModel Failure`;

    expect(actualType).toBe(expectedType);
  });

    it('#DeleteFailureAction.type instance should produce the correct action type of the entity with the correct origin', () => {
        const actualType = new crudActions.DeleteFailureAction<
            DocumentModel,
            number
        >(DocumentModel, null, 'Document/API').type;

        const expectedType = `[Document/API] Delete DocumentModel Failure`;

        expect(actualType).toBe(expectedType);
    });
  //#endregion
});
