import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { User, ListedItems, Command } from '../../models/index';

import { UsersService, ListedItemsService } from '../../services/index';

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
  private commandSub$: any;

  //Commands list stuff
  commands: ListedItems<Command>;
  pageNumber: number;
  pageCount: number;

  constructor(private route: ActivatedRoute, private userService: UsersService, private listedItemsService: ListedItemsService) {
    this.username = route.snapshot.params['username'];
  }

  ngOnInit() {
    this.loadUser();
  }

  loadCommands(userid: number, pageNumber?: number) {
    this.commandSub$ = this.listedItemsService.getItemsFromPage<Command>("http://localhost:5000/orders/users/"+userid, pageNumber)
                           .subscribe(commands => {
                             this.commands = commands;
                             this.pageNumber = commands.pageNumber;
                             this.pageCount = commands.pageCnt;
                           },
                           err => { console.log(err); }
                         );
  }

  loadUser() {
    this.user$ = this.userService.getUser("http://localhost:5000/users/login/", this.username)
        .subscribe(
            user => { this.user = user; this.fullname = user.FirstName + " " + user.LastName; this.loadCommands(user.Id); },
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
    if(this.model.oldpwd && this.model.pwd && this.model.pwdConfirm) {
      console.log(this.model);
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
  }

  goToNextPage() {
    if(this.pageNumber < this.pageCount - 1) {
      this.loadCommands(this.user.Id, this.pageNumber+1);
    }
  }

  gotToPreviousPage() {
    if(this.pageNumber != 0) {
      this.loadCommands(this.user.Id, this.pageNumber-1);
    }
  }

  gotToFirstPage() {
    if(this.pageNumber != 0) {
      this.loadCommands(this.user.Id, 0);
    }
  }

  goToLastPage() {
    if(this.pageNumber != (this.pageCount - 1)) {
      this.loadCommands(this.user.Id, this.pageCount - 1);
    }
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
