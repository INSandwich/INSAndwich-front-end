import { Component, OnInit, OnDestroy } from '@angular/core';

import { Command, CommandLines } from '../../models/index';

import { ModalService, CommandsService } from '../../services/index';

@Component({
  templateUrl: 'app/templates/checkout/checkout.html'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  // Accessible thru /checkout

  // This component while describe a command, and its command lines, with an editable form, mocking a transaction
  // Perhaps we'll also send an email to the person saying "succesfully ordered x,y,z"


  constructor(private modalService: ModalService, private commandsService: CommandsService) {}

  userTokens: number = 500;
  // This is a mock, which must change!
  selectedLine: CommandLines;


  // Subs
  commandSub$: any;
  checkoutSub$: any;
  deleteSub$: any;
  deleteLineSub$: any;

  commandLines: CommandLines = [
    {
      id: 8,
      name: "Tacos",
      quantity: 1,
      price: 3.5
    }, {
      id: 9,
      name: "Coca-cola",
      quantity: 1,
      price: 0.5
    }, {
      id: 10,
      name: "Glace",
      quantity: 1,
      price: 2.5
    }
  ];

  command: Command = {
    id: 45879,
    totalPrice: 6.5,
    totalQuantity: 3,
    creationDate: "04/05/2017",
    lines: this.commandLines
  };

  ngOnInit() {

      this.loadCommand();

  }

  loadCommand() {
    console.log("Loading last command");
    // TODO:
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
    /* // TODO: Reroute to home on done
    this.deleteSub$ = this.commandsService.
    */

  }

  deleteCommandLine(id: number) {
    console.log("Deleting Command Line", String(id));
    // TODO:

  }

  ngOnDestroy() {
    this.commandSub$ ? this.commandSub$.unsubscribe() : null;
    this.checkoutSub$ ? this.checkoutSub$.unsubscribe() : null;
    this.deleteSub$ ? this.deleteSub$.unsubscribe() : null;
    this.deleteLineSub$ ? this.deleteLineSub$.unsubscribe(): null;
  }

}
