import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { ListedItems } from '../../models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ListedItemsService {

  constructor (private http: Http) {}

  getItems<T>(url: string, pageNumber?: number): Observable<ListedItems<T>> {
    var pageNum = pageNumber ? pageNumber : 0;
    return this.http.get(url+"?pageNumber="+String(pageNum))
                    .map(this.extractData)
                    .catch(this.handleError);
  }

    private extractData(res: Response) {
      let body = res.json();
      return body || { };
    }

    private handleError (error: Response | any) {
      // In a real world app, you might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        console.log(error.json());
        const body = error.json() || '';
        //const err = body.error || JSON.stringify(body);
        errMsg = body;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      return Observable.throw(errMsg);
    }

}
