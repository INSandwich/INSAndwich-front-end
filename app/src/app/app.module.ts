import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';

import { ModalComponent } from './components/index';
import { ModalService } from './services/index';

import {
  NotFoundComponent,
  AdminComponent,
  AdminUsersComponent,
  AdminProductsComponent,
  CheckoutComponent,
  DessertsComponent,
  DrinksComponent,
  FooterComponent,
  HeaderComponent,
  HomeComponent,
  LoginComponent,
  ProfileComponent,
  RegisterComponent,
  SandstormComponent,
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
    ReactiveFormsModule,
    UsersModule,
    ProductsModule
  ],
  // This should change, as we add modules
  declarations: [ NotFoundComponent,
                  AdminComponent,
                  AdminUsersComponent,
                  AdminProductsComponent,
                  AppComponent,
                  CheckoutComponent,
                  FooterComponent,
                  HeaderComponent,
                  HomeComponent,
                  SandstormComponent,
                  RegisterComponent,
                  TermsComponent,
                  UnauthorizedComponent,
                  MDLDirective,
                  ModalComponent
                ],
  providers: [    AppState,
                  AdminGuard,
                  AuthGuard,
                  ModalService
             ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
