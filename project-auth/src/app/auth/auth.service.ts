import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { User } from './user.model';

export interface AuthResponse {
  status: string,
  token: string,
  data: Object
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<User>();
  constructor(private http: HttpClient) { }

  signup(name: string, email: string, password: string, passwordConfirm: string) {
    return this.http
      .post<AuthResponse>
      (
        `${environment.api}/users/signup`,
        {
          name,
          email,
          password,
          passwordConfirm
        }
      )
      .pipe(
        catchError(this.handleError), tap(resData => {
          //tap is an operator that allows us to perform some action without changing the response. It steps into that observable chain but it does't stop it, block it or change it, it just run some code with the data you get back from the observable, with the response in this case.
          this.handleAuthentication(resData);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        `${environment.api}/users/login`,
        {
          email,
          password
        }
      )
      .pipe(
        catchError(this.handleError), tap(resData => {
          this.handleAuthentication(resData);
        })
      );
  };

  private handleAuthentication(resData) {
    let { email, name } = resData["data"]["user"]
    let { id, exp } = JSON.parse(atob(resData["token"].split('.')[1]))
    let token = resData["token"];
    const expirationDate = new Date(new Date().getTime() + +exp * 1000);
    const user = new User(token, id, name, email, expirationDate);
    this.user.next(user);
    console.log('handleAuthentication ', this.user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(errorMessage);
    }
    errorMessage = errorRes["error"]["message"]
    return throwError(errorMessage);

  }
}
