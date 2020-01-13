import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { personsReducer } from './persons/+state/persons.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { AgePipe } from './age.pipe';
import { EffectsModule } from '@ngrx/effects';
import { PersonsEffects } from './persons/+state/persons.effects';
import { ConfigService } from './config.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, ObservableInput, of, throwError } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';

export function load(
  http: HttpClient,
  config: ConfigService
): () => Promise<boolean> {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      http
        .get('./config.json')
        .pipe(
          map((x: ConfigService) => {
            if (x.baseUrl === '' || x.baseUrl === '$baseurl') {
              config.baseUrl = 'https://localhost:5001';
              console.warn('Server Url not set in environment. Using default');
            } else {
              config.baseUrl = x.baseUrl;
            }
            console.log('Configuring', config.baseUrl);
            resolve(true);
          }),
          catchError(
            (
              x: { status: number },
              caught: Observable<void>
            ): ObservableInput<{}> => {
              if (x.status !== 404) {
                resolve(false);
              }
              config.baseUrl = 'https://localhost:5001';
              resolve(true);
              return of({});
            }
          )
        )
        .subscribe();
    });
  };
}

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
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: load,
      multi: true,
      deps: [HttpClient, ConfigService]
    },
    { provide: APP_BASE_HREF, useValue: window['baseHref'] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
