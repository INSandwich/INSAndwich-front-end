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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    console.log(Md5.hashStr(this.model.password));
    this.authService.login(this.model.username, String(Md5.hashStr(this.model.password)))
                .subscribe(
                    data => {
                        console.log(data);
                    },
                    error => {
                        console.log(error);
                    });
  }

}
