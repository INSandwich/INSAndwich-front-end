import { Component, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { NotifService, UsersService } from '../../services/index';

@Component({
  templateUrl: 'app/templates/payment/payment.html'
})
export class PaymentComponent implements OnDestroy {

  private userSub$: any;

  userId: number = 0;
  username: string;

  constructor(private router: Router, private route: ActivatedRoute, private notifService: NotifService, private userService: UsersService) {
    this.userId = route.snapshot.params['userId'];
    this.username = route.snapshot.params['username'];
  }

  pay() {
    this.userSub$ = this.userService.updateUserTokens("http://localhost:5000/users/"+this.userId+"/add/", 10)
                                    .subscribe(
                                      res => {
                                        this.notifService.open("Payment", "Votre compte à été crédité de 10 tokens.", true);
                                      },
                                      err => {
                                        this.notifService.open("Payment", err.detail, false);
                                      }
                                    );
  }

  ngOnDestroy() {
    this.userSub$ ? this.userSub$.unsubscribe() : null;
  }

}
