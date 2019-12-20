import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsComponent } from './persons.component';
import { PersonListComponent } from './person-list/person-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PersonListItemComponent } from './person-list/person-list-item/person-list-item.component';
import * as PersonsReducer from './+state/persons.reducer';
import { StoreModule } from '@ngrx/store';

describe('PersonsComponent', () => {
  let component: PersonsComponent;
  let fixture: ComponentFixture<PersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({ persons: PersonsReducer.personsReducer })
      ],
      declarations: [
        PersonsComponent,
        PersonListComponent,
        PersonListItemComponent
      ],
      providers: []
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
