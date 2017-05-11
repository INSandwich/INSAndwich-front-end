import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';

import { ProductsService, AuthService, CommandsService, NotifService } from '../../services/index';

import { Product } from '../../models/index';

@Component({
  templateUrl: 'app/templates/product/product.html'
})
export class ProductComponent implements OnInit, OnDestroy {
  // Accessible thru /desserts/:id
  // This component will be used to display the detailed info on a dessert
  id: string;
  product: Product;
  userId: number;
  username: string;

  private product$: any;
  private addToCartSub$: any;

  constructor(private route: ActivatedRoute, private productsService: ProductsService, private commandsService: CommandsService,
     private sanitizer: DomSanitizer,
     private authService: AuthService, private router: Router,
     private notifService: NotifService) {
    this.id = route.snapshot.params['id'];
  }

  ngOnInit() {
    console.log(this.id);
    this.loadProduct();
    this.userId = this.authService.getUserId();
    this.username = this.authService.getUsername();
  }

  loadProduct() {
    this.product$ = this.productsService.getProduct("http://localhost:5000/products/", this.id)
                        .subscribe(
                            product => { this.product = product; },
                            err => { this.notifService.open("Erreur lors du chargement", err.detail, false); }
                        );
  }

  addToCart(id: number) {
    // todo later, change amount
    if(!this.userId) {
      this.router.navigate(['/login']);
    }
    else {
      this.addToCartSub$ = this.commandsService.addToCart("http://localhost:5000/orders/lines", {user_id: this.userId, product_id: id, amount: 1})
                                               .subscribe(res => {
                                                 // add navigation
                                                 this.authService.incrementCartSize(1);
                                                 this.notifService.open("Ajout au panier", "Ajout au panier effectué avec succès !",true);
                                                 this.router.navigate(['/home']);
                                               },
                                             err => {
                                               this.notifService.open("Erreur lors de l'ajout au panier", err.detail, false);
                                             });
    }
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle("url('"+url+"') no-repeat center / cover");
  }

  ngOnDestroy() {
    this.product$.unsubscribe();
  }

}
