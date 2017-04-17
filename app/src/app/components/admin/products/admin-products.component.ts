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

  productModel: any = {};
  createdProductSub$: any;

  products: Array<Product>;
  products$: any;

  selected: number;

  selectedProductSub$: any;
  selectedProduct: Product;

  // display
  displayCreationErr: boolean = false;
  creationErrMsg: string = "";

  displayCreationSuccess: boolean = false;

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
        );
  }

  onSelect(product: Product) {
    var pId = product.Id;
    this.selectedProductSub$ = this.productsService
      .getProduct("http://localhost:5000/products/", String(pId))
      .subscribe(
        item => { this.selectedProduct = item; },
        err => { console.log(err); }
      );
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

  createProduct() {
    this.productModel.Available = this.productModel.Available ? 1 : 0;
    if((Object.keys(this.productModel).length) != 6) {
      this.creationError("Veuillez remplir tous les champs"); return;
    }
    this.createdProductSub$ = this.productsService.createProduct("http://localhost:5000/products", this.productModel)
        .subscribe(product => { this.onSelect(product); this.creationSuccess(); },
          err => { console.log(err); this.creationError(err.detail); }
        );

  }

  creationSuccess() {
    this.displayCreationSuccess = true;
  }

  creationError(err: string) {
    this.creationErrMsg = err;
    this.displayCreationErr = true;
  }

  ngOnDestroy() {
    if(this.products$) { this.products$.unsubscribe(); }
    if(this.selectedProductSub$) { this.selectedProductSub$.unsubscribe(); }
    this.createdProductSub$ ? this.createdProductSub$.unsubscribe() : null;
  }

}
