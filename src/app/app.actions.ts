import { createAction, props } from '@ngrx/store';

export const startPolling = createAction('Start polling');

export const stopPolling = createAction('Stop polling');

export const firePolling = createAction('Fire polling');

export const setParameters = createAction(
  'Set parameters',
  props<{ parameters: { randomNumber: number; description: string } }>()
);

export const makeRequest = createAction('Make request');
