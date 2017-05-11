import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService, NotifService } from '../../services/index';

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

  constructor(private usersService: UsersService, private router: Router, private notifService: NotifService) {}

  register() {
    if (this.model.passwordConfirm == this.model.password) {
      this.usersService.createUser('http://localhost:5000/users', this.model.firstname, this.model.lastname, this.model.email, this.model.login, String(Md5.hashStr(this.model.password)), this.model.adresse)
                       .subscribe(
                          data => {
                            this.notifService.open("Création de compte", "Votre compte a bien été crée.", true);
                            this.router.navigate(['/login']);
                          },
                          error => {
                            this.notifService.open("Création de compte", error.json().detail, false);
                          });
    }
    else {
      this.notifService.open("Création de compte", "Les deux mots de passe ne correspondent pas.", false);
    }
  }

  ngOnDestroy() {
      this.userCreateSub$ ? this.userCreateSub$.unsubscribe() : null;
  }

}
