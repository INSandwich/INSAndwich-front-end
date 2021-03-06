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
  public cartSize: number;

  constructor(private http: Http, public appstate: AppState) {
    // set token if set in localstorage
    appstate.isAuthentificated = false;
	  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.role = currentUser && currentUser.role;
    this.userId = currentUser && currentUser.id;
    this.cartSize = currentUser && currentUser.cartSize;
    //console.log(currentUser);
    if(this.role && this.token && this.userId && (this.cartSize >= 0)) {
      //console.log("in here");
      appstate.role = this.role;
      appstate.username = currentUser.username;
      appstate.id = currentUser.id;
      appstate.cartSize = currentUser.cartSize;
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
                      //console.log(res.json());
                      let token = res.json() && res.json().token;
                      let role = res.json() && res.json().role;
                      let id = res.json() && res.json().id;
                      let cartSize = (res.json() && res.json().cartSize)? (res.json() && res.json().cartSize): this.appstate.cartSize;
                      //console.log(cartSize);
                      if(token && role && id) {
                        this.token = token;
                        this.role = role;
                        this.userId = id;
                        this.cartSize = cartSize;

                        localStorage.setItem('currentUser', JSON.stringify({ username: username, role: role, token: token, id: id, cartSize: cartSize}));
                        this.appstate.isAuthentificated = true;
                        this.appstate.cartSize = cartSize;
                        this.appstate.username = username;
                        this.appstate.role = role;
                        this.appstate.id = id;
                        return true;
                      }
                      else {
                        this.appstate.isAuthentificated = false;
                        this.appstate.role = 'user';
                        this.appstate.cartSize = null;
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
    this.appstate.cartSize = null;
    this.appstate.id = 0;
    localStorage.removeItem('currentUser');
  }

  incrementCartSize(increment: number) {
    this.appstate.cartSize += increment;
    this.cartSize = this.appstate.cartSize;
    this.updateCartSize(this.appstate.cartSize);
  }

  decrementCartSize(value: number) {
    if ((this.appstate.cartSize - value) >= 0) {
      this.appstate.cartSize -= value;
    }
    this.cartSize = this.appstate.cartSize;
    this.updateCartSize(this.appstate.cartSize);
  }

  resetCartSize() {
    this.appstate.cartSize = 0;
    this.cartSize = this.appstate.cartSize;
    this.updateCartSize(this.appstate.cartSize);
  }

  getUserId(): number {
    return this.appstate.id;
  }

  getUsername(): string {
    return this.appstate.username;
  }

  updateCartSize(value: number) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.cartSize = value;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  updateUsername(username: string) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.appstate.username = username;
    currentUser.username = username;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

}
