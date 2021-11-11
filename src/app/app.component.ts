import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import * as AppActions from './app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'polling-ngrx';

  constructor(private store: Store<State>) {}

  startPolling(): void {
    this.store.dispatch(AppActions.startPolling());
  }

  stopPolling(): void {
    this.store.dispatch(AppActions.stopPolling());
  }

  setParams(): void {
    const randomNumber = Math.trunc(Math.random() * 100);
    const description = `Random number is ${randomNumber}`;
    this.store.dispatch(
      AppActions.setParameters({ parameters: { randomNumber, description } })
    );
  }
}
