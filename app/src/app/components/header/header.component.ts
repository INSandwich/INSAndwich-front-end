import { Component } from '@angular/core';

import { MDL } from '../../directives/index';

@Component({
  selector: 'insandwich-header',
  directives: [ MDL ],
  templateUrl: 'app/components/header/header.html',
})
export class HeaderComponent {

  mobile: boolean = false;

  toggleNav(): void {
    this.mobile = !this.mobile;
  }
}
