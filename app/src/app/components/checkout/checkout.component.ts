import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Command, CommandLines } from '../../models/index';

import { ModalService, CommandsService, UsersService, AuthService } from '../../services/index';

@Component({
  templateUrl: 'app/templates/checkout/checkout.html'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  // Accessible thru /checkout

  // This component while describe a command, and its command lines, with an editable form, mocking a transaction
  // Perhaps we'll also send an email to the person saying "succesfully ordered x,y,z"


  constructor(private router: Router, private route: ActivatedRoute, private modalService: ModalService,
    private commandsService: CommandsService, private userService: UsersService, private authService: AuthService) {
    this.userId = route.snapshot.params['userId'];
    this.username = route.snapshot.params['username'];
  }

  userTokens: number = 0;
  // This is a mock, which must change!
  selectedLine: CommandLines;

  userId: number = 0;
  username: string;

  // Subs
  commandSub$: any;
  checkoutSub$: any;
  deleteSub$: any;
  deleteLineSub$: any;
  tokensSub$: any;

  command: Command;/* = {
    id: 45879,
    totalPrice: 6.5,
    totalQuantity: 3,
    creationDate: "04/05/2017",
    lines: this.commandLines
  };
  */

  ngOnInit() {

      this.loadCommand();
      this.loadUserTokens();
  }

  loadUserTokens() {
    this.tokensSub$ = this.userService.getUser("http://localhost:5000/users/", String(this.userId))
                                      .subscribe(
                                        user => { this.userTokens = user.Tokens; },
                                        err => { console.log(err); }
                                      );
  }

  loadCommand() {
    this.commandSub$ = this.commandsService.getCommand("http://localhost:5000/orders/last", this.userId)
                                           .subscribe(command => {
                                             this.command = command; console.log(command);
                                           },
                                           err => {
                                             console.log(err);
                                          });
  }

  openModal(id: string, line?: CommandLines){
    this.modalService.open(id);
    this.selectedLine = line;
  }

  closeModal(id: string){
      this.modalService.close(id);
  }

  confirmLineDelete(divId: string, id: number) {
    this.closeModal(divId);
    this.deleteCommandLine(id);
  }

  confirmCommandDelete(divId: string, id: number) {
    this.closeModal(divId);
    this.deleteCommand(id);
  }

  checkout() {
    console.log("Checking out :)");

    /* // TODO :
    this.checkoutSub$ = this.commandsService.checkout()
                                            .subscribe();
    */
  }

  deleteCommand(id: number) {
    console.log("Deleting Command ", String(id));
    this.deleteSub$ = this.commandsService.deleteCommand("http://localhost:5000/orders", id)
                          .subscribe(
                            res => {
                              this.authService.resetCartSize();
                              this.router.navigate(['/profile', this.username]);
                          },
                            err => { console.log(err); }
                          );

  }

  deleteCommandLine(id: number) {
    console.log("Deleting Command Line", String(id), this.command);
    // TODO:
    this.deleteLineSub$ = this.commandsService.deleteCommandLine("http://localhost:5000/orders", this.command.Id, id)
                                              .subscribe(
                                                res => { 
                                                  if((this.command.lines.length-1) == 0) {
                                                    console.log(this.command.Id);
                                                    this.deleteCommand(this.command.Id);
                                                  }
                                                  else {
                                                    this.authService.decrementCartSize(this.selectedLine.quantity);
                                                    this.loadCommand();
                                                  }
                                                },
                                                err => { console.log(err); }
                                              );

  }

  ngOnDestroy() {
    this.commandSub$ ? this.commandSub$.unsubscribe() : null;
    this.checkoutSub$ ? this.checkoutSub$.unsubscribe() : null;
    this.deleteSub$ ? this.deleteSub$.unsubscribe() : null;
    this.deleteLineSub$ ? this.deleteLineSub$.unsubscribe(): null;
    this.tokensSub$ ? this.tokensSub$.unsubscribe(): null;
  }

}
