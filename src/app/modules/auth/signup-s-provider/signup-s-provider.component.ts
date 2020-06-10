import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import {ServiceProvider, ServiceProviderTemp } from '../auth.model';
import { AuthService } from '../auth.service';
import { ServiceService } from '../../services/service.service';
import { Subscription } from 'rxjs';
import { ServiceCategory } from '../../services/service.model';



interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup-s-provider',
  templateUrl: './signup-s-provider.component.html',
  styleUrls: ['./signup-s-provider.component.scss'],
})
export class SignupSProviderComponent implements OnInit, OnDestroy {

  //subscription
  private spSub: Subscription;

  // registered sp
  spTemp: ServiceProviderTemp;

  categories: ServiceCategory[] = [];

  // Districts
  districts = ['Colombo', 'Kaluthara', 'Galle', 'Matara', 'Matale', 'Kandy', 'Gampaha' , 'Hambanthota', 'Negamobo', 'Chiillaw', 'Badulla' , 'Nuwara Eliya'];


  constructor(private router: Router,
              public datepipe: DatePipe,
              public authService: AuthService,
              private serviceService: ServiceService) { }

  ngOnInit() {
    // get merchant temp
    this.spTemp = this.authService.getServiceproviderTemp();

    this.serviceService.getServiceCategories();
    this.serviceService.getServiceCategoriesUpdateListener()
      .subscribe( res => {
        if (res) {
          this.categories = res;
          console.log(this.categories);
         }});


    // router scroll
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }

  ngOnDestroy() {
  }

  // signup user
  signupUser(signupForm: NgForm) {
    if (signupForm.invalid) {
      console.log('Form Invalid');
    } else {

      const sp: ServiceProvider = {
          user_id: this.spTemp.user_id,
          user_type: signupForm.value.user_type,
          first_name: this.spTemp.first_name,
          last_name: this.spTemp.last_name,
          nic: signupForm.value.nic,
          profile_pic: './assets/images/noimg.png',
          email: this.spTemp.email,
          contact_no: this.spTemp.contact_no,
          service_category: signupForm.value.category,
          address_line1:  signupForm.value.address1,
          address_line2: signupForm.value.address2,
          district: signupForm.value.district,
          gender: signupForm.value.gender,
          date_of_birth: signupForm.value.birthday,  // check
          reg_date: this.spTemp.reg_date,
          tasks: [],
          isavailable: false,
          location: null,
          firm: { hasfirm: false, firm: '' , firmOwner_id : null}
        };
      console.log(sp);
      this.authService.addServiceprovider(sp, this.spTemp.password);
      signupForm.resetForm();
    }
  }



}
