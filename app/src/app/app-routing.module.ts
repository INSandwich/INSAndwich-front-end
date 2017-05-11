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
  CommandComponent,
  DessertsComponent,
  DrinksComponent,
  FaqComponent,
  HomeComponent,
  LoginComponent,
  PaymentComponent,
  ProductComponent,
  ProfileComponent,
  RegisterComponent,
  SandstormComponent,
  SandwichesComponent,
  TermsComponent,
  UnauthorizedComponent } from './components/index';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AdminGuard]},
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [AdminGuard]},
  { path: 'checkout/:username/:userId', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'command/:username/:id', component: CommandComponent, canActivate: [AuthGuard]}, //canActivate: [AuthGuard] -> add user-id and command-id in route
  { path: 'pay/:username/:userId', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductComponent },
  { path: 'desserts', component: DessertsComponent },
  { path: 'drinks', component: DrinksComponent },
  { path: 'home', component: HomeComponent },
  { path: 'faq', component: FaqComponent},
  { path: 'login', component: LoginComponent },
  { path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'sandwiches', component: SandwichesComponent },
  { path: 'sandstorm', component: SandstormComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
