import { Component, OnInit } from '@angular/core';
import { Person } from '../person.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from '../person.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  persons: Observable<Person[]>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personService: PersonService
  ) {}

  ngOnInit() {
    this.getPersonList();
    this.personService.personListChanged.subscribe(() => {
      this.getPersonList();
    });
  }

  getPersonList() {
    this.persons = this.personService.getPersonsList();
  }

  addPerson() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
