import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Product } from '../../models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductsService {

  constructor (private http: Http) {}

  getProduct(url: string, id: string): Observable<Product> {
    return this.http.get(url+id)
                    .map((res: Response) => res.json().item[0])
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  createProduct(url: string, product: any): Observable<Product> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, JSON.stringify({name: product.Name, description: product.Description, available: product.Available, image: product.Image, price: product.Price, category: product.Category_Id}), options)
               .map((res: Response) => res.json())
               .catch((error: any) => Observable.throw(error.json().detail || 'Server error'));
  }

  updateProduct(url: string, product: Product) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    //console.log(product.Name);

    return this.http.put(url, JSON.stringify({name: product.Name, description: product.Description, available: product.Available, image: product.Image, price: product.Price, category: product.Category_Id}), options)
               .map((res: Response) => res.json())
               .catch((error: any) =>  Observable.throw(error.json().detail || 'Server error'));
  }

  deleteProduct(url: string, id: number) {
    return this.http.delete(url+"/"+id)
               .map((res: Response) => res.json())
               .catch((error: any) =>  Observable.throw(error.json().detail || 'Server error'));
  }

}
