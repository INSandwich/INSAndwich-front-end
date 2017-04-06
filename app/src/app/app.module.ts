import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import {
  NotFoundComponent,
  AdminComponent,
  CheckoutComponent,
  DessertComponent,
  DessertsComponent,
  DrinkComponent,
  DrinksComponent,
  FooterComponent,
  HeaderComponent,
  HomeComponent,
  LoginComponent,
  ProfileComponent,
  RegisterComponent,
  SandwichComponent,
  SandwichesComponent,
  TermsComponent } from './components/index';

import { MDLDirective } from './directives/mdl/mdl.directive';

import { AppRoutingModule } from './app-routing.module';

import { ListedItemsModule } from './modules/index';

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, ListedItemsModule ],
  declarations: [ NotFoundComponent,
                  AdminComponent,
                  AppComponent,
                  CheckoutComponent,
                  DessertComponent,
                  /*DessertsComponent,*/
                  DrinkComponent,
                  /*DrinksComponent,*/
                  FooterComponent,
                  HeaderComponent,
                  HomeComponent,
                  LoginComponent,
                  MDLDirective,
                  ProfileComponent,
                  RegisterComponent,
                  SandwichComponent,
                  /*SandwichesComponent,*/
                  TermsComponent
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
