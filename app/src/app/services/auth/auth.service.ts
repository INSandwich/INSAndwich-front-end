import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AppState } from '../../models/index';

@Injectable()
export class AuthService {

  public token: string;
  public role: string;

  constructor(private http: Http, public appstate: AppState) {
    // set token if set in localstorage
    appstate.isAuthentificated = false;

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.role = currentUser && currentUser.role;
    if(this.role && this.token) {
      appstate.role = this.role;
      appstate.username = currentUser.username;
      appstate.isAuthentificated = true;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    // The auth route will compare the hash for the username and will return the corresponding user info
    // As well as a jwt token

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:5000/auth', JSON.stringify({ login: username, password: password }), options)
                    .map((res: Response) => {
                      console.log(res.json());
                      let token = res.json() && res.json().token;
                      let role = res.json() && res.json().role;
                      console.log(token, role)
                      if(token && role) {
                        this.token = token;
                        this.role = role;

                        localStorage.setItem('currentUser', JSON.stringify({ username: username, role: role, token: token}));
                        this.appstate.isAuthentificated = true;
                        this.appstate.username = username;
                        this.appstate.role = role;
                        return true;
                      }
                      else {
                        this.appstate.isAuthentificated = false;
                        this.appstate.role = 'user';
                        return false;
                      }
                    });
  }

  logout(): void {
    this.token = null;
    this.role = null;
    this.appstate.isAuthentificated = false;
    this.appstate.role = 'user';
    localStorage.removeItem('currentUser');
  }

}
