import { BaseEntityEffects } from 'src/app/shared/state/base-entity.effects';
import { BaseEntity } from 'src/app/shared/models/base-entity.model';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions, Effect } from '@ngrx/effects';
import { BaseCrudService } from '../services/base-crud.service';
import * as crudActions from './base-crud.actions';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { CustomError } from '../error-handling';

class TestEntity extends BaseEntity<number> {}

type TestActions = crudActions.CrudActions<TestEntity, number>;

@Injectable()
class TestService extends BaseCrudService<TestEntity, number> {}

@Injectable()
class TestEffects extends BaseEntityEffects<TestEntity, number> {
  constructor(protected actions$: Actions, protected service: TestService) {
    super(TestEntity, actions$, service);
  }

  @Effect()
  public getTestById$: Observable<Action> = this.getEntityById$();

  @Effect()
  public getAllTests$: Observable<Action> = this.getAllEntities$();

  @Effect()
  public createTest$: Observable<Action> = this.createEntity$();

  @Effect()
  public updateTest$: Observable<Action> = this.updateEntity$();

  @Effect()
  public deleteTest$: Observable<Action> = this.deleteEntity$();
}

describe('BaseEffects', () => {
  let actions$: Observable<any>;
  let testService: any;
  let effects: TestEffects;

  const error: CustomError = {};

  const testEntity1Id = 5;
  const testEntity1: TestEntity = {
    id: testEntity1Id
  };
  const testEntity2Id = 7;
  const testEntity2: TestEntity = {
    id: testEntity1Id
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestEffects,
        {
          provide: TestService,
          useValue: jasmine.createSpyObj('TestService', [
            'get',
            'getAll',
            'create',
            'update',
            'delete'
          ])
        },
        provideMockActions(() => actions$)
      ]
    });

    actions$ = TestBed.get(Actions);
    testService = TestBed.get(TestService);
    effects = TestBed.get(TestEffects);
  });

  describe('getTestById$', () => {
    it('should return a GetByIdSuccess action, with the entity, on success', () => {
      const action = new crudActions.GetByIdAction<TestEntity, number>(
        TestEntity,
        testEntity1Id
      );
      const completion = new crudActions.GetByIdSuccessAction<
        TestEntity,
        number
      >(TestEntity, testEntity1);

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: testEntity1 });
      const expected = cold('--b', { b: completion });

      testService.get.and.returnValue(response);

      expect(effects.getTestById$).toBeObservable(expected);
    });

    it('should return a GetByIdFailure action if the service throws', () => {
      const action = new crudActions.GetByIdAction<TestEntity, number>(
        TestEntity,
        testEntity1Id
      );
      const completion = new crudActions.GetByIdFailureAction<
        TestEntity,
        number
      >(TestEntity, error);

      actions$ = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });

      testService.get.and.returnValue(response);

      expect(effects.getTestById$).toBeObservable(expected);
    });
  });

  describe('getAllTest$', () => {
    it('should return a GetAllSuccess action, with the entities, on success', () => {
      const action = new crudActions.GetAllAction<TestEntity, number>(
        TestEntity
      );
      const completion = new crudActions.GetAllSuccessAction<
        TestEntity,
        number
      >(TestEntity, [testEntity1, testEntity2]);

      actions$ = hot('-a---', { a: action });
      const response = cold('-b|', { b: [testEntity1, testEntity2] });
      const expected = cold('--c', { c: completion });

      testService.getAll.and.returnValue(response);

      expect(effects.getAllTests$).toBeObservable(expected);
    });

    it('should return a GetAllFailure action if the service throws', () => {
      const action = new crudActions.GetAllAction<TestEntity, number>(
        TestEntity
      );
      const completion = new crudActions.GetAllFailureAction<
        TestEntity,
        number
      >(TestEntity, error);

      actions$ = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });

      testService.getAll.and.returnValue(response);

      expect(effects.getAllTests$).toBeObservable(expected);
    });
  });

  describe('createTest$', () => {
    const testEntityToCreateTempId = '#42<S<3asdaFasdasdcvgbhteF#LTLE';
    const testEntityToCreate: TestEntity = {
      tempId: testEntityToCreateTempId,
      id: null
    };
    const testEntityCreated: TestEntity = testEntity1;

    it('should return a CreateSuccess action, with the created entity, on success', () => {
      const action = new crudActions.CreateAction<TestEntity, number>(
        TestEntity,
        testEntityToCreate
      );
      const completion = new crudActions.CreateSuccessAction<
        TestEntity,
        number
      >(TestEntity, {
        tempId: testEntityToCreateTempId,
        createdEntity: testEntityCreated
      });

      actions$ = hot('-a---', { a: action });
      const response = cold('-b|', { b: testEntityCreated });
      const expected = cold('--c', { c: completion });

      testService.create.and.returnValue(response);

      expect(effects.createTest$).toBeObservable(expected);
    });

    it('should return a CreateFailure action if the service throws', () => {
      const action = new crudActions.CreateAction<TestEntity, number>(
        TestEntity,
        testEntityToCreate
      );
      const completion = new crudActions.CreateFailureAction<
        TestEntity,
        number
      >(TestEntity, testEntityToCreateTempId);

      actions$ = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });

      testService.create.and.returnValue(response);

      expect(effects.createTest$).toBeObservable(expected);
    });
  });

  describe('updateTest$', () => {
    it('should return a UpdateSuccess action, with the updated entity, on success', () => {
      const action = new crudActions.UpdateAction<TestEntity, number>(
        TestEntity,
        { oldEntity: testEntity1, newEntity: testEntity2 }
      );
      const completion = new crudActions.UpdateSuccessAction<
        TestEntity,
        number
      >(TestEntity, testEntity2);

      actions$ = hot('-a---', { a: action });
      const response = cold('-b|', { b: testEntity2 });
      const expected = cold('--c', { c: completion });

      testService.update.and.returnValue(response);

      expect(effects.updateTest$).toBeObservable(expected);
    });

    it('should return a UpdateFailure action if the service throws', () => {
      const action = new crudActions.UpdateAction<TestEntity, number>(
        TestEntity,
        { oldEntity: testEntity1, newEntity: testEntity2 }
      );
      const completion = new crudActions.UpdateFailureAction<
        TestEntity,
        number
      >(TestEntity, testEntity1);

      actions$ = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });

      testService.update.and.returnValue(response);

      expect(effects.updateTest$).toBeObservable(expected);
    });
  });

  describe('deleteTest$', () => {
    it('should return a DeleteSuccess action, on success', () => {
      const action = new crudActions.DeleteAction<TestEntity, number>(
        TestEntity,
        testEntity1
      );
      const completion = new crudActions.DeleteSuccessAction<
        TestEntity,
        number
      >(TestEntity);

      actions$ = hot('-a---', { a: action });
      const response = cold('-b|', { b: testEntity1 });
      const expected = cold('--c', { c: completion });

      testService.delete.and.returnValue(response);

      expect(effects.deleteTest$).toBeObservable(expected);
    });

    it('should return a DeleteFailure action if the service throws', () => {
      const action = new crudActions.DeleteAction<TestEntity, number>(
        TestEntity,
        testEntity1
      );
      const completion = new crudActions.DeleteFailureAction<
        TestEntity,
        number
      >(TestEntity, testEntity1);

      actions$ = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });

      testService.delete.and.returnValue(response);

      expect(effects.deleteTest$).toBeObservable(expected);
    });
  });
});
