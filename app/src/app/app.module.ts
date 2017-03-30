import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { HeaderComponent, HomeComponent, NotFoundComponent } from './components/index';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule ],
  declarations: [ AppComponent, HeaderComponent, HomeComponent, NotFoundComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
