import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpService {

  constructor (private http: Http) {}

  headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
  options = new RequestOptions({ headers: this.headers }); // Create a request option



  // T is a generic type, it can be anything, a Sandwich object for instance...
/*
  getAll<T>(route: string, body?: any, params?: string): Observable<T[]> {
    // Gotta do this, but adding the JSON body somehow
    return this.http.get(route+params, body, this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getOne<T>(route:string, body?: any, params?: string): Observable<T> {
    return this.http.get(route+params, body, this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  post<T>(route: string, body?: any, params?: string): Observable<T> {
    return this.http.post(route+params, body, this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

/*
  post<T>(route: string, body: any, params?: string): Observable<T> {}

  put<T>(route: string, body: any, params?: string): Observable<T> {}

  delete<T>(route: string, body: any, params?: string): Observable<T> {}
*/

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
