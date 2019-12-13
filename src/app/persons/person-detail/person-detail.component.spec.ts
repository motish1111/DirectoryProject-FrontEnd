import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailComponent } from './person-detail.component';
import { AgePipe } from 'src/app/age.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Person } from '../person.model';

describe('PersonDetailComponent', () => {
  let component: PersonDetailComponent;
  let fixture: ComponentFixture<PersonDetailComponent>;

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
      declarations: [PersonDetailComponent, AgePipe],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
