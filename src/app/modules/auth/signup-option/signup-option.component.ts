import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-option',
  templateUrl: './signup-option.component.html',
  styleUrls: ['./signup-option.component.scss'],
})
export class SignupOptionComponent implements OnInit {
  routerVal = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  gotoUser() {
    this.authService.setUserType(false);
  }

  gotoSP() {
    this.authService.setUserType(true);
  }
}
