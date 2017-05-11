import { Component, OnInit } from '@angular/core';

import { ListedItems, User } from '../../../models/index';

import { UsersService, ListedItemsService, ModalService, NotifService } from '../../../services/index';

@Component({
  templateUrl: 'app/templates/admin/users/admin-users.html'
})
export class AdminUsersComponent {
  // This will be accessible with /admin/products

  users: User[];
  users$: any;

  userRoleModifSub$: any;
  userTokensModifSub$: any;

  userDeleteSub$: any;

  usernameFilter: string;

  selected: number;

  selectedUser: User;

  // page count and number
  pageCount: number;
  pageNumber: number;

  constructor(private modalService: ModalService, private usersService: UsersService,
    private listedItemsService: ListedItemsService, private notifService: NotifService) { }

  ngOnInit() {
    this.loadUsers("http://localhost:5000/users");
  }

  deleteUser(divId: string, id: number) {
    //console.log("product to delete id:",id);
    this.closeModal(divId);
    this.userDeleteSub$ = this.usersService.deleteUser("http://localhost:5000/users", id)
        .subscribe(
          res => {
            this.notifService.open("Suppression d'un utilisateur", "Suppression effectuée avec succès", true);
            this.loadUsers("http://localhost:5000/users");
          },
          err => {
            this.notifService.open("Suppression d'un utilisateur", err.detail, false);
          }
        );
  }

  openModal(id: string){
    this.modalService.open(id);
  }

  closeModal(id: string){
      this.modalService.close(id);
  }

  loadUsers(url: string, params?: string, pageNumber?: number) {
    //var newUrl = params ? url+"?login="+params : url;
    var newUrl = url;
    if(params != null) {
      newUrl += ("?login="+params);
      if(pageNumber != null) {
        newUrl += ("&pageNumber="+pageNumber);
      }
    }
    else {
      if(pageNumber != null) {
        newUrl += ("?pageNumber="+pageNumber);
      }
    }

    this.users$ = this.listedItemsService.getItems<User>(newUrl)
        .subscribe(
          listedItems => {
            this.users = listedItems.items;
            this.pageNumber = listedItems.pageNumber;
            this.pageCount = listedItems.pageCnt;
            this.onSelect(this.users[0]);
          },
          err => {
            this.notifService.open("Chargement des utilisateurs", err.detail, false);
          }
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
    //console.log(user);
  }

  editUser() {

    var isFilled: boolean = true;
    for (var property in this.selectedProduct) {
      if (this.selectedProduct.hasOwnProperty(property)) {
        // do stuff
        if(!this.selectedProduct[property]) {
          isFilled = false;
        }
      }
    }

    if(!isFilled) {
        this.notifService.open("Mise à jour d'un utilisateur", "Veuillez remplir tous les champs", false);
        return;
    }
    this.userRoleModifSub$ = this.usersService.updateUserRole("http://localhost:5000/users/"+this.selectedUser.Id+"/role", this.selectedUser.Role)
                                 .subscribe(
                                   response => {
                                      //this.notifService.open("Mise à jour d'un utilisateur", "Utilisateur bien mis à jour.", true);
                                   },
                                   err => {
                                     this.notifService.open("Mise à jour d'un utilisateur", err.detail, false);
                                   }
                                 );
    this.userTokensModifSub$ = this.usersService.updateUserTokens("http://localhost:5000/users/"+this.selectedUser.Id+"/tokens", this.selectedUser.Tokens)
                                   .subscribe(
                                     response => {
                                       this.notifService.open("Mise à jour d'un utilisateur", "Utilisateur bien mis à jour.", true);
                                     },
                                     err => {
                                       this.notifService.open("Mise à jour d'un utilisateur", err.detail, false);
                                     }
                                   );

  }

  search(pageNumber?: number) {
    this.loadUsers("http://localhost:5000/users", this.usernameFilter, pageNumber);
  }

  goToPreviousPage() {
    if(this.pageNumber != 0) {
      this.search(this.pageNumber - 1);
    }
  }

  goToNextPage() {
    if(this.pageNumber != (this.pageCount - 1)) {
      this.search(this.pageNumber + 1);
    }
  }

  ngOnDestroy() {
    if(this.users$) { this.users$.unsubscribe(); }
    if(this.userDeleteSub$) { this.userDeleteSub$.unsubscribe(); }
  }

}
