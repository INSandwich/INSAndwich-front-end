import { Component, OnInit } from '@angular/core';

import { ListedItems, User } from '../../../models/index';

import { UsersService, ListedItemsService } from '../../../services/index';

@Component({
  templateUrl: 'app/templates/admin/users/admin-users.html'
})
export class AdminUsersComponent {
  // This will be accessible with /admin/products

  users: Array<User>;
  users$: any;

  selected: number;

  selectedUser: User;

  constructor(private productsService: UsersService, private listedItemsService: ListedItemsService) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.users$ = this.listedItemsService.getItems<User>("http://localhost:5000/users")
        .subscribe(
          listedItems => { this.users = listedItems.items; this.onSelect(this.users[0]);},
          err => { console.log(err); }
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
