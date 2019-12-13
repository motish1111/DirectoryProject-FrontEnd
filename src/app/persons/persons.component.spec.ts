import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsComponent } from './persons.component';
import { PersonListComponent } from './person-list/person-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PersonListItemComponent } from './person-list/person-list-item/person-list-item.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Person } from './person.model';

describe('PersonsComponent', () => {
  let component: PersonsComponent;
  let fixture: ComponentFixture<PersonsComponent>;

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
      imports: [RouterTestingModule],
      declarations: [
        PersonsComponent,
        PersonListComponent,
        PersonListItemComponent
      ],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
