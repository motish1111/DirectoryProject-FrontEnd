import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../person.model';

@Component({
  selector: 'app-person-list-item',
  templateUrl: './person-list-item.component.html',
  styleUrls: ['./person-list-item.component.scss']
})
export class PersonListItemComponent implements OnInit {
  @Input() person: Person;
  @Input() index: boolean;

  constructor() {}

  ngOnInit() {}
}
