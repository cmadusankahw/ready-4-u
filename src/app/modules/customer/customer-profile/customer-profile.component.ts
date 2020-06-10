import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';


import { ErrorComponent } from 'src/app/error/error.component';
import { Customer } from '../../auth/auth.model';


@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit, OnDestroy {

   // subscription
   private custSub: Subscription;

   @Input() isowner;
 
   // edit profile mode
   editmode = false;
 

   customer: Customer;
   
   // image to upload
   image: File;
   imageUrl: any = './assets/images/noimg.png';
 

  constructor(private authService: AuthService,
              public dialog: MatDialog,
              public datepipe: DatePipe,
              private router: Router) { }

  ngOnInit() {
    this.authService.getCustomer();
    this.custSub = this.authService.getCustomerUpdateListener().subscribe (
      (sprovider: Customer) => {
          this.customer = sprovider;
      });
  }

  ngOnDestroy() {
    if (this.custSub) {
      this.custSub.unsubscribe();
    }
    this.imageUrl = './assets/images/noimg.png';
    this.image = null;
  }

  changePassword(recievedForm: NgForm) {
    if (recievedForm.invalid) {
      console.log('Form invalid');
    }
    if ( recievedForm.value.new_password1 !== recievedForm.value.new_password2) {
      this.dialog.open(ErrorComponent, {data: {message: 'Passwords mismatch! Try again!'}});
    }
   // this.serviceProviderService.changeUserPassword(currentPword, newPword);
  }

  // edit user
  editUser(editForm: NgForm) {
    if (editForm.invalid) {
      console.log('Form Invalid');
    } else {
      const cust: Customer = {
        user_id: this.customer.user_id,
        user_type: this.customer.user_type,
        first_name: editForm.value.first_name,
        last_name: editForm.value.last_name,
        profile_pic: this.customer.profile_pic,
        email: editForm.value.email,
        contact_no: editForm.value.contact_no,
        address_line1: editForm.value.address_line1,
        address_line2: editForm.value.address_line2,
        gender: editForm.value.gender,
        reg_date: this.customer.reg_date,
        location: null
        };
      this.authService.updateCustomer(cust, this.image);
      this.custSub = this.authService.getCustomerUpdateListener()
      .subscribe((recievedCust: Customer) => {
        console.log(recievedCust);
        this.customer = recievedCust;
      });
      editForm.resetForm();
      this.editmode = false;
      setTimeout(() => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/cust/profile']);
      }, 1000);
    }
  }

    // profile pic uploading
    onImageUploaded(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = file;
        this.imageUrl = reader.result;
      };
    }

}
