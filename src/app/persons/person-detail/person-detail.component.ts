import { Component, OnInit } from '@angular/core';
import { Person } from '../person.model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  person: Person;

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.personService
      .getPersonsList()
      .subscribe(persons => (this.person = persons[0]));
  }
  onDeletePerson() {}
}
