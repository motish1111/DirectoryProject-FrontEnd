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
  persons: [
    new Person(
      1,
      'Motish',
      'motish.mehta@varian.com',
      new Date('11/11/1997'),
      'India'
    ),
    new Person(
      2,
      'Atul',
      'atul.gunjal@varian.com',
      new Date('07/01/1997'),
      'India'
    )
  ]
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
    case PersonActions.ADD_PERSON:
      return {
        ...state,
        persons: [...state.persons, action.payload]
      };
    case PersonActions.ADD_PERSONS:
      return {
        ...state,
        persons: [...state.persons, ...action.payload]
      };
    case PersonActions.UPDATE_PERSON:
      // const updatedindex = state.persons.findIndex(iperson => {
      //   return iperson.id === action.payload.index;
      // });
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
    case PersonActions.DELETE_PERSON:
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
