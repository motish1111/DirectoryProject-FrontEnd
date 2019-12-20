import { Component, OnInit } from '@angular/core';
import { Person } from '../person.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PersonActions from '../+state/persons.actions';
import * as PersonsReducer from '../+state/persons.reducer';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  persons: Observable<{ persons: Person[] }>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<PersonsReducer.AppState>
  ) {}

  ngOnInit() {
    this.persons = this.store.select('persons');
  }

  addPerson() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
