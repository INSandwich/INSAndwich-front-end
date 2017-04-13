import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppRoutingModule } from '../../app-routing.module';

import { ProductComponent } from '../../components/index';

import { ProductsService } from '../../services/index';

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
    ProductComponent
  ],
  providers: [
    ProductsService
  ],
  exports:[
    ProductComponent
  ]
})
export class ProductsModule {
}
