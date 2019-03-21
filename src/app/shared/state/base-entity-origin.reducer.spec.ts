import { BaseEntity } from 'src/app/shared/models/base-entity.model';

import * as crudActions from './base-crud-origin.actions';
import { BaseEntityState } from './base-entity.state';
import { Map } from 'immutable';
import { baseReducer } from './base-entity-origin.reducer';
import { CustomError } from '../error-handling';

class TestEntity extends BaseEntity<number> {}

interface TestState extends BaseEntityState<TestEntity, number> {}

describe('Base Reducer', () => {
  const testEntity1Id = 5;
  const testEntity1: TestEntity = {
    id: testEntity1Id
  };
  const testEntity2Id = 7;
  const testEntity2: TestEntity = {
    id: testEntity2Id
  };

  const testEntity3Id = 11;
  const testEntity3: TestEntity = {
    id: testEntity3Id
  };

  const initialState: TestState = {
    loading: false,
    entities: Map<number, TestEntity>().set(testEntity1Id, testEntity1)
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const actual = baseReducer(TestEntity, initialState, {} as any);

      const expected = {
        ...initialState
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('GetById, GetByIdSuccess, GetByIdFailure', () => {
    it('should set loading flag to true when GetById', () => {
      const action = new crudActions.GetByIdAction<TestEntity, number>(
        TestEntity,
        testEntity1Id,
        'Reducer Test Suit'
      );

      const actual = baseReducer(TestEntity, initialState, action);

      const expected = { ...initialState, loading: true };

      expect(actual).toEqual(expected);
    });

    it('should add a new entity to entities collection and set loading to false when GetByIdSuccess', () => {
      const action = new crudActions.GetByIdSuccessAction<TestEntity, number>(
        TestEntity,
        testEntity2,
        'TestEntity/API'
      );
      const actual = baseReducer(TestEntity, initialState, action);

      const expected = {
        ...initialState,
        loading: false,
        entities: initialState.entities.set(testEntity2Id, testEntity2)
      };

      expect(actual).toEqual(expected);
    });

    it('should override an entity in the entities collection if it already exists and set loading to false when GetByIdSuccess', () => {
      const actual = baseReducer(
        TestEntity,
        initialState,
        new crudActions.GetByIdSuccessAction<TestEntity, number>(
          TestEntity,
          {
            ...testEntity1,
            tempId: 'test'
          },
          'TestEntity/API'
        )
      );

      const expected = {
        ...initialState,
        loading: false,
        entities: initialState.entities.set(testEntity1Id, {
          ...testEntity1,
          tempId: 'test'
        })
      };

      expect(actual).toEqual(expected);
    });

    it('should set loading to false when GetByIdFailure', () => {
      const actual = baseReducer(
        TestEntity,
        initialState,
        new crudActions.GetByIdFailureAction<TestEntity, number>(
          TestEntity,
          new CustomError(),
          'TestEntity/API'
        )
      );

      const expected = {
        ...initialState,
        loading: false
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('GetAll, GetAllSuccess, GetAllFailure', () => {
    it('should set loading flag to true when GetAll', () => {
      const actual = baseReducer(
        TestEntity,
        initialState,
        new crudActions.GetAllAction<TestEntity, number>(
          TestEntity,
          'Reducer Test Suit'
        )
      );

      const expected = { ...initialState, loading: true };

      expect(actual).toEqual(expected);
    });

    it('should add a new entities to entities collection and set loading to false when GetAllSuccess', () => {
      const actual = baseReducer(
        TestEntity,
        initialState,
        new crudActions.GetAllSuccessAction<TestEntity, number>(
          TestEntity,
          [testEntity2, testEntity3],
          'TestEntity/API'
        )
      );

      const extendedMap = initialState.entities.merge(
        [testEntity2, testEntity3].reduce((acc, curr) => {
          return acc.set(curr.id, curr);
        }, Map<number, TestEntity>())
      );

      const expected = {
        ...initialState,
        loading: false,
        entities: extendedMap
      };

      expect(actual).toEqual(expected);
    });

    it('should add a new entities to entities collection, override existing ones and set loading to false when GetAllSuccess', () => {
      const modifiedEnt1 = { ...testEntity1, tempId: 'test' };

      const actual = baseReducer(
        TestEntity,
        initialState,
        new crudActions.GetAllSuccessAction<TestEntity, number>(
          TestEntity,
          [modifiedEnt1, testEntity2, testEntity3],
          'TestEntity/API'
        )
      );

      const extendedMap = initialState.entities.merge(
        [modifiedEnt1, testEntity2, testEntity3].reduce((acc, curr) => {
          return acc.set(curr.id, curr);
        }, Map<number, TestEntity>())
      );

      const expected = {
        ...initialState,
        loading: false,
        entities: extendedMap
      };

      expect(actual).toEqual(expected);
      expect(actual.entities.get(testEntity1Id)).toEqual(modifiedEnt1);
    });

    it('should set loading to false when GetAllFailure', () => {
      const actual = baseReducer(
        TestEntity,
        initialState,
        new crudActions.GetAllFailureAction<TestEntity, number>(
          TestEntity,
          new CustomError(),
          'TestEntity/API'
        )
      );

      const expected = {
        ...initialState,
        loading: false
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('Create, CreateSuccess, CreateFailure', () => {
    const entityToCreate: TestEntity = { tempId: 'testId', id: null };
    const afterCreateInitialState = {
      ...initialState,
      entities: initialState.entities.set(entityToCreate.tempId, entityToCreate)
    };

    it('should add the entityToCreate optimistically in the collection and set loading flag to true when Create', () => {
      const actual = baseReducer(
        TestEntity,
        initialState,
        new crudActions.CreateAction<TestEntity, number>(
          TestEntity,
          entityToCreate,
          'Reducer Test Suit'
        )
      );

      const expected = {
        ...initialState,
        loading: true,
        entities: initialState.entities.set(
          entityToCreate.tempId,
          entityToCreate
        )
      };

      expect(actual).toEqual(expected);
    });

    it('should replace optimistic entity with created entity and set loading to false when CreateSuccess', () => {
      const actual = baseReducer(
        TestEntity,
        afterCreateInitialState,
        new crudActions.CreateSuccessAction<TestEntity, number>(
          TestEntity,
          {
            tempId: entityToCreate.tempId,
            createdEntity: testEntity2
          },
          'TestEntity/API'
        )
      );

      const expected = {
        ...afterCreateInitialState,
        loading: false,
        entities: afterCreateInitialState.entities
          .remove(entityToCreate.tempId)
          .set(testEntity2Id, testEntity2)
      };

      expect(actual).toEqual(expected);
    });

    it('should delete the optimistically created entity and set loading to false when CreateFailure', () => {
      const actual = baseReducer(
        TestEntity,
        afterCreateInitialState,
        new crudActions.CreateFailureAction<TestEntity, number>(
          TestEntity,
          entityToCreate.tempId,
          'TestEntity/API'
        )
      );

      const expected = {
        ...afterCreateInitialState,
        entities: afterCreateInitialState.entities.remove(
          entityToCreate.tempId
        ),
        loading: false
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('Update, UpdateSuccess, UpdateFailure', () => {
    const entityToUpdate: TestEntity = { ...testEntity1, tempId: 'test' };
    const afterUpdateInitialState = {
      ...initialState,
      entities: initialState.entities.set(entityToUpdate.id, entityToUpdate)
    };

    it('should optimistically replace the entity to update in the collection and set loading flag to true when Update', () => {
      const actual = baseReducer(
        TestEntity,
        initialState,
        new crudActions.UpdateAction<TestEntity, number>(
          TestEntity,
          {
            oldEntity: testEntity1,
            newEntity: entityToUpdate
          },
          'Reducer Test Suit'
        )
      );

      const expected = {
        ...initialState,
        loading: true,
        entities: initialState.entities.set(entityToUpdate.id, entityToUpdate)
      };

      expect(actual).toEqual(expected);
    });

    it('should replace optimistic entity with created entity and set loading to false when UpdateSuccess', () => {
      const actual = baseReducer(
        TestEntity,
        afterUpdateInitialState,
        new crudActions.UpdateSuccessAction<TestEntity, number>(
          TestEntity,
          entityToUpdate,
          'TestEntity/API'
        )
      );

      const expected = {
        ...afterUpdateInitialState,
        loading: false,
        entities: afterUpdateInitialState.entities.set(
          entityToUpdate.id,
          entityToUpdate
        )
      };

      expect(actual).toEqual(expected);
    });

    it('should replace the optimistically updated entity with the original and set loading to false when UpdateFailure', () => {
      const actual = baseReducer(
        TestEntity,
        afterUpdateInitialState,
        new crudActions.UpdateFailureAction<TestEntity, number>(
          TestEntity,
          testEntity1,
          'TestEntity/API'
        )
      );

      const expected = {
        ...afterUpdateInitialState,
        entities: afterUpdateInitialState.entities.set(
          testEntity1.id,
          testEntity1
        ),
        loading: false
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('Delete, DeleteSuccess, DeleteFailure', () => {
    const entityToDelete: TestEntity = testEntity1;
    const afterDeleteInitialState = {
      ...initialState,
      entities: initialState.entities.delete(entityToDelete.id),
      loading: true
    };

    it('should optimistically delete the entity in the collection and set loading flag to true when Delete', () => {
      const actual = baseReducer(
        TestEntity,
        initialState,
        new crudActions.DeleteAction<TestEntity, number>(
          TestEntity,
          entityToDelete,
          'Reducer Test Suit'
        )
      );

      const expected = {
        ...initialState,
        loading: true,
        entities: initialState.entities.delete(entityToDelete.id)
      };

      expect(actual).toEqual(expected);
    });

    it('should set loading to false when DeleteSuccess', () => {
      const actual = baseReducer(
        TestEntity,
        afterDeleteInitialState,
        new crudActions.DeleteSuccessAction<TestEntity, number>(
          TestEntity,
          'TestEntity/API'
        )
      );

      const expected = {
        ...afterDeleteInitialState,
        loading: false
      };

      expect(actual).toEqual(expected);
    });

    it('should insert the optimistically deleted entity and set loading to false when DeleteFailure', () => {
      const actual = baseReducer(
        TestEntity,
        afterDeleteInitialState,
        new crudActions.DeleteFailureAction<TestEntity, number>(
          TestEntity,
          entityToDelete,
          'TestEntity/API'
        )
      );

      const expected = {
        ...afterDeleteInitialState,
        entities: afterDeleteInitialState.entities.set(
          entityToDelete.id,
          entityToDelete
        ),
        loading: false
      };

      expect(actual).toEqual(expected);
    });
  });
});
