import { Person } from '../person.model';
import { Action } from '@ngrx/store';
import * as PersonActions from './persons.actions';
import { isQuote } from '@angular/compiler';

export interface State {
  persons: Person[];
}

export interface AppState {
  persons: State;
}

const initialState: State = {
  persons: []
};

export function personsReducer(
  state = initialState,
  action: PersonActions.PersonActions
) {
  switch (action.type) {
    case PersonActions.LOAD_PERSONS_SUCCESS:
      console.log('LOAD_PERSONS_SUCCESS');
      return {
        ...state,
        persons: [...action.payload]
      };
    case PersonActions.ADD_PERSON_SUCCEESS:
      return {
        ...state,
        persons: [...state.persons, action.payload]
      };
    case PersonActions.ADD_PERSONS:
      return {
        ...state,
        persons: [...state.persons, ...action.payload]
      };
    case PersonActions.UPDATE_PERSON_SUCCESS:
      const updatedindex = action.payload.index;
      const person = state.persons[updatedindex];
      let updatedPerson: Person = {
        ...person,
        ...action.payload.person
      };

      updatedPerson = updatedPerson as Person;

      const updatedPersons = [...state.persons];

      updatedPersons[updatedindex] = updatedPerson;

      return {
        ...state,
        persons: updatedPersons
      };
    case PersonActions.DELETE_PERSON_SUCCESS:
      return {
        ...state,
        persons: state.persons.filter((ig, igindex) => {
          // return ig.id !== action.payload;
          return igindex !== action.payload;
        })
      };
    default:
      return state;
  }
}
