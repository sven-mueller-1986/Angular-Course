import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeWrapperComponent } from './components/recipe-book/recipe-wrapper/recipe-wrapper.component';
import { ShoppingListComponent } from './components/shopping/shopping-list/shopping-list.component';
import { RecipeStartComponent } from './components/recipe-book/recipe-start/recipe-start.component';
import { RecipeDetailsComponent } from './components/recipe-book/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './components/recipe-book/recipe-edit/recipe-edit.component';
import { AccountComponent } from './components/core/account/account.component';
import { LandingComponent } from './components/core/landing/landing.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'recipe', component: RecipeWrapperComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailsComponent },
      { path: ':id/edit', component: RecipeEditComponent }
  ]},
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
