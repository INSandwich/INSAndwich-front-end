import { Component } from '@angular/core';

import { HeaderComponent } from './components/index';

import { MDLDirective } from './directives/index';

@Component({
  selector: 'insandwich',
  directives: [ MDLDirective ],
  templateUrl: "app/app.html"
})
export class AppComponent  { }
