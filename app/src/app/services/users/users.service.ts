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

  createUser(url: string, firstname: string, lastname: string, email:string, username: string, password: string, adresse: string): Observable<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, JSON.stringify({firstname: firstname, lastname: lastname, email: email, login: username, password: password, adresse: adresse}), options)
                    .map((res: Response) => res.json())
                    .catch((err: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
