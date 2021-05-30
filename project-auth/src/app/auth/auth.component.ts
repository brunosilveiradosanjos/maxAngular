import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  private isLoginMode = true;
  private isLoading = false;
  private error: string = undefined;

  constructor(private authService: AuthService) { }



  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    const { name, email, password, passwordConfirm } = form.value;

    this.isLoading = true;
    let authObs: Observable<AuthResponse>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(name, email, password, passwordConfirm);
    }

    authObs.subscribe(res => {
      console.log('res ', res);
      this.isLoading = false;
      this.error = undefined;
    }, errorMessage => {
      console.log('errorMessage ', errorMessage);
      this.isLoading = false;
      this.error = errorMessage;
    })


    console.log(form.value);
    // form.reset();
  }
}
