import { Component } from '@angular/core';

import { AppState } from './models/index';

@Component({
  selector: 'insandwich',
  templateUrl: "app/app.html"
})
export class AppComponent  {
  constructor(public appstate: AppState) {
    
  }

}
