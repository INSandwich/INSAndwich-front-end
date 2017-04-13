import { Component, OnInit, OnDestroy } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { ListedItems, Product } from '../../models/index';

import { ListedItemsService } from '../../services/index';

@Component({
  templateUrl: 'app/templates/drinks/drinks.html'
})
export class DrinksComponent implements OnInit, OnDestroy {
  // Accessible thru /drinks

  // This component will contain a nicely organized list of drinks

  constructor(private listedItemsService: ListedItemsService, private sanitizer: DomSanitizer) {}

  drinks: Array<Product>;

  private drinks$: any;

  ngOnInit() {
    this.loadDrinks();
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle("url('"+url+"') no-repeat center / cover");
  }

  loadDrinks() {
    this.drinks$ = this.listedItemsService
        .getItems<Product>("http://localhost:5000/products/category/3")
        .subscribe(
          listedItems => { console.log(listedItems); this.drinks = listedItems.items; console.log(this.drinks)},
          err => { console.log(err); }
        );
  }

  ngOnDestroy() {
    this.drinks$.unsubscribe();
  }

}
