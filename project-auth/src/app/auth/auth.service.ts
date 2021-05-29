import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { error } from 'selenium-webdriver';

interface AuthResponse {
  status: string,
  token: string,
  data: Object
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  signup(name: string, email: string, password: string, passwordConfirm: string) {
    return this.http
      .post<AuthResponse>(
        'http://localhost:3000/api/v1/users/signup',
        {
          name,
          email,
          password,
          passwordConfirm
        }
      )
      .pipe(catchError(errorRes => {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.message) {
          return throwError(errorMessage);
        }
        errorMessage = errorRes["error"]["message"]
        return throwError(errorMessage);
      })
      );
  }
}
