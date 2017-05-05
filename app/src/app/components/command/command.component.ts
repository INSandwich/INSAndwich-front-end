import { Component, OnInit, OnDestroy } from '@angular/core';

import { Command, CommandLines } from '../../models/index';

import { ModalService, CommandsService } from '../../services/index';

@Component({
  templateUrl: 'app/templates/command/command.html'
})
export class CommandComponent implements OnInit, OnDestroy {
  // Accessible thru /checkout

  // This component while describe a command, and its command lines, with an editable form, mocking a transaction
  // Perhaps we'll also send an email to the person saying "succesfully ordered x,y,z"


  constructor(private modalService: ModalService, private commandsService: CommandsService) {}

  userTokens: number = 500;
  // This is a mock, which must change!


  // Subs
  commandSub$: any;
  deleteSub$: any;

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
    console.log("Loading command");
    // TODO:
  }

  openModal(id: string){
    this.modalService.open(id);
  }

  closeModal(id: string){
      this.modalService.close(id);
  }

  confirmCommandDelete(divId: string, id: number) {
    this.closeModal(divId);
    this.deleteCommand(id);
  }

  deleteCommand(id: number) {
    console.log("Deleting Command ", String(id));
    /* // TODO: Reroute to home on done
    this.deleteSub$ = this.commandsService.
    */
  }

  ngOnDestroy() {
    this.commandSub$ ? this.commandSub$.unsubscribe() : null;
    this.deleteSub$ ? this.deleteSub$.unsubscribe() : null;
  }

}
