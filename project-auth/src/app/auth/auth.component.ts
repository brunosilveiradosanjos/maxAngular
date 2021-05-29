import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  constructor(private authService: AuthService) { }

  isLoginMode = true;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    const { name, email, password, passwordConfirm } = form.value;

    if (this.isLoginMode) {

    } else {
      this.authService.signup(name, email, password, passwordConfirm).subscribe(res => {
        console.log('res ', res);
      }, error => {
        console.log('error ', error);
      })
    }

    console.log(form.value);
    // form.reset();
  }
}
