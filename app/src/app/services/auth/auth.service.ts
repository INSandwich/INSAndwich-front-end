import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AppState } from '../../models/index';

@Injectable()
export class AuthService {

  public token: string;
  public role: string;
  public userId: number;

  constructor(private http: Http, public appstate: AppState) {
    // set token if set in localstorage
    appstate.isAuthentificated = false;

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.role = currentUser && currentUser.role;
    this.userId = currentUser && currentUser.id;
    if(this.role && this.token) {
      appstate.role = this.role;
      appstate.username = currentUser.username;
      appstate.id = currentUser.userId;
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
                      let id = res.json() && res.json().id;
                      if(token && role && id) {
                        this.token = token;
                        this.role = role;
                        this.userId = id;

                        localStorage.setItem('currentUser', JSON.stringify({ username: username, role: role, token: token, id: id}));
                        this.appstate.isAuthentificated = true;
                        this.appstate.username = username;
                        this.appstate.role = role;
                        this.appstate.id = id;
                        return true;
                      }
                      else {
                        this.appstate.isAuthentificated = false;
                        this.appstate.role = 'user';
                        this.appstate.id = 0;
                        return false;
                      }
                    });
  }

  logout(): void {
    this.token = null;
    this.role = null;
    this.appstate.isAuthentificated = false;
    this.appstate.role = 'user';
    this.appstate.id = 0;
    localStorage.removeItem('currentUser');
  }



}
