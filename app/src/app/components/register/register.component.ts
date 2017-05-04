import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../services/index';

import { Md5 } from 'ts-md5/dist/md5';

@Component({
  templateUrl: 'app/templates/register/register.html'
})
export class RegisterComponent implements OnDestroy {
  // This component will be used for the user to create an account

  model: any = {};
  displayError: boolean = false;
  errorMessage: string = "";

  userCreateSub$: any;

  constructor(private usersService: UsersService, private router: Router) {}

  register() {
    if (this.model.passwordConfirm == this.model.password) {
      this.usersService.createUser('http://localhost:5000/users', this.model.firstname, this.model.lastname, this.model.email, this.model.login, String(Md5.hashStr(this.model.password)), this.model.adresse)
                       .subscribe(
                          data => { this.router.navigate(['/login']); console.log(data) },
                          error => { this.displayError = true;
                          this.errorMessage = error.json().detail;});
    }
    else {
      this.displayError = true;
      this.errorMessage = "Les deux mots de passe ne correspondent pas.";
    }
  }

  ngOnDestroy() {
      this.userCreateSub$ ? this.userCreateSub$.unsubscribe() : null;
  }

}
