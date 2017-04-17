import { Component, OnInit } from '@angular/core';

import { ListedItems, User } from '../../../models/index';

import { UsersService, ListedItemsService } from '../../../services/index';

import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  templateUrl: 'app/templates/admin/users/admin-users.html'
})
export class AdminUsersComponent {
  // This will be accessible with /admin/products

  users: User[];
  users$: any;

  usernameControl = new FormControl();

  selected: number;

  selectedUser: User;

  constructor(private productsService: UsersService, private listedItemsService: ListedItemsService) {
  }

  ngOnInit() {
    this.usernameControl.valueChanges.debounceTime(500).subscribe(newValue => newValue ? this.loadUsers("http://localhost:5000/users", newValue): this.loadUsers("http://localhost:5000/users"))
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

  ngOnDestroy() {
    if(this.users$) { this.users$.unsubscribe(); }
  }

}
