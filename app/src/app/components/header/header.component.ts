import { Component } from '@angular/core';

import { MDLDirective } from '../../directives/index';

@Component({
  selector: 'insandwich-header',
  templateUrl: 'app/templates/header/header.html'
})
export class HeaderComponent {

  mobile: boolean = false;

  toggleNav(): void {
    this.mobile = !this.mobile;
  }
}
