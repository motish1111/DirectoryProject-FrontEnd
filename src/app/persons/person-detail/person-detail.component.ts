import { Component, OnInit } from '@angular/core';
import { Person } from '../person.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, Params } from '@angular/router';
import * as PersonActions from '../+state/persons.actions';
import * as PersonsReducer from '../+state/persons.reducer';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  person: Person;
  index: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<PersonsReducer.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index = +params.index;
      this.store.select('persons').subscribe(persons => {
        this.person = persons.persons[this.index];
        if (!this.person) {
          this.router.navigate(['..'], { relativeTo: this.route });
        }
      });
    });
  }
  onDeletePerson() {
    this.person = null;
    this.store.dispatch(new PersonActions.DeletePersonAction(this.index));
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
