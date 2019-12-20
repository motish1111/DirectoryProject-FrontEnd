import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEditComponent } from './person-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as PersonsReducer from '../+state/persons.reducer';

describe('PersonEditComponent', () => {
  let component: PersonEditComponent;
  let fixture: ComponentFixture<PersonEditComponent>;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({ persons: PersonsReducer.personsReducer })
      ],
      declarations: [PersonEditComponent],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEditComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    route = TestBed.get(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    expect(component.personForm.valid).toBeFalsy();
  });

  it('should be invalid when empty', () => {
    expect(component.personForm.valid).toBeFalsy();
  });

  it('should be valid when filled', () => {
    component.personForm.setValue({
      name: 'Motish Mehta',
      email: 'motish.mehta@varian.com',
      dob: new Date('11-11-1997'),
      country: ''
    });
    expect(component.personForm.valid).toBeTruthy();
  });
});
