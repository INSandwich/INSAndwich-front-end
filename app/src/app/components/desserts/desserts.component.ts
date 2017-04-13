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

  private desserts$: any;

  ngOnInit() {
    this.loadDesserts();
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle("url('"+url+"') no-repeat center / cover");
  }

  loadDesserts() {
    this.desserts$ = this.listedItemsService
        .getItems<Product>("http://localhost:5000/products/category/2")
        .subscribe(
          listedItems => { console.log(listedItems); this.desserts = listedItems.items; console.log(this.desserts)},
          err => { console.log(err); }
        );
  }

  ngOnDestroy() {
    this.desserts$.unsubscribe();
  }


}
