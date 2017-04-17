import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';

import { ProductsService } from '../../services/index';

import { Product } from '../../models/index';

@Component({
  templateUrl: 'app/templates/product/product.html'
})
export class ProductComponent implements OnInit, OnDestroy {
  // Accessible thru /desserts/:id
  // This component will be used to display the detailed info on a dessert
  id: string;
  product: Product;

  private product$: any;

  constructor(private route: ActivatedRoute, private productsService: ProductsService, private sanitizer: DomSanitizer) {
    this.id = route.snapshot.params['id'];
  }

  ngOnInit() {
    console.log(this.id);
    this.loadProduct();
  }

  loadProduct() {
    this.product$ = this.productsService.getProduct("http://localhost:5000/products/", this.id)
                        .subscribe(
                            product => { console.log(product); this.product = product; },
                            err => { console.log(err); }
                        );
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle("url('"+url+"') no-repeat center / cover");
  }

  

  ngOnDestroy() {
    this.product$.unsubscribe();
  }

}
