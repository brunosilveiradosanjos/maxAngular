import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
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

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTime: any;

  constructor(private http: HttpClient, private router: Router) { }

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

  autoLogin() {
    const userData:
      {
        _token: string,
        id: string,
        name: string,
        email: string,
        _expirationDate: string
      } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData._token,
      userData.id,
      userData.name,
      userData.email,
      new Date(userData._expirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._expirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
    this.tokenExpirationTime = null;
  };

  autoLogout(expirationDate: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.logout();
    }, expirationDate)
  };

  private handleAuthentication(resData) {
    let { email, name } = resData["data"]["user"]
    let { id, exp } = JSON.parse(atob(resData["token"].split('.')[1]))
    let token = resData["token"];
    const expirationDate = new Date(exp * 1000);
    const user = new User(token, id, name, email, expirationDate);
    this.user.next(user);
    this.autoLogout(new Date(expirationDate).getTime() - new Date().getTime());
    localStorage.setItem('userData', JSON.stringify(user));
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
