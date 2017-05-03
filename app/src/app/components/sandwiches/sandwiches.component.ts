import { Component, OnInit, OnDestroy } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { ListedItems, Product } from '../../models/index';

import { ListedItemsService } from '../../services/index';

@Component({
  templateUrl: 'app/templates/sandwiches/sandwiches.html'
})
export class SandwichesComponent implements OnInit, OnDestroy {
  // Accessible thru /sandwiches

  // This component will contain a nicely organized list of sandwiches
  constructor(private listedItemsService: ListedItemsService, private sanitizer: DomSanitizer) {}

  sandwiches: Array<Product>;
  pageNumber: number;
  pageCount: number;

  private sandwiches$: any;

  ngOnInit() {
    this.loadSandwiches();
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle("url('"+url+"') no-repeat center / cover");
  }

  loadSandwiches() {
    this.sandwiches$ = this.listedItemsService
        .getItems<Product>("http://localhost:5000/products/category/1")
        .subscribe(
          listedItems => {
            console.log(listedItems);
            this.sandwiches = listedItems.items;
            this.pageNumber = listedItems.pageNumber;
            this.pageCount = listedItems.pageCnt; 
            console.log(this.sandwiches)},
          err => { console.log(err); }
        );
  }

  ngOnDestroy() {
    this.sandwiches$.unsubscribe();
  }

}
