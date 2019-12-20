import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Person } from '../person.model';
import { Store } from '@ngrx/store';
import * as PersonActions from '../+state/persons.actions';
import * as PersonsReducer from '../+state/persons.reducer';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {
  personIndex: number;
  personId: number;
  editMode = false;
  personForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<PersonsReducer.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.index) {
        this.personIndex = +params.index;
        this.editMode = true;
      } else {
        console.log('new Person');
      }
    });
    console.log('formInit');
    this.initForm();
  }

  getDobString(personDOB: Date): string {
    return (
      personDOB.getFullYear() +
      '-' +
      (personDOB.getMonth() + 1 >= 10
        ? personDOB.getMonth() + 1
        : '0' + (personDOB.getMonth() + 1)) +
      '-' +
      (personDOB.getDate() >= 10
        ? personDOB.getDate()
        : '0' + personDOB.getDate())
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new PersonActions.UpdatePerson({
          index: this.personIndex,
          person: {
            ...this.personForm.value,
            dob: new Date(this.personForm.value.dob),
            id: this.personId
          }
        })
      );
    } else {
      this.store.dispatch(new PersonActions.AddPerson(this.personForm.value));
    }
    this.router.navigate(['../'], { relativeTo: this.route });
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
      this.route.params.subscribe((params: Params) => {
        const index = +params.index;
        this.store.select('persons').subscribe(persons => {
          const person = persons.persons[index];
          personName = person.name;
          personEmail = person.email;
          personDOB = new Date(person.dob);
          personCountry = person.country;
          this.personId = person.id;
        });
      });
    }
    this.personForm = new FormGroup({
      name: new FormControl(personName, Validators.required),
      email: new FormControl(personEmail, [
        Validators.required,
        Validators.email
      ]),
      dob: new FormControl(
        personDOB ? this.getDobString(personDOB) : null,
        Validators.required
      ),
      country: new FormControl(personCountry)
    });
  }
}
