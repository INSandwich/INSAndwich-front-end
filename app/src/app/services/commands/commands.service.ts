import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Command, CommandLines } from '../../models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class CommandsService {

  constructor(private http: Http) {}

  getCommand(url: string, id: number): Observable<Command> {
    return this.http.get(url+"/"+id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  createCommand(url: string, userId: number, commandLine: CommandLines) { //: Observable<number> { // retourne un Id
    //return this.http.post(url+"/"+userId, )
  }

  checkoutCommand(url: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  deleteCommand(url: string, id: number) {
    return this.http.delete(url+"/"+String(id))
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  deleteCommandLine(url: string, commandId: number, id: number) {
    return this.http.delete(url+"/"+String(commandId)+"/lines/"+String(id))
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
