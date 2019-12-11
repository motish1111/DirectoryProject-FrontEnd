import { Action, createAction } from '@ngrx/store';
import { Person } from '../person.model';

export const ADD_PERSON = '[Persons] Add Person';
export const ADD_PERSON_SUCCEESS = '[Persons] Add Person Success';

export const ADD_PERSONS = '[Persons] Add Persons';

export const LOAD_PERSONS = '[Persons] Load Persons';
export const LOAD_PERSONS_SUCCESS = '[Persons] Load Persons Success';

export const UPDATE_PERSON = '[Persons] Update Person';
export const UPDATE_PERSON_SUCCESS = '[Persons] Update Person Success';

export const DELETE_PERSON = '[Persons] Delete Person';
export const DELETE_PERSON_SUCCESS = '[Persons] Delete Person Success';

export class AddPerson implements Action {
  readonly type = ADD_PERSON;
  constructor(public payload: Person) {}
}

export class AddPersonSuccess implements Action {
  readonly type = ADD_PERSON_SUCCEESS;
  constructor(public payload: Person) {}
}

export class AddPersonsAction implements Action {
  readonly type = ADD_PERSONS;
  constructor(public payload: Person[]) {}
}

export class LoadPersons implements Action {
  readonly type = LOAD_PERSONS;
}

export class LoadPersonsSuccess implements Action {
  readonly type = LOAD_PERSONS_SUCCESS;
  constructor(public payload: Person[]) {}
}

export class UpdatePerson implements Action {
  readonly type = UPDATE_PERSON;
  constructor(public payload: { index: number; person: Person }) {}
}

export class UpdatePersonSuccess implements Action {
  readonly type = UPDATE_PERSON_SUCCESS;
  constructor(public payload: { index: number; person: Person }) {}
}

export class DeletePerson implements Action {
  readonly type = DELETE_PERSON;
  constructor(public payload: { index: number; id: number }) {}
}

export class DeletePersonSuccess implements Action {
  readonly type = DELETE_PERSON_SUCCESS;
  constructor(public payload: number) {}
}

export type PersonActions =
  | AddPerson
  | AddPersonSuccess
  | AddPersonsAction
  | LoadPersons
  | LoadPersonsSuccess
  | UpdatePerson
  | UpdatePersonSuccess
  | DeletePerson
  | DeletePersonSuccess;
