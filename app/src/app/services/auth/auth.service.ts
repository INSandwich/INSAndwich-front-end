import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  public token: string;
  public role: string;

  constructor(private http: Http) {
    // set token if set in localstorage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.role = currentUser && currentUser.role;
  }

  login(username: string, password: string): Observable<boolean> {
    // The auth route will compare the hash for the username and will return the corresponding user info
    // As well as a jwt token

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:5000/auth', { username: username, password: password }, options)
                    .map((res: Response) => {
                      console.log(res);
                      let token = res.json() && res.json().token;
                      let role = res.json() && res.json().role;
                      if(token && role) {
                        this.token = token;
                        this.role = role;

                        localStorage.setItem('currentUser', JSON.stringify({ username: username, role: role, token: token}));
                        return true;
                      }
                      else {
                        return false;
                      }
                    });
  }

  logout(): void {
    this.token = null;
    this.role = null;
    localStorage.removeItem('currentUser');
  }

  // Do it pls
  hashPassword(password: string): string {
    return password;
  }

}
