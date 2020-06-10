import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

import { User, LogIn } from '../auth.model';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  // recieving user list to check
  recievedUser: User;

  constructor(private http: HttpClient,
              public authService: AuthService,
              public dialog: MatDialog) { }

  ngOnInit() {
    // login form validation
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });

  }

  // get form elements
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }


  signInUser(loginform) {
    if (this.loginForm.invalid) {
      console.log('form invalid');
     // this.dialog.open(ErrorComponent, {data: {message: 'Incorrect Username or Password'}});
    } else {
      const login: LogIn = {
        email: loginform.value.email,
        password: loginform.value.password
      };
      this.authService.signIn(login);
    }
  }

}
