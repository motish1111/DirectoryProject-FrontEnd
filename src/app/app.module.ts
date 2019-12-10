import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PersonsComponent } from './persons/persons.component';
import { PersonStartComponent } from './persons/person-start/person-start.component';
import { PersonDetailComponent } from './persons/person-detail/person-detail.component';
import { PersonEditComponent } from './persons/person-edit/person-edit.component';
import { PersonListComponent } from './persons/person-list/person-list.component';
import { PersonListItemComponent } from './persons/person-list/person-list-item/person-list-item.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown/dropdown.directive';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { personsReducer } from './persons/+state/persons.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { AgePipe } from './age.pipe';
import { EffectsModule } from '@ngrx/effects';
import { PersonsEffects } from './persons/+state/persons.effects';

@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    PersonStartComponent,
    PersonDetailComponent,
    PersonEditComponent,
    PersonListComponent,
    PersonListItemComponent,
    HeaderComponent,
    DropdownDirective,
    AgePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ persons: personsReducer }),
    EffectsModule.forRoot([PersonsEffects]),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
