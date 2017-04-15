import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { AdminGuard, AuthGuard } from './guards/index';

import {
  NotFoundComponent,
  AdminComponent,
  AdminProductsComponent,
  AdminUsersComponent,
  CheckoutComponent,
  DessertsComponent,
  DrinksComponent,
  HomeComponent,
  LoginComponent,
  ProductComponent,
  ProfileComponent,
  RegisterComponent,
  SandwichesComponent,
  TermsComponent,
  UnauthorizedComponent } from './components/index';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AdminGuard]},
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [AdminGuard]},
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductComponent },
  { path: 'desserts', component: DessertsComponent },
  { path: 'drinks', component: DrinksComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
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
