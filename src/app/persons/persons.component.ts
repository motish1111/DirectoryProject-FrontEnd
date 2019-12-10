import { Component, OnInit } from '@angular/core';
import { PersonService } from './person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
  providers: [PersonService]
})
export class PersonsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
