import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppRoutingModule } from '../../app-routing.module';

import { CheckoutComponent } from '../../components/index';

import { CommandsService } from '../../services/index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule
    //MDLModule
  ],
  declarations: [
    CheckoutComponent
  ],
  providers: [
    CommandsService
  ],
  exports:[
    CheckoutComponent
  ]
})
export class CommandsModule {
}
