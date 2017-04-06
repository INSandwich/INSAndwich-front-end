import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { ListedItems, Dessert } from '../../models/index';

import { ListedItemsService } from '../../services/index';

@Component({
  templateUrl: 'app/components/desserts/desserts.html'
})
export class DessertsComponent implements OnInit {
  // Accessible thru /desserts

  // This component will contain a nicely organized list of desserts
  constructor(private listedItemsService: ListedItemsService, private sanitizer: DomSanitizer) {}

  desserts: Array<Dessert>;

  ngOnInit() {
    this.loadDesserts();
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle("url('"+url+"') no-repeat center / cover");
  }

  loadDesserts() {
    this.listedItemsService
        .getItems<Dessert>("http://localhost:5000/products/2")
        .subscribe(
          listedItems => { console.log(listedItems); this.desserts = listedItems.items; console.log(this.desserts)},
          err => { console.log(err); }
        );
  }

}
