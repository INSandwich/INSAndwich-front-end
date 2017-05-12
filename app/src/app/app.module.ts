import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';

import { ModalComponent, NotificationsComponent } from './components/index';
import { ModalService, CommandsService, NotifService } from './services/index';

import {
  NotFoundComponent,
  AboutComponent,
  AdminComponent,
  AdminUsersComponent,
  AdminProductsComponent,
  CheckoutComponent,
  CommandComponent,
  DessertsComponent,
  DrinksComponent,
  FaqComponent,
  FooterComponent,
  HeaderComponent,
  HomeComponent,
  LoginComponent,
  PaymentComponent,
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
                  AboutComponent,
                  AdminComponent,
                  AdminUsersComponent,
                  AdminProductsComponent,
                  AppComponent,
                  CheckoutComponent,
                  CommandComponent,
                  FaqComponent,
                  FooterComponent,
                  HeaderComponent,
                  HomeComponent,
                  PaymentComponent,
                  SandstormComponent,
                  RegisterComponent,
                  TermsComponent,
                  UnauthorizedComponent,
                  MDLDirective,
                  ModalComponent,
                  NotificationsComponent
                ],
  providers: [    AppState,
                  AdminGuard,
                  AuthGuard,
                  ModalService,
                  CommandsService,
                  NotifService
             ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
