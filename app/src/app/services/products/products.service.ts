import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Product } from '../../models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductsService {

  constructor (private http: Http) {}

  getProduct(url: string, id: string): Observable<Product> {
    return this.http.get(url+id)
                    .map((res: Response) => res.json().item[0])
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
