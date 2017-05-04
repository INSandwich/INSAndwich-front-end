import { Component } from '@angular/core';

import { Command, CommandLines } from '../../models/index';

import { ModalService } from '../../services/index';

@Component({
  templateUrl: 'app/templates/checkout/checkout.html'
})
export class CheckoutComponent {
  // Accessible thru /checkout

  // This component while describe a command, and its command lines, with an editable form, mocking a transaction
  // Perhaps we'll also send an email to the person saying "succesfully ordered x,y,z"


  constructor(private modalService: ModalService) {}

  userTokens: number = 500;
  // This is a mock, which must change!
  selectedLine: CommandLines;
  
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

  openModal(id: string, line?: CommandLines){
    this.modalService.open(id);
    this.selectedLine = line;
  }

  closeModal(id: string){
      this.modalService.close(id);
  }


  checkout() {

  }

  deleteCommand() {

  }

  deleteCommandLine() {

  }

}
