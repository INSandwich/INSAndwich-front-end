import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { User } from '../../models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor (private http: Http) {}

  getUser(url: string, username: string): Observable<User> {
    return this.http.get(url+username)
                    .map((res: Response) => res.json()[0])
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
