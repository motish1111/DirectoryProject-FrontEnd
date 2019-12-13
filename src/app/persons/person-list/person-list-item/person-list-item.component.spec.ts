import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PersonListItemComponent } from './person-list-item.component';
import { Person } from '../../person.model';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('PersonListItemComponent', () => {
  let component: PersonListItemComponent;
  let fixture: ComponentFixture<PersonListItemComponent>;

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
      declarations: [PersonListItemComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListItemComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
