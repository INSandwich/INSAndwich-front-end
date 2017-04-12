import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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

import { AppRoutingModule } from './app-routing.module';

import { ListedItemsModule, AuthModule } from './modules/index';

@NgModule({
  imports:      [
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    FormsModule,
    ListedItemsModule
  ],
  // This should change, as we add modules
  declarations: [ NotFoundComponent,
                  AdminComponent,
                  AppComponent,
                  CheckoutComponent,
                  DessertComponent,
                  DrinkComponent,
                  FooterComponent,
                  HeaderComponent,
                  HomeComponent,
                  ProfileComponent,
                  RegisterComponent,
                  SandwichComponent,
                  TermsComponent
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
