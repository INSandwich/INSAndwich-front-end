import { Component, OnInit, OnDestroy } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { ListedItems, Product } from '../../models/index';

import { ListedItemsService } from '../../services/index';

@Component({
  templateUrl: 'app/templates/desserts/desserts.html'
})
export class DessertsComponent implements OnInit, OnDestroy {
  // Accessible thru /desserts

  // This component will contain a nicely organized list of desserts
  constructor(private listedItemsService: ListedItemsService, private sanitizer: DomSanitizer) {}

  desserts: Array<Product>;
  pageNumber: number;
  pageCount: number;

  private desserts$: any;

  ngOnInit() {
    this.loadDesserts();
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle("url('"+url+"') no-repeat center / cover");
  }

  loadDesserts(pageNumber?: number) {
    this.desserts$ = this.listedItemsService
        .getItemsFromPage<Product>("http://localhost:5000/products/category/2", pageNumber)
        .subscribe(
          listedItems => {
            this.desserts = listedItems.items;
            this.pageNumber = listedItems.pageNumber;
            this.pageCount = listedItems.pageCnt;
          },
          err => { console.log(err); }
        );
  }

  goToNextPage() {
    if(this.pageNumber < this.pageCount - 1) {
      this.loadDesserts(this.pageNumber+1);
    }
  }

  gotToPreviousPage() {
    if(this.pageNumber != 0) {
      this.loadDesserts(this.pageNumber-1);
    }
  }

  gotToFirstPage() {
    if(this.pageNumber != 0) {
      this.loadDesserts(0);
    }
  }

  goToLastPage() {
    if(this.pageNumber != (this.pageCount - 1)) {
      this.loadDesserts(this.pageCount - 1);
    }
  }

  ngOnDestroy() {
    this.desserts$.unsubscribe();
  }


}
