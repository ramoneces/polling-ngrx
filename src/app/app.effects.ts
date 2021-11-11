import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import * as AppActions from './app.actions';
import {
  concatMap,
  map,
  mapTo,
  mergeMap,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { interval, of, timer } from 'rxjs';
import { State } from './reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class AppEffects {
  setTimmer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.startPolling),
      switchMap(() => timer(0, 2000)),
      takeUntil(this.actions$.pipe(ofType(AppActions.stopPolling))),
      map(() => AppActions.firePolling())
    )
  );

  onPollingIteration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.firePolling),
      withLatestFrom(this.actions$.pipe(ofType(AppActions.setParameters))),
      concatMap(([makeRequestAction, setParametersAction]) => {
        console.log(
          'Back-end service is called with parameters: ',
          setParametersAction.parameters
        );
        return of(AppActions.makeRequest());
      })
    )
  );

  constructor(private actions$: Actions, private store$: Store<State>) {}
}
