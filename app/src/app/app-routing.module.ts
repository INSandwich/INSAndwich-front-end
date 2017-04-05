import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import {
  NotFoundComponent,
  AdminComponent,
  CheckoutComponent,
  DessertComponent,
  DessertsComponent,
  DrinkComponent,
  DrinksComponent,
  HomeComponent,
  LoginComponent,
  ProfileComponent,
  RegisterComponent,
  SandwichComponent,
  SandwichesComponent,
  TermsComponent } from './components/index';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'desserts/:id', component: DessertComponent },
  { path: 'desserts', component: DessertsComponent },
  { path: 'drinks/:id', component: DrinkComponent },
  { path: 'drinks', component: DrinksComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sandwiches/:id', component: SandwichComponent },
  { path: 'sandwiches', component: SandwichesComponent },
  { path: 'terms', component: TermsComponent },
  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
