import { Action } from '@ngrx/store';
import { Person } from '../person.model';

export const ADD_PERSON = '[Persons] Add Person';
export const ADD_PERSONS = '[Persons] Add Persons';
export const UPDATE_PERSON = '[Persons] Update Person';
export const DELETE_PERSON = '[Persons] Delete Person';

export class AddPersonAction implements Action {
  readonly type = ADD_PERSON;
  constructor(public payload: Person) {}
}

export class AddPersonsAction implements Action {
  readonly type = ADD_PERSONS;
  constructor(public payload: Person[]) {}
}

export class UpdatePersonAction implements Action {
  readonly type = UPDATE_PERSON;
  constructor(public payload: { index: number; person: Person }) {}
}

export class DeletePersonAction implements Action {
  readonly type = DELETE_PERSON;
  constructor(public payload: number) {}
}

export type PersonActions =
  | AddPersonAction
  | AddPersonsAction
  | UpdatePersonAction
  | DeletePersonAction;
