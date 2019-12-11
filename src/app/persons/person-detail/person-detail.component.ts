import { Component, OnInit } from '@angular/core';
import { Person } from '../person.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  person: Person;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) {}

  ngOnInit() {
    this.getPerson();
    this.personService.personListChanged.subscribe(() => this.getPerson());
  }

  getPerson() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.personService.getPerson(this.id).subscribe(person => {
        if (person) {
          this.person = person;
        } else {
          this.router.navigate(['..'], { relativeTo: this.route });
        }
      });
    });
  }

  onDeletePerson() {
    this.person = null;
    // this.store.dispatch(new PersonActions.DeletePersonAction(this.index));
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
