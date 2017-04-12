import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/index';

import { Md5 } from 'ts-md5/dist/md5';

@Component({
  templateUrl: 'app/templates/login/login.html'
})
export class LoginComponent implements OnInit {
  // Accessible thru /login
  // This component will be used for the user to log in
  model: any = {};
  displayError: boolean = false;
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.authService.login(this.model.login, String(Md5.hashStr(this.model.password)))
                .subscribe(
                    data => {
                          this.router.navigate(['/home']);
                    },
                    error => {
                      this.displayError = true;
                      this.errorMessage = error.json().detail;
                    });
  }

}
