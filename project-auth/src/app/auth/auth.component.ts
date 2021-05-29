import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  constructor(private authService: AuthService) { }

  private isLoginMode = true;
  private isLoading = false;
  private error: string = undefined;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    const { name, email, password, passwordConfirm } = form.value;

    this.isLoading = true;
    if (this.isLoginMode) {

    } else {
      this.authService.signup(name, email, password, passwordConfirm).subscribe(res => {
        console.log('res ', res);
        this.isLoading = false;
        this.error = undefined;
      }, error => {
        console.log('error ', error);
        this.isLoading = false;
        this.error = error["error"]["message"]
      })
    }

    console.log(form.value);
    // form.reset();
  }
}
