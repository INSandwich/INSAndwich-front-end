import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { RouterModule } from '@angular/router'

import { TruncatePipe } from '../../directives/index';

import { DessertsComponent, SandwichesComponent, DrinksComponent } from '../../components/index';

import { ListedItemsService } from '../../services/index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule
  ],
  declarations: [
    DessertsComponent,
    SandwichesComponent,
    DrinksComponent,
    TruncatePipe
  ],
  providers: [
    ListedItemsService, TruncatePipe
  ],
  exports:[
    DessertsComponent,
    SandwichesComponent,
    DrinksComponent
  ]

})
export class ListedItemsModule {
}
