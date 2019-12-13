import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonListComponent } from './person-list.component';
import { PersonListItemComponent } from './person-list-item/person-list-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Person } from '../person.model';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as PersonActions from '../+state/persons.actions';
import * as PersonsReducer from '../+state/persons.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PersonsEffects } from '../+state/persons.effects';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('PersonListComponent', () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;
  let store: Store<PersonsReducer.AppState>;
  let http: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({ persons: PersonsReducer.personsReducer }),
        EffectsModule.forRoot([PersonsEffects]),
        HttpClientModule
      ],
      declarations: [PersonListComponent, PersonListItemComponent],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.debugElement.componentInstance;
    store = TestBed.get(Store);
    http = TestBed.get(HttpClient);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should be Empty initially', () => {
    let lpersonList = [
      new Person(
        1,
        'Motish',
        'motish.mehta@varian.com',
        new Date('11/11/1997'),
        'India'
      )
    ];
    component.persons.subscribe(personList => {
      lpersonList = personList.persons;
      console.log('---------------------');
    });
    console.log(lpersonList);
    expect(lpersonList).toStrictEqual([]);
  });

  it('loadAll() should return empty list with success == true', async done => {
    jest
      .spyOn(http, 'get')
      .mockReturnValue(
        of([
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
        ])
      );

    component.ngOnInit();
    fixture.detectChanges();

    let lpersonList = [];
    component.persons.subscribe(personList => {
      lpersonList = personList.persons;
    });
    console.log(lpersonList);
    expect(lpersonList).not.toStrictEqual([]);

    expect(component.persons).not.toBeNull();
    done();
  });
});
