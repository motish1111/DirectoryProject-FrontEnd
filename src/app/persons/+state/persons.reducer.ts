import { Person } from '../person.model';
import { Action } from '@ngrx/store';
import * as PersonActions from './persons.actions';
import { isQuote } from '@angular/compiler';

const initialState = {
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
      const person = state.persons.find(iperson => {
        return iperson.id === action.payload.index;
      });
      const updatedPerson = {
        ...person,
        ...action.payload.person
      };

      const updatedPersons = {
        ...state.persons
      };

      updatedPersons[action.payload.index] = updatedPerson;

      return {
        ...state,
        persons: updatedPersons
      };
    case PersonActions.DELETE_PERSON:
      return {
        ...state,
        persons: state.persons.filter(ig => {
          return ig.id !== action.payload;
        })
      };
    default:
      return state;
  }
}
