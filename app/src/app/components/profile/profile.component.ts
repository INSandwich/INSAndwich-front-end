import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { User } from '../../models/index';

import { UsersService } from '../../services/index';

import { Md5 } from 'ts-md5/dist/md5';

@Component({
  templateUrl: 'app/templates/profile/profile.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  // Accessible thru /profile/:username
  username: string;
  user: User;
  model: any = {};

  displayModificationSuccess: boolean = false;
  displayError: boolean = false;

  displayPasswordModificationSuccess: boolean = false;
  displayPasswordModificationError: boolean = false;

  errorMessage: string = "";
  pwdModificationErrorMessage: string = "";

  fullname: string;

  private user$: any;
  private postUser$: any;
  private passwordChangeSub$: any;

  // This is a mock
  commands: listedItems<Command> = {
    pageCnt: 5,
    pageSize: 10,
    pageNumber: 0,
    items: [
      {
        id: 45879,
        totalPrice: 6.5,
        totalQuantity: 3,
        creationDate: "04/05/2017"
      },{
        id: 45869,
        totalPrice: 50.5,
        totalQuantity: 10,
        creationDate: "14/04/2017"
      },{
        id: 45861,
        totalPrice: 2.5,
        totalQuantity: 1,
        creationDate: "10/04/2017"
      },{
        id: 41506,
        totalPrice: 0.5,
        totalQuantity: 1,
        creationDate: "09/04/2017"
      },{
        id: 38563,
        totalPrice: 3.5,
        totalQuantity: 2,
        creationDate: "01/03/2017"
      },{
        id: 24568,
        totalPrice: 5.5,
        totalQuantity: 3,
        creationDate: "27/02/2017"
      },{
        id: 23568,
        totalPrice: 6.5,
        totalQuantity: 3,
        creationDate: "04/02/2017"
      },{
        id: 214578,
        totalPrice: 16.5,
        totalQuantity: 8,
        creationDate: "12/01/2017"
      },{
        id: 21112,
        totalPrice: 0.5,
        totalQuantity: 1,
        creationDate: "11/01/2017"
      },{
        id: 12345,
        totalPrice: 7.5,
        totalQuantity: 4,
        creationDate: "7/12/2016" 
      },
    ]
  }

  constructor(private route: ActivatedRoute, private userService: UsersService) {
    this.username = route.snapshot.params['username'];
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.user$ = this.userService.getUser("http://localhost:5000/users/login/", this.username)
        .subscribe(
            user => { this.user = user; this.fullname = user.FirstName + " " + user.LastName;  },
            err => { console.log(err); }
        );
  }

  updateUserInfos() {
    this.postUser$ = this.userService.updateInfos("http://localhost:5000/users/"+this.user.Id+"/update-info", this.user)
        .subscribe(
          user => {  this.user = user; this.fullname = user.FirstName + " " + user.LastName; this.toggleSuccessDisplay(); },
          error => { this.displayError = true; this.errorMessage = error.detail; console.log(error);}
        );
  }

  updatePassword() {
    if(this.model.pwd != this.model.pwdConfirm) { this.pwdModificationErrorMessage="Les deux mots de passe ne correspondent pas."; this.displayPasswordModificationError = true; return; }
    console.log(String(Md5.hashStr(this.model.oldpwd)));
    console.log(this.user.Password);
    this.passwordChangeSub$ = this.userService
        .updatePassword("http://localhost:5000/users/"+this.user.Id+"/update-passw", String(Md5.hashStr(this.model.oldpwd)), String(Md5.hashStr(this.model.pwd)))
        .subscribe(
          data=>{ this.displayPasswordModificationSuccess = true; },
          error=>{ this.displayPasswordModificationError = true; this.pwdModificationErrorMessage = error.detail; console.log(error) }
        );
  }

  toggleSuccessDisplay() {
    this.displayModificationSuccess = !this.displayModificationSuccess;
  }

  ngOnDestroy() {
    if(this.user$) {this.user$.unsubscribe();}
    if(this.postUser$) {this.postUser$.unsubscribe();}
    if(this.passwordChangeSub$) {this.passwordChangeSub$.unsubscribe();}
  }

}
