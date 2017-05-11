import { Component, OnInit } from '@angular/core';

import { ListedItems, Product } from '../../../models/index';

import { ProductsService, ListedItemsService, ModalService, NotifService } from '../../../services/index';

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
  modifiedProductSub$: any;

  // page count and number
  pageCount: number;
  pageNumber: number;

  productDeleteSub$: any;

  constructor(private modalService: ModalService, private productsService: ProductsService,
    private listedItemsService: ListedItemsService, private notifService: NotifService) {  }

  ngOnInit() {
    this.loadProducts("http://localhost:5000/products");
  }

  deleteProduct(divId: string, id: number) {
    //console.log("product to delete id:",id);
    this.closeModal(divId);
    this.productDeleteSub$ = this.productsService.deleteProduct("http://localhost:5000/products", id)
        .subscribe(
          res => {
            this.notifService.open("Suppression d'un produit", "Suppression effectuée avec succès", true);
             this.loadProducts("http://localhost:5000/products");
          },
          err => {
            this.notifService.open("Suppression d'un produit", err.detail, false);
          }
        );
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  loadProducts(url: string, params?: string, pageNumber?: number) {
    //var newUrl = params ? url + "?name=" + params : url;

    var newUrl = url;
    if(params != null) {
      newUrl += ("?name="+params);
      if(pageNumber != null) {
        newUrl += ("&pageNumber="+pageNumber);
      }
    }
    else {
      if(pageNumber != null) {
        newUrl += ("?pageNumber="+pageNumber);
      }
    }
    //console.log("toto", newUrl);

    this.products$ = this.listedItemsService.getItems<Product>(newUrl)
        .subscribe(
          listedItems => {
            this.products = listedItems.items;
            this.pageNumber = listedItems.pageNumber;
            this.pageCount = listedItems.pageCnt;
            this.onSelect(this.products[0]);
          },
          err => {
            this.notifService.open("Chargement des produits", err.detail, false);
          }
        );
  }

  onSelect(product: Product) {
    var pId = product.Id;
    this.selectedProductSub$ = this.productsService
      .getProduct("http://localhost:5000/products/", String(pId))
      .subscribe(
        item => { this.selectedProduct = item; },
        err => {
          this.notifService.open("Chargement d'un produit", err.detail, false);
        }
      );
    if (this.selected === product.Id) {
      this.selected = 0;
    }
    else {
      this.selected = product.Id;
    }
  }

  search(pageNumber?: number) {
    this.loadProducts("http://localhost:5000/products", this.productNameFilter, pageNumber);
  }

  goToPreviousPage() {
    if(this.pageNumber != 0) {
      this.search(this.pageNumber - 1);
    }
  }

  goToNextPage() {
    if(this.pageNumber != (this.pageCount - 1)) {
      this.search(this.pageNumber + 1);
    }
  }

  createProduct() {
    this.productModel.Available = this.productModel.Available ? 1 : 0;
    if((Object.keys(this.productModel).length) != 6) {
      this.notifService.open("Chargement des commandes", err.detail, false); return;
    }
    this.createdProductSub$ = this.productsService.createProduct("http://localhost:5000/products", this.productModel)
        .subscribe(product => {
          this.onSelect(product);
          this.notifService.open("Création d'un produit", "Produit crée avec succès.", true);
        },
          err => { 
            this.notifService.open("Création d'un produit", err.detail, false);
          }
        );
  }

  editProduct() {

    var isFilled: boolean = true;
    for (var property in this.selectedProduct) {
      if (this.selectedProduct.hasOwnProperty(property)) {
        // do stuff
        if(!this.selectedProduct[property]) {
          isFilled = false;
        }
      }
    }

    if(!isFilled) {
      this.notifService.open("Modification d'un produit", "Veuillez remplir tous les champs.", false);
      return;
    }
    this.modifiedProductSub$ = this.productsService.updateProduct("http://localhost:5000/products/"+this.selectedProduct.Id, this.selectedProduct)
        .subscribe(product => {
          this.onSelect(product);
          this.notifService.open("Modification d'un produit", "Modification effectuée avec succès.", true);
          this.loadProducts("http://localhost:5000/products", this.productNameFilter);
         },
                   err => { 
                     this.notifService.open("Modification d'un produit", err.detail, false);
                   }
      );
  }

  ngOnDestroy() {
    if(this.products$) { this.products$.unsubscribe(); }
    if(this.selectedProductSub$) { this.selectedProductSub$.unsubscribe(); }
    this.createdProductSub$ ? this.createdProductSub$.unsubscribe() : null;
    this.modifiedProductSub$ ? this.modifiedProductSub$.unsubscribe() : null;
    this.productDeleteSub$ ? this.productDeleteSub$.unsubscribe() : null;
  }

}
