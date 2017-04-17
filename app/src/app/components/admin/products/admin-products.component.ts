import { Component, OnInit } from '@angular/core';

import { ListedItems, Product } from '../../../models/index';

import { ProductsService, ListedItemsService } from '../../../services/index';

import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  templateUrl: 'app/templates/admin/products/admin-products.html'
})
export class AdminProductsComponent {
  // This will be accessible with /admin/products

  productNameFilter: string;

  products: Array<Product>;
  products$: any;

  selected: number;

  selectedProduct: Product;

  constructor(private productsService: ProductsService, private listedItemsService: ListedItemsService) {
  }

  ngOnInit() {
    this.loadProducts("http://localhost:5000/products");
  }

  loadProducts(url: string, params?: string) {
    var newUrl = params ? url + "?name=" + params : url;
    this.products$ = this.listedItemsService.getItems<Product>(newUrl)
        .subscribe(
          listedItems => { this.products = listedItems.items; this.onSelect(this.products[0]); },
          err => { console.log(err); }
        )
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
    if (this.selected === product.Id) {
      this.selected = 0;
    }
    else {
      this.selected = product.Id;
    }
    console.log(product);
  }

  search(name: string) {
    this.loadProducts("http://localhost:5000/products", this.productNameFilter);
  }

  ngOnDestroy() {
    if(this.products$) { this.products$.unsubscribe(); }
  }

}
