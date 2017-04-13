import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppRoutingModule } from '../../app-routing.module';

import { MDLModule } from '../index';

import { MDLDirective } from '../../directives/index';

import { LoginComponent } from '../../components/index';

import { AuthService } from '../../services/index';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    //MDLModule,
    AppRoutingModule
  ],
  declarations: [
    LoginComponent
    //MDLDirective
  ],
  providers: [
    AuthService
  ],
  exports:[
    LoginComponent
    //MDLDirective
  ]

})
export class AuthModule {
}
