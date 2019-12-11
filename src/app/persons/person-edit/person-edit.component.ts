import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PersonService } from '../person.service';
import { Observable } from 'rxjs';

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
    private personService: PersonService
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
      console.log('Updating ' + this.personForm.value);
      this.personService.updatePerson({
        ...this.personForm.value,
        dob: new Date(this.personForm.value.dob),
        id: this.personId
      });
    } else {
      this.personService.addPerson({
        ...this.personForm.value,
        dob: new Date(this.personForm.value.dob)
      });
    }

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  initForm() {
    this.personForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dob: new FormControl(null, Validators.required),
      country: new FormControl('')
    });
    // Fill Form //
    if (this.editMode) {
      this.route.params.subscribe((params: Params) => {
        const id = +params.id;
        this.personService.getPerson(id).subscribe(person => {
          const personDOB = new Date(person.dob);
          this.personForm.setValue({
            name: person.name,
            email: person.email,
            dob:
              personDOB.getFullYear() +
              '-' +
              (personDOB.getMonth() + 1 >= 10
                ? personDOB.getMonth() + 1
                : '0' + (personDOB.getMonth() + 1)) +
              '-' +
              (personDOB.getDate() >= 10
                ? personDOB.getDate()
                : '0' + personDOB.getDate()),
            country: person.country
          });
        });
      });
    }
  }
}
