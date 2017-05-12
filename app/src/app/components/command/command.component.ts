import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Command, CommandLines } from '../../models/index';

import { ModalService, CommandsService, NotifService } from '../../services/index';

@Component({
  templateUrl: 'app/templates/command/command.html'
})
export class CommandComponent implements OnInit, OnDestroy {
  // Accessible thru /checkout

  // This component while describe a command, and its command lines, with an editable form, mocking a transaction
  // Perhaps we'll also send an email to the person saying "succesfully ordered x,y,z"

  constructor(private route: ActivatedRoute, private modalService: ModalService, private commandsService: CommandsService,
     private router: Router, private notifService: NotifService) {
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

  command: Command;

  ngOnInit() {
      this.loadCommand();
  }

  loadCommand() {
    //console.log("Loading command");
    this.commandSub$ = this.commandsService.getCommand("http://localhost:5000/orders", Number(this.commandId))
                           .subscribe(command => { this.command = command; },
                           err => { this.notifService.open("Erreur lors du chargement d'une commande", err.detail, false); }
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
    //console.log("Deleting Command ", String(id));
    this.deleteSub$ = this.commandsService.deleteCommand("http://localhost:5000/orders", id)
                          .subscribe(
                            res => {
                              this.notifService.open("Suppression d'une commande", "Suppression effectuée avec succès.", true);
                              this.router.navigate(['/profile', this.username]);
                            },
                            err => { this.notifService.open("Erreur lors de la suppression", err.detail, false);  }
                          );

  }

  ngOnDestroy() {
    this.commandSub$ ? this.commandSub$.unsubscribe() : null;
    this.deleteSub$ ? this.deleteSub$.unsubscribe() : null;
  }

}
