import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { RequestService } from '../../services/request.service';
import { LoginInputModel } from '../../models/login-input-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoginMode: boolean = true;

  constructor(private requestService: RequestService, private route: ActivatedRoute) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  async onSubmit(form: NgForm) {
    if(form.invalid) {
      form.reset();
      return;
    }

    const values = form.value;

    let authTask: Promise<{returnUrl: string}>;

    if(this.isLoginMode){
       authTask = this.requestService.post<LoginInputModel, {returnUrl: string}>("login", new LoginInputModel(
        values.email,
        values.password,
        this.route.snapshot.queryParams["returnUrl"]
      ));
    }
    else {
      authTask = this.requestService.post<LoginInputModel, {returnUrl: string}>("register", new LoginInputModel(
        values.email,
        values.password,
        this.route.snapshot.queryParams["returnUrl"]
      ));
    }

    const response = await authTask
      .catch(reason => {
        console.log(reason);
        form.reset();
      });

    if(response) {
      window.location.href = response.returnUrl;
    }
  }

  isControlInvalid(name: string, form: NgForm) {
    const control = form.controls[name];

    if(!control)
      return false;

    return control.invalid && control.touched;
  }
}
