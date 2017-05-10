import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Command, CommandLines } from '../../models/index';

import { ModalService, CommandsService } from '../../services/index';

@Component({
  templateUrl: 'app/templates/command/command.html'
})
export class CommandComponent implements OnInit, OnDestroy {
  // Accessible thru /checkout

  // This component while describe a command, and its command lines, with an editable form, mocking a transaction
  // Perhaps we'll also send an email to the person saying "succesfully ordered x,y,z"

  constructor(private route: ActivatedRoute, private modalService: ModalService, private commandsService: CommandsService, private router: Router) {
    this.username = route.snapshot.params['username'];
    this.commandId = route.snapshot.params['id'];

  }

  userTokens: number = 500;
  // This is a mock, which must change!


  // Subs
  commandSub$: any;
  deleteSub$: any;

  username: string;
  commandId: string;


  /*commandLines: CommandLines;/* = [
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
  ];*/

  command: Command;/* = {
    id: 45879,
    totalPrice: 6.5,
    totalQuantity: 3,
    creationDate: "04/05/2017",
    lines: this.commandLines
  };*/

  ngOnInit() {
      this.loadCommand();
  }

  loadCommand() {
    console.log("Loading command");
    // TODO:
    this.commandSub$ = this.commandsService.getCommand("http://localhost:5000/orders", Number(this.commandId))
                           .subscribe(command => { console.log(command); this.command = command; },
                           err => { console.log(err); }
                         );
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
    this.deleteSub$ = this.commandsService.deleteCommand("http://localhost:5000/orders", id)
                          .subscribe(
                            res => { this.router.navigate(['/profile', this.username]); },
                            err => { console.log(err); }
                          );

  }

  ngOnDestroy() {
    this.commandSub$ ? this.commandSub$.unsubscribe() : null;
    this.deleteSub$ ? this.deleteSub$.unsubscribe() : null;
  }

}
