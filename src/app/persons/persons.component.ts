import { Component, OnInit } from '@angular/core';
import * as PersonActions from './+state/persons.actions';
import * as PersonsReducer from './+state/persons.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
  providers: []
})
export class PersonsComponent implements OnInit {
  constructor(private store: Store<PersonsReducer.AppState>) {}

  ngOnInit() {}
}
