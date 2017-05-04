import { Component } from '@angular/core';

import { Command, CommandLines } from '../../models/index';

@Component({
  templateUrl: 'app/templates/checkout/checkout.html'
})
export class CheckoutComponent {
  // Accessible thru /checkout

  // This component while describe a command, and its command lines, with an editable form, mocking a transaction
  // Perhaps we'll also send an email to the person saying "succesfully ordered x,y,z"


  //constructor(private commandsService: CommandsService) {}

  userTokens: number = 500;
  // This is a mock, which must change!
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
    lines: this.commandLines
  };

  checkout() {

  }

  deleteCommand() {

  }

  deleteCommandLine() {

  }

}
