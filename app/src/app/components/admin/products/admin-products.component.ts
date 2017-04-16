import { Component, OnInit } from '@angular/core';

import { ListedItems, Product } from '../../../models/index';

import { ProductsService, ListedItemsService } from '../../../services/index';

@Component({
  templateUrl: 'app/templates/admin/products/admin-products.html'
})
export class AdminProductsComponent {
  // This will be accessible with /admin/products

  products: Array<Product>;
  products$: any;

  selected: number;

  selectedProduct: Product;

  constructor(private productsService: ProductsService, private listedItemsService: ListedItemsService) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.listedItemsService.getItems<Product>("http://localhost:5000/products")
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

  ngOnDestroy() {
    if(this.products$) { this.products$.unsubscribe(); }
  }

}
