import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class LoginService {
  private _usersUrl = 'https:////api.github.com/users'

  constructor(private http: Http) { }

  login(userId: string, password: string) {
    let headers: Headers = new Headers();
    let auth: string = 'Basic ' + btoa(userId + ':' + password);

    headers.append('Authorization', auth);

    return this.http.get(this._usersUrl, {headers: headers})
      .map((response: Response) => {
        let user = response.json();
        if (user && user.login) {
          localStorage.setItem('auth', auth);
        }
      });
  }

  logout() {
    localStorage.removeItem('auth');
  }
}
