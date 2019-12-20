import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as PersonActions from './persons.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Person } from '../person.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class PersonsEffects {
  private $baseUrl = environment.API_URL;

  @Effect()
  loadPersons$ = this.actions$.pipe(
    ofType(PersonActions.LOAD_PERSONS),
    switchMap(() => {
      return this.http.get<Person[]>(this.$baseUrl + '/api/persons').pipe(
        map(resData => {
          return new PersonActions.LoadPersonsSuccess(resData);
        }),
        catchError(error => {
          return of();
        })
      );
    })
  );

  @Effect()
  AddPerson$ = this.actions$.pipe(
    ofType(PersonActions.ADD_PERSON),
    switchMap((data: PersonActions.AddPerson) => {
      return this.http
        .post<Person>(this.$baseUrl + '/api/persons', data.payload)
        .pipe(
          map(resData => {
            return new PersonActions.AddPersonSuccess(resData);
          }),
          catchError(error => {
            console.log('error');
            return of();
          })
        );
    })
  );

  @Effect()
  UpdatePerson$ = this.actions$.pipe(
    ofType(PersonActions.UPDATE_PERSON),
    switchMap((data: PersonActions.UpdatePerson) => {
      console.log('Update');
      console.log(data.payload);
      return this.http
        .put<Person>(
          this.$baseUrl + '/api/persons/' + data.payload.person.id,
          data.payload.person
        )
        .pipe(
          map(resData => {
            return new PersonActions.UpdatePersonSuccess({
              index: data.payload.index,
              person: resData
            });
          }),
          catchError(error => {
            console.log('error');
            return of();
          })
        );
    })
  );

  @Effect()
  DeletePerson$ = this.actions$.pipe(
    ofType(PersonActions.DELETE_PERSON),
    switchMap((data: PersonActions.DeletePerson) => {
      console.log('Delete');
      return this.http
        .delete<Person>(this.$baseUrl + '/api/persons/' + data.payload.id)
        .pipe(
          map(resData => {
            return new PersonActions.DeletePersonSuccess(data.payload.index);
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
