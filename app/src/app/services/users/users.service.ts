import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { User } from '../../models/index';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

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
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });

    return this.http.post(url, JSON.stringify({firstname: firstname, lastname: lastname, email: email, login: username, password: password, adresse: adresse}), options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  updateInfos(url: string, user: User): Observable<User> {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });

    return this.http.post(url, JSON.stringify({firstname: user.FirstName, lastname: user.LastName, email: user.Email, login: user.Login, adresse: user.Adresse}), options)
               .map(this.extractData)
               .catch(this.handleError);

  }

  updatePassword(url: string, oldPassword: string, newPassword: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, JSON.stringify({password: oldPassword, newpassword: newPassword}), options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  updateUserRole(url: string, newRole: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    console.log(newRole);

    return this.http.put(url, JSON.stringify({role: newRole}), options)
               .map(this.extractData)
               .catch(this.handleError);
  }

  updateUserTokens(url: string, tokens: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.put(url, JSON.stringify({tokens: tokens}), options)
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
