import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { ListedItems, Product } from '../../models/index';

import { ListedItemsService } from '../../services/index';

@Component({
  templateUrl: 'app/templates/sandwiches/sandwiches.html'
})
export class SandwichesComponent implements OnInit {
  // Accessible thru /sandwiches

  // This component will contain a nicely organized list of sandwiches
  constructor(private listedItemsService: ListedItemsService, private sanitizer: DomSanitizer) {}

  sandwiches: Array<Product>;

  ngOnInit() {
    this.loadSandwiches();
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle("url('"+url+"') no-repeat center / cover");
  }

  loadSandwiches() {
    this.listedItemsService
        .getItems<Product>("http://localhost:5000/products/1")
        .subscribe(
          listedItems => { console.log(listedItems); this.sandwiches = listedItems.items; console.log(this.sandwiches)},
          err => { console.log(err); }
        );
  }

}
