import { DocumentModel } from './../../core/models/document.model';
import * as crudActions from './base-crud.actions';

describe('getTypeName function', () => {
  it('#getTypeName should produce the entity class name', () => {
    const actualDocumentEntityName = crudActions.getTypeName(DocumentModel);

    const expectedDocumentEntityName = 'DocumentModel';

    expect(actualDocumentEntityName).toBe(expectedDocumentEntityName);
  });

  //#region GetById
  it('#GetByIdAction.getType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.GetByIdAction.getType(DocumentModel);

    const expectedType = `[DocumentModel] Get By Id`;

    expect(actualType).toBe(expectedType);
  });

  it('#GetByIdSuccessAction.getType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.GetByIdSuccessAction.getType(DocumentModel);

    const expectedType = `[DocumentModel] Get By Id Success`;

    expect(actualType).toBe(expectedType);
  });

  it('#GetByIdFailureAction.getType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.GetByIdFailureAction.getType(DocumentModel);

    const expectedType = `[DocumentModel] Get By Id Failure`;

    expect(actualType).toBe(expectedType);
  });
  //#endregion

  //#region GetALL
  it('#GetAllAction.getType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.GetAllAction.getType(DocumentModel);

    const expectedType = `[DocumentModel] Get All`;

    expect(actualType).toBe(expectedType);
  });

  it('#GetAllSuccessAction.getType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.GetAllSuccessAction.getType(DocumentModel);

    const expectedType = `[DocumentModel] Get All Success`;

    expect(actualType).toBe(expectedType);
  });

  it('#GetAllFailureAction.getType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.GetAllFailureAction.getType(DocumentModel);

    const expectedType = `[DocumentModel] Get All Failure`;

    expect(actualType).toBe(expectedType);
  });
  //#endregion

  //#region Create
  it('#CreateAction.getType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.CreateAction.getType(DocumentModel);

    const expectedType = `[DocumentModel] Create`;

    expect(actualType).toBe(expectedType);
  });

  it('#CreateSuccessAction.getType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.CreateSuccessAction.getType(DocumentModel);

    const expectedType = `[DocumentModel] Create Success`;

    expect(actualType).toBe(expectedType);
  });

  it('#CreateFailureAction.getType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.CreateFailureAction.getType(DocumentModel);

    const expectedType = `[DocumentModel] Create Failure`;

    expect(actualType).toBe(expectedType);
  });
  //#endregion

  //#region Update
  it('#UpdateAction.getType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.UpdateAction.getType(DocumentModel);

    const expectedType = `[DocumentModel] Update`;

    expect(actualType).toBe(expectedType);
  });

  it('#UpdateSuccessAction.getType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.UpdateSuccessAction.getType(DocumentModel);

    const expectedType = `[DocumentModel] Update Success`;

    expect(actualType).toBe(expectedType);
  });

  it('#UpdateFailureAction.getType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.UpdateFailureAction.getType(DocumentModel);

    const expectedType = `[DocumentModel] Update Failure`;

    expect(actualType).toBe(expectedType);
  });
  //#endregion

  //#region Delete
  it('#DeleteAction.getType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.DeleteAction.getType(DocumentModel);

    const expectedType = `[DocumentModel] Delete`;

    expect(actualType).toBe(expectedType);
  });

  it('#DeleteSuccessAction.getType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.DeleteSuccessAction.getType(DocumentModel);

    const expectedType = `[DocumentModel] Delete Success`;

    expect(actualType).toBe(expectedType);
  });

  it('#DeleteFailureAction.getType should produce the correct action type of the entity ', () => {
    const actualType = crudActions.DeleteFailureAction.getType(DocumentModel);

    const expectedType = `[DocumentModel] Delete Failure`;

    expect(actualType).toBe(expectedType);
  });
  //#endregion
});
