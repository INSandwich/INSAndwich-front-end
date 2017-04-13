import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../services/index';

import { Md5 } from 'ts-md5/dist/md5';

@Component({
  templateUrl: 'app/templates/register/register.html'
})
export class RegisterComponent {
  // This component will be used for the user to create an account

  model: any = {};
  displayError: boolean = false;
  errorMessage: string = "";

  constructor(private usersService: UsersService, private router: Router) {}

  register() {
    this.usersService.createUser('http://localhost:5000/users', this.model.firstname, this.model.lastname, this.model.email, this.model.login, String(Md5.hashStr(this.model.password)), this.model.adresse)
                     .subscribe(
                        data => { this.router.navigate(['/home']); console.log(data) },
                        err => { console.log(err);});
  }

}
