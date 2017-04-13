import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ProfileComponent } from '../../components/index';

import { UsersService } from '../../services/index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [
    UsersService
  ],
  exports:[
    ProfileComponent
  ]

})
export class UsersModule {
}