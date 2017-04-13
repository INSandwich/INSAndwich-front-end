import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';

import {
  NotFoundComponent,
  AdminComponent,
  CheckoutComponent,
  DessertsComponent,
  DrinksComponent,
  FooterComponent,
  HeaderComponent,
  HomeComponent,
  LoginComponent,
  ProfileComponent,
  RegisterComponent,
  SandwichesComponent,
  TermsComponent,
  UnauthorizedComponent } from './components/index';

import { AppState } from './models/index';

import { AuthGuard, AdminGuard } from './guards/index';

import { MDLDirective } from './directives/index';

import { AppRoutingModule } from './app-routing.module';

import { ListedItemsModule, AuthModule, UsersModule, ProductsModule } from './modules/index';

@NgModule({
  imports:      [
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    FormsModule,
    ListedItemsModule,
    UsersModule,
    ProductsModule
  ],
  // This should change, as we add modules
  declarations: [ NotFoundComponent,
                  AdminComponent,
                  AppComponent,
                  CheckoutComponent,
                  FooterComponent,
                  HeaderComponent,
                  HomeComponent,
                  RegisterComponent,
                  TermsComponent,
                  UnauthorizedComponent,
                  MDLDirective
                ],
  providers: [    AppState,
                  AdminGuard,
                  AuthGuard
             ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
