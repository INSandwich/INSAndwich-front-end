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
  pageNumber: number;
  pageCount: number;

  private drinks$: any;

  ngOnInit() {
    this.loadDrinks();
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle("url('"+url+"') no-repeat center / cover");
  }

  loadDrinks(pageNumber?: number) {
    this.drinks$ = this.listedItemsService
        .getItemsFromPage<Product>("http://localhost:5000/products/category/3", pageNumber)
        .subscribe(
          listedItems => {
            this.drinks = listedItems.items;
            this.pageNumber = listedItems.pageNumber;
            this.pageCount = listedItems.pageCnt;
          },
          err => { console.log(err); }
        );
  }

  goToNextPage() {
    if(this.pageNumber < this.pageCount - 1) {
      this.loadDrinks(this.pageNumber+1);
    }
  }

  gotToPreviousPage() {
    if(this.pageNumber != 0) {
      this.loadDrinks(this.pageNumber-1);
    }
  }

  gotToFirstPage() {
    if(this.pageNumber != 0) {
      this.loadDrinks(0);
    }
  }

  goToLastPage() {
    if(this.pageNumber != (this.pageCount - 1)) {
      this.loadDrinks(this.pageCount - 1);
    }
  }

  ngOnDestroy() {
    this.drinks$.unsubscribe();
  }

}
