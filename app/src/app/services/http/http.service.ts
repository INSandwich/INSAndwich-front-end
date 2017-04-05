import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpService {

  constructor (private http: Http) {}

  // T is a generic type, it can be anything, a Sandwich object for instance...

  getAll<T>(route: string, body: any, params?: string): Observable<T[]> {
    // Gotta do this, but adding the JSON body somehow
    return this.http.get(route+params)
                    .map(this.extractData);
  }

/*
  getOne<T>(route:string, body: any, params?: string): Observable<T> {}

  post<T>(route: string, body: any, params?: string): Observable<T> {}

  put<T>(route: string, body: any, params?: string): Observable<T> {}

  delete<T>(route: string, body: any, params?: string): Observable<T> {}
*/

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: Response | any) {

  }

}
