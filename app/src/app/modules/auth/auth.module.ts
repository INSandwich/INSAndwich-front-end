import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppRoutingModule } from '../../app-routing.module';


import { LoginComponent } from '../../components/index';

import { AuthService } from '../../services/index';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService
  ],
  exports:[
    LoginComponent
  ]

})
export class AuthModule {
}
