import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, NotifService } from '../../services/index';

import { Md5 } from 'ts-md5/dist/md5';

@Component({
  templateUrl: 'app/templates/login/login.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  // Accessible thru /login
  // This component will be used for the user to log in
  model: any = {};
  displayError: boolean = false;
  errorMessage: string = "";

  authSub$: any;

  constructor(private authService: AuthService, private router: Router, private notifService: NotifService) {}

  ngOnInit() {
    this.authService.logout();
  }

  login() {

    if(this.model.login && this.model.password) {
      this.authSub$ = this.authService.login(this.model.login, String(Md5.hashStr(this.model.password)))
                  .subscribe(
                      data => { //console.log(data);
                            this.notifService.open("Authentification", "Connexion effectuée avec succès.", true);
                            this.router.navigate(['/home']);
                      },
                      error => {
                        //console.log(error);
                        this.notifService.open("Authentification", error.json().detail, false);
                      }
                    );
    }
    else {
      this.notifService.open("Authentification", "Veuillez remplir tous les champs.", false);
    }
  }

  ngOnDestroy() {
    this.authSub$ ? this.authSub$.unsubscribe() : null;
  }

}
