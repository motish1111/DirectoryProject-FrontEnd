import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonEditComponent } from './persons/person-edit/person-edit.component';
import { PersonDetailComponent } from './persons/person-detail/person-detail.component';
import { PersonStartComponent } from './persons/person-start/person-start.component';

// const appRoutes: Routes = [
//   { path: '', pathMatch: 'full', redirectTo: '/recipes' },
//   {
//     path: 'recipes',
//     component: RecipesComponent,
//     children: [
//       { path: '', pathMatch: 'full', component: RecipeStartComponent },
//       { path: 'new', component: RecipeEditComponent },
//       { path: ':id', component: RecipeDetailComponent },
//       { path: ':id/edit', component: RecipeEditComponent }
//     ]
//   },
//   { path: 'shopping-list', component: ShoppingListComponent }
// ];

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'persons' },
  {
    path: 'persons',
    component: PersonsComponent,
    children: [
      { path: '', pathMatch: 'full', component: PersonStartComponent },
      { path: 'new', component: PersonEditComponent },
      { path: ':id', component: PersonDetailComponent },
      { path: ':id/edit', component: PersonEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
