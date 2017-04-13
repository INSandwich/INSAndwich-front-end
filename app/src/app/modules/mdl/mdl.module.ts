import { NgModule }      from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { MDLDirective } from '../../directives/index';

@NgModule({
  imports: [BrowserModule,
      FormsModule,
      HttpModule,
      JsonpModule
  ],
  declarations: [MDLDirective],
  exports: [MDLDirective]
})
export class MDLModule {

}
