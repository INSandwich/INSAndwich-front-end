import { Component, Input } from '@angular/core';

import { Router } from '@angular/router';

import { MDLDirective } from '../../directives/index';

import { AuthService } from '../../services/index';

@Component({
  selector: 'insandwich-header',
  templateUrl: 'app/templates/header/header.html'
})
export class HeaderComponent {

  @Input() isAuthentificated: boolean;
  @Input() username: string;

  constructor(private authService: AuthService, private router: Router) {

  }

  mobile: boolean = false;

  logout() {
    this.authService.logout();
    if(this.mobile) { this.toggleNav(); }
    this.router.navigate(['/home']);
  }

  toggleNav(): void {
    this.mobile = !this.mobile;
  }
}
