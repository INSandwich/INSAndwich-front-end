import { Component, OnInit } from '@angular/core';

import { ListedItems, User } from '../../../models/index';

import { UsersService, ListedItemsService } from '../../../services/index';

@Component({
  templateUrl: 'app/templates/admin/users/admin-users.html'
})
export class AdminUsersComponent {
  // This will be accessible with /admin/products

  users: User[];
  users$: any;

  userRoleModifSub$: any;
  userTokensModifSub$: any;

  usernameFilter: string;

  selected: number;

  selectedUser: User;

  // displays
  displayModifiationSuccess: boolean = false;
  displayModificationErr: boolean = false;

  modificationErrMsg: string = "";

  constructor(private usersService: UsersService, private listedItemsService: ListedItemsService) {
  }

  ngOnInit() {
    this.loadUsers("http://localhost:5000/users");
  }


  loadUsers(url: string, params?: string) {
    var newUrl = params ? url+"?login="+params : url;
    this.users$ = this.listedItemsService.getItems<User>(newUrl)
        .subscribe(
          listedItems => { this.users = listedItems.items; this.onSelect(this.users[0]);},
          err => { console.log(err); /*Handle error here, sometimes*/ }
        )
  }

  onSelect(user: User) {
    this.selectedUser = user;
    if (this.selected === user.Id) {
      this.selected = 0;
    }
    else {
      this.selected = user.Id;
    }
    console.log(user);
  }

  editUser() {
    if((Object.keys(this.selectedUser).length)!=9) {
        this.modificationError("Veuillez remplir tous les champs");
        return;
    }
    this.userRoleModifSub$ = this.usersService.updateUserRole("http://localhost:5000/users/"+this.selectedUser.Id+"/role", this.selectedUser.Role)
                                 .subscribe(
                                   response => { console.log(response); this.modificationSuccess(); },
                                   err => { console.log(err); this.modificationError(err.detail); }
                                 );
    this.userTokensModifSub$ = this.usersService.updateUserTokens("http://localhost:5000/users/"+this.selectedUser.Id+"/tokens", this.selectedUser.Tokens)
                                   .subscribe(
                                     response => { console.log(response); },
                                     err => { console.log(err); this.modificationError(err.detail); }
                                   );

  }

  modificationSuccess() {
    this.displayModifiationSuccess = true;
  }

  modificationError(err: string) {
    this.displayModificationErr = true;
    this.modificationErrMsg = err;
  }

  search(username: string) {
    this.loadUsers("http://localhost:5000/users", this.usernameFilter);
  }

  ngOnDestroy() {
    if(this.users$) { this.users$.unsubscribe(); }
  }

}
