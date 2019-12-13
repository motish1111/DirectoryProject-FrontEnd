import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEditComponent } from './person-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Person } from '../person.model';
import { ActivatedRoute } from '@angular/router';

describe('PersonEditComponent', () => {
  let component: PersonEditComponent;
  let fixture: ComponentFixture<PersonEditComponent>;
  let route: ActivatedRoute;

  const initialState = {
    persons: [
      new Person(
        1,
        'Motish',
        'motish.mehta@varian.com',
        new Date('11/11/1997'),
        'India'
      ),
      new Person(
        2,
        'Atul',
        'atul.gunjal@varian.com',
        new Date('07/01/1997'),
        'India'
      )
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [PersonEditComponent],
      providers: [provideMockStore({ initialState })]
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
