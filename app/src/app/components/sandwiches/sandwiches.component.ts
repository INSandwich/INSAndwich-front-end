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

  loadSandwiches(pageNumber?: number) {
    this.sandwiches$ = this.listedItemsService
        .getItemsFromPage<Product>("http://localhost:5000/products/category/1", pageNumber)
        .subscribe(
          listedItems => {
            this.sandwiches = listedItems.items;
            this.pageNumber = listedItems.pageNumber;
            this.pageCount = listedItems.pageCnt;
            },
          err => { console.log(err); }
        );
  }

  goToNextPage() {
    if(this.pageNumber < this.pageCount - 1) {
      this.loadSandwiches(this.pageNumber+1);
    }
  }

  gotToPreviousPage() {
    if(this.pageNumber != 0) {
      this.loadSandwiches(this.pageNumber-1);
    }
  }

  gotToFirstPage() {
    if(this.pageNumber != 0) {
      this.loadSandwiches(0);
    }
  }

  goToLastPage() {
    if(this.pageNumber != (this.pageCount - 1)) {
      this.loadSandwiches(this.pageCount - 1);
    }
  }

  ngOnDestroy() {
    this.sandwiches$.unsubscribe();
  }

}
