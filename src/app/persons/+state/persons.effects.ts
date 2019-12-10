import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as PersonActions from './persons.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Person } from '../person.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class PersonsEffects {
  @Effect()
  loadPersons$ = this.actions$.pipe(
    ofType(PersonActions.LOAD_PERSONS),
    switchMap(() => {
      return this.http.get<Person[]>('https://localhost:5001/api/persons').pipe(
        map(resData => {
          return new PersonActions.LoadPersonsSuccess(resData);
        }),
        catchError(error => {
          console.log('error');
          return of();
        })
      );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
