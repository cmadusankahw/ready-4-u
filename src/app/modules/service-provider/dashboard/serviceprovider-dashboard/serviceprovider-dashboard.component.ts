
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';

import { AuthService } from 'src/app/modules/auth/auth.service';
import { ServiceProvider } from 'src/app/modules/auth/auth.model';

@Component({
  selector: 'app-serviceprovider-dashboard',
  templateUrl: './serviceprovider-dashboard.component.html',
  styleUrls: ['./serviceprovider-dashboard.component.scss']
})
export class ServiceproviderDashboardComponent implements OnInit {

  private hSub: Subscription;

  // navigation
  home = 'txt-white row';
  orders = 'txt-white row';
  profile = 'txt-white row';
  report = 'txt-white row';

  serviceProvider: ServiceProvider;

  // pass edit ability
  editmode = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.doRoute();
    this.authService.getServiceprovider();
    this.hSub = this.authService.getServiceprovidertUpdateListener().subscribe (
      res => {
          this.serviceProvider = res;
      });
  }

  doRoute() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        if (e.url === '/cust') {
          this.navHome();
        } else if (e.url === '/cust/orders') {
          this.navOrders();
        } else if (e.url === '/cust/profile') {
          this.navProfile();
        } else if (e.url === '/cust/reports') {
          this.navReports();
        }
    }
  });
  }

  navHome() {
    this.home = 'txt-white row active-nav';
    this.orders = this.profile  = this.report = 'txt-white row';
  }

  navOrders() {
    this.orders = 'txt-white row active-nav';
    this.home = this.profile  = this.report = 'txt-white row';
  }

  navProfile() {
    this.profile = 'txt-white row active-nav';
    this.orders = this.home  = this.report =  'txt-white row';
  }

  navReports() {
    this.report = 'txt-white row active-nav';
    this.orders = this.home  = this.profile = 'txt-white row';
  }
}
