import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessComponent } from 'src/app/success/success.component';

import {
  ServiceProvider,
  Customer,
  User,
  ServiceProviderTemp,
  LogIn,
} from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private serviceproviderUpdated = new Subject<ServiceProvider>();
  private serviceprovidersUpdated = new Subject<ServiceProvider[]>();
  private customerUpdated = new Subject<Customer>();
  private userUpdated = new Subject<User[]>();
  private lastIdUpdated = new Subject<string>();

  private serviceprovider: ServiceProvider;
  private customer: Customer;

  private users: User[] = [];

  private serviceproviders: ServiceProvider[];

  // for service provider data passing
  private serviceproviderTemp: ServiceProviderTemp;

  // user type between signup pages
  private userType = false;

  url = 'http://localhost:3000/api/';

  // last signed user id
  private lastId: string;

  // storing token for auth validation
  private token: string;

  // timer to auto logout
  private tokenTimer: any;

  // login details listener
  private authStatusListener = new Subject<boolean>();
  private headerDetailsListener = new Subject<{user_type: string, email: string}>();


  // user login status
  private isAuthenticated = false;

  private headerDetails: {user_type: string, email: string};

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  // get methods

  // return service provider Temp array between comps
  getServiceproviderTemp() {
    if (this.serviceproviderTemp) {
      return this.serviceproviderTemp;
    }
  }

  // get users list to login
  getUser() {
    this.http
      .get<{ message: string; users: User[] }>(this.url + 'auth/users')
      .subscribe((recievedUsers) => {
        this.users = recievedUsers.users;
        this.userUpdated.next([...this.users]);
      });
  }

  // get serviceprovider after login
  getServiceprovider() {
    this.http
      .get<{ message: string; serviceprovider: ServiceProvider }>(
        this.url + 'auth/get/sprovider'
      )
      .subscribe(
        (recievedServiceprovider) => {
          this.serviceprovider = recievedServiceprovider.serviceprovider;
          this.serviceproviderUpdated.next(this.serviceprovider);
        }
      );
  };

   // get serviceprovider after login
   getServiceproviderById(spId: string) {
    this.http
      .get<{ message: string; serviceprovider: ServiceProvider }>(
        this.url + 'auth/get/sprovider/' + spId
      )
      .subscribe(
        (recievedServiceprovider) => {
          this.serviceprovider = recievedServiceprovider.serviceprovider;
          this.serviceproviderUpdated.next(this.serviceprovider);
        }
      );
  }


  // get list of sp
  getServiceproviders(category: string) {
    this.http
      .post<{ message: string; serviceproviders: ServiceProvider[] }>(
        this.url + 'auth/get/sproviders', {category}
      )
      .subscribe(
        (recievedServiceprovider) => {
          this.serviceproviders = recievedServiceprovider.serviceproviders;
          this.serviceprovidersUpdated.next([...this.serviceproviders]);
        }
      );
  }

  // get custmer after login
  getCustomer() {
    this.http
      .get<{ message: string; customer: Customer }>(
        this.url + 'auth/get/customer'
      )
      .subscribe(
        (recievedCustomer) => {
          this.customer = recievedCustomer.customer;
          this.customerUpdated.next(this.customer);
        },
        (error) => {
          this.router.navigate(['/']);
          console.log(error);
        }
      );
  }

  // get details for header
  getHeaderDetails() {
    this.autoAuthUser();
    if (this.token) {
      this.http
        .get<{ user_type: string; email: string, prodile_pic: string}>(
          this.url + 'auth/get/head'
        )
        .subscribe((recievedHeader) => {
          this.headerDetails = {
            user_type: recievedHeader.user_type,
            email: recievedHeader.email,
          };
          this.headerDetailsListener.next(this.headerDetails);
        });
    }
  }

  // get user type in signup-option
  getUserType() {
    return this.userType;
  }

  // get last product id
  getLastUserId() {
    if (this.users.length) {
      this.lastId = this.users[this.users.length - 1].user_id;
      this.lastIdUpdated.next(this.lastId);
    } else {
      this.http
        .get<{ lastid: string }>(this.url + 'auth/last')
        .subscribe((recievedId) => {
          console.log(recievedId.lastid);
          this.lastId = recievedId.lastid;
          this.lastIdUpdated.next(this.lastId);
        });
    }
  }

  // get token to be used by other services
  getToken() {
    return this.token;
  }

  // get authentication status
  getisAuth() {
    return this.isAuthenticated;
  }

  // listners for subjects

  getServiceprovidertUpdateListener() {
    return this.serviceproviderUpdated.asObservable();
  }

  getServiceproviderstUpdateListener() {
    return this.serviceprovidersUpdated.asObservable();
  }

  getCustomerUpdateListener() {
    return this.customerUpdated.asObservable();
  }

  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }

  getLastIdUpdateListener() {
    return this.lastIdUpdated.asObservable();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getHeaderDetailsListener() {
    return this.headerDetailsListener.asObservable();
  }

  // set methods

  // add merchant
  addServiceprovider(serviceprovider: ServiceProvider, password: string) {
    const user: User = {
      user_id: serviceprovider.user_id,
      user_type: serviceprovider.user_type,
      email: serviceprovider.email,
      password,
      state: false,
    };
    this.http
      .post<{ message: string; result: User }>(
        this.url + 'auth/signup/user',
        user
      )
      .subscribe(
        (recievedData) => {
          console.log(recievedData.message);
          console.log(recievedData.result);
          this.users.push(user);
          this.userUpdated.next([...this.users]);
          this.http
            .post<{ message: string }>(
              this.url + 'auth/signup/sprovider',
              serviceprovider
            )
            .subscribe(
              (recievedMessage) => {
                console.log(recievedMessage.message);
                this.getLastUserId();
                this.dialog.open(SuccessComponent, {
                  data: { message: 'Signed up as a Service Provider successfully' },
                });
                this.router.navigate(['/']);
              },
              (error) => {
                console.log(error);
              }
            );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // add event planner
  addCustomer(customer: Customer, password: string) {
    const user: User = {
      user_id: customer.user_id,
      user_type: 'customer',
      email: customer.email,
      password,
      state: false,
    };
    this.http
      .post<{ message: string; result: User }>(
        this.url + 'auth/signup/user',
        user
      )
      .subscribe(
        (recievedData) => {
          console.log(recievedData.message);
          console.log(recievedData.result);
          this.users.push(user);
          this.userUpdated.next([...this.users]);
          this.http
            .post<{ message: string }>(
              this.url + 'auth/signup/customer',
              customer
            )
            .subscribe(
              (recievedMessage) => {
                console.log(recievedMessage.message);
                this.getLastUserId();
                this.dialog.open(SuccessComponent, {
                  data: { message: 'Signed up successfully!' },
                });
                this.router.navigate(['/']);
              },
              (error) => {
                console.log(error);
              }
            );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // update service provider
  updateServiceprovider(serviceprovider: ServiceProvider, image: File) {
    if (image) {
      const newServiceprovider = new FormData();
      newServiceprovider.append('images[]', image, image.name);
      console.log(newServiceprovider);

      this.http
        .post<{ profile_pic: string }>(
          this.url + 'auth/profile/img',
          newServiceprovider
        )
        .subscribe((recievedImage) => {
          console.log(recievedImage);
          serviceprovider.profile_pic = recievedImage.profile_pic;
          this.http
            .post<{ message: string }>(
              this.url + 'auth/sprovider/edit',
              serviceprovider
            )
            .subscribe(
              (recievedData) => {
                console.log(recievedData.message);
                this.serviceprovider = serviceprovider;
                this.serviceproviderUpdated.next(this.serviceprovider);
                this.dialog.open(SuccessComponent, {
                  data: {
                    message: 'Profile Details Updated Successfully!',
                  },
                });
              },
              (error) => {
                console.log(error);
              }
            );
        });
    } else {
      this.http
        .post<{ message: string }>(
          this.url + 'auth/sprovider',
          serviceprovider
        )
        .subscribe(
          (recievedData) => {
            console.log(recievedData.message);
            this.serviceprovider = serviceprovider;
            this.serviceproviderUpdated.next(this.serviceprovider);
            this.dialog.open(SuccessComponent, {
              data: { message: 'Profile Details Updated Successfully!' },
            });
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  // update planner
  updateCustomer(customer: Customer, image: File) {
    if (image) {
      const newCustomer = new FormData();
      newCustomer.append('images[]', image, image.name);
      console.log(newCustomer);

      this.http
        .post<{ profilePic: string }>(
          this.url + 'auth/profile/img',
          newCustomer
        )
        .subscribe((recievedImage) => {
          console.log(recievedImage);
          customer.profile_pic = recievedImage.profilePic;
          this.http
            .post<{ message: string }>(this.url + 'auth/customer/edit', customer)
            .subscribe(
              (recievedData) => {
                console.log(recievedData.message);
                this.customer = customer;
                this.customerUpdated.next(this.customer);
                this.dialog.open(SuccessComponent, {
                  data: {
                    message: 'Profile Details Updated Successfully!',
                  },
                });
              },
              (error) => {
                console.log(error);
              }
            );
        });
    } else {
      this.http
        .post<{ message: string }>(this.url + 'auth/customer/edit', customer)
        .subscribe(
          (recievedData) => {
            console.log(recievedData.message);
            this.customer = customer;
            this.customerUpdated.next(this.customer);
            this.dialog.open(SuccessComponent, {
              data: { message: 'Profile Details Updated Successfully!' },
            });
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  // add a new Merchant Temp
  addServiceproviderTemp(serviceproviderTemp: ServiceProviderTemp) {
    this.serviceproviderTemp = serviceproviderTemp;
  }

  // set user type
  setUserType(userType: boolean) {
    this.userType = userType;
    console.log(this.userType);
  }

  // log in user
  signIn(login: LogIn) {
    this.http
      .post<{
        message: string;
        token: any;
        expiersIn: number;
        user_type: string;
      }>(this.url + 'auth/signin', login)
      .subscribe(
        (recievedData) => {
          console.log(recievedData.message);

          this.setAuthTimer(recievedData.expiersIn);

          this.token = recievedData.token;
          console.log(this.token);
          this.getHeaderDetails();

          if (recievedData.token) {
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + recievedData.expiersIn * 1000
            );
            this.saveAuthData(recievedData.token, expirationDate);

            if (recievedData.user_type === 'serviceprovider') {
              this.router.navigate(['/sp']);
            }

            if (recievedData.user_type === 'customer') {
              this.router.navigate(['/cust']);
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // auto auth user after restart
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiersIn = authInformation.expiarationDate.getTime() - now.getTime();
    if (expiersIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiersIn / 1000); // node timers works in secords (not ms)
      this.authStatusListener.next(true);
    }
  }

  // log out user
  signOut() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }

  // starts the session timer
  private setAuthTimer(duration: number) {
    console.log('Setting timer to : ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.signOut();
      alert('Session Time Out! You have been logged out! Please log in back..');
      this.router.navigate(['/']);
    }, duration * 1000);
  }

  // store token and user data in local storage
  private saveAuthData(token: string, expiarationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiarationDate.toISOString());
  }

  // clear locally sotred auth data in timeout or sign out
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  // access locally stored auth data
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (!token || !expiration) {
      return;
    }
    return {
      token,
      expiarationDate: new Date(expiration),
    };
  }
}
