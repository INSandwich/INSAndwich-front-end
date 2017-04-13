import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { User } from '../../models/index';

import { UsersService } from '../../services/index';

@Component({
  templateUrl: 'app/templates/profile/profile.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  // Accessible thru /profile/:username
  username: string;
  user: User;
  model: any = {};

  private user$: any;

  constructor(private route: ActivatedRoute, private userService: UsersService) {
    this.username = route.snapshot.params['username'];
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.user$ = this.userService.getUser("http://localhost:5000/users/login/", this.username)
        .subscribe(
            user => { console.log(user); this.user = user; },
            err => { console.log(err); }
        );
  }

  

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

}
