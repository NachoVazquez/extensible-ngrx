import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as actions from '../actions/router.actions';
import { tap, map } from 'rxjs/operators';
import { RouteModel } from '../../models/route.model';

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private router: Router) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public navigate$ = this.actions$.pipe(
    ofType(actions.GO),
    map((action: actions.GoAction) => action.payload),
    tap((route: RouteModel) => {
      return (
        this.router
          // tslint:disable-next-line:max-line-length
          .navigate(route.path, { ...route.query, ...route.extras })
          .catch(x => this.router.navigate(['error']))
      );
    })
  );
}
