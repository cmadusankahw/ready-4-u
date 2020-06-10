import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

import { ServiceProvider, Customer } from '../auth.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  onLogin = false;
  onRegister = false;

  constructor(private router: Router, private authService: AuthService) {}

  private auSub: Subscription;
  private headerDetailsSubs: Subscription;

  userIsAuthenticated = false;

  headerDetails: { user_type: string, email: string };

  ngOnInit() {
    this.authService.getHeaderDetails();
    this.headerDetailsSubs = this.authService.getHeaderDetailsListener().subscribe(
      headerDetails => {
        if (headerDetails) {
          this.headerDetails = headerDetails;
          console.log(headerDetails);
          this.userIsAuthenticated = this.authService.getisAuth();
          this.auSub = this.authService.getAuthStatusListener().subscribe(
          isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
            console.log(isAuthenticated);
          }
        );
        }
      }
    );

    // hide login and signup button depend on route
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        if (e.url === '/login') {
          this.onLogin = true;
          this.onRegister = false;
        } else if (e.url === '/register') {
          this.onRegister = true;
          this.onLogin = false;
        } else {
          this.onLogin = false;
          this.onRegister = false;
        }
      }
      if (!(e instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy() {
    if (this.auSub) {
      this.auSub.unsubscribe();
    }
    if (this.headerDetailsSubs) {
      this.headerDetailsSubs.unsubscribe();
    }
  }

  onSignOut() {
    this.authService.signOut();
  }
}
