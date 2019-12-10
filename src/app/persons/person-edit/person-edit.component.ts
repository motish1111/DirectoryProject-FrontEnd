import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Person } from '../person.model';
import { Store } from '@ngrx/store';
import * as PersonActions from '../+state/persons.actions';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {
  personId: number;
  editMode = false;
  personForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ persons: { persons: Person[] } }>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.personId = +params.id;
        this.editMode = true;
      } else {
        console.log('new Person');
      }
    });
    console.log('formInit');
    this.initForm();
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new PersonActions.UpdatePersonAction({
          index: this.personId,
          person: this.personForm.value
        })
      );
    } else {
      this.store.dispatch(
        new PersonActions.AddPersonAction(this.personForm.value)
      );
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  initForm() {
    let personName = '';
    let personEmail = '';
    let personDOB: Date;
    let personCountry = '';

    if (this.editMode) {
      const person = new Person(
        1,
        'motish',
        'qwerty',
        new Date('11/11/1997'),
        'India'
      );
      personName = person.name;
      personEmail = person.email;
      personDOB = person.dob;
      personCountry = person.country;
    }
    this.personForm = new FormGroup({
      name: new FormControl(personName, Validators.required),
      email: new FormControl(personEmail, [
        Validators.required,
        Validators.email
      ]),
      dob: new FormControl(
        personDOB
          ? personDOB.getFullYear() +
            '-' +
            personDOB.getMonth() +
            '-' +
            personDOB.getDate()
          : null,
        Validators.required
      ),
      country: new FormControl(personCountry)
    });
  }
}
