import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
interface AuthResponseData {

}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  signup(name: string, email: string, password: string, passwordConfirm: string) {
    return this.http.post('https://localhost:3000/api/v1/users/signup',
      {
        name,
        email,
        password,
        passwordConfirm
      });
  }
}
