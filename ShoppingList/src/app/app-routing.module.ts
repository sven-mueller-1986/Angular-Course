import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'account', loadChildren: () => import('./components/account/account.module').then(m => m.AccountModule) },
  { path: 'recipe', loadChildren: () => import('./components/recipe-book/recipe-book.module').then(m => m.RecipeBookModule) },
  { path: 'shopping-list', loadChildren: () => import('./components/shopping/shopping.module').then(m => m.ShoppingModule) }
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
