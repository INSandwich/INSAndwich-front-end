import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import {
  NotFoundComponent,
  CheckoutComponent,
  DessertComponent,
  DessertsComponent,
  DrinkComponent,
  DrinksComponent,
  HeaderComponent,
  HomeComponent,
  LoginComponent,
  ProfileComponent,
  RegisterComponent,
  SandwichComponent,
  SandwichesComponent } from './components/index';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule ],
  declarations: [ NotFoundComponent,
                  AppComponent,
                  CheckoutComponent,
                  DessertComponent,
                  DessertsComponent,
                  DrinkComponent,
                  DrinksComponent,
                  HeaderComponent,
                  HomeComponent,
                  LoginComponent,
                  ProfileComponent,
                  RegisterComponent,
                  SandwichComponent,
                  SandwichesComponent
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
