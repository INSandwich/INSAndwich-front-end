import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { AdminGuard, AuthGuard } from './guards/index';

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
  TermsComponent,
  UnauthorizedComponent } from './components/index';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'desserts/:id', component: DessertComponent },
  { path: 'desserts', component: DessertsComponent },
  { path: 'drinks/:id', component: DrinkComponent },
  { path: 'drinks', component: DrinksComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuard] }, 
  { path: 'register', component: RegisterComponent },
  { path: 'sandwiches/:id', component: SandwichComponent },
  { path: 'sandwiches', component: SandwichesComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
