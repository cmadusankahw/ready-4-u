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
 

   customer: Customer =  {
     user_id: 'USER-01',
     user_type: 'customer',
     first_name: 'Jayantha',
     last_name: 'Karunarathna',
     profile_pic: './assets/images/spprofilephoto.jpg',
     email: 'saman78@gmail.com',
     contact_no: '0719724335',
     gender: 'male',
     address_line1: 'Main Street',
     address_line2: 'Dalugama, Kelaniya',
     reg_date: new Date().toISOString(),
     location: {latitude: 0, longtitude: 0 , town: 'Kelaniya'}
   }
   
   // image to upload
   image: File;
   imageUrl: any = './assets/images/merchant/nopic.png';
 

  constructor(private authService: AuthService,
              public dialog: MatDialog,
              public datepipe: DatePipe,
              private router: Router) { }

  ngOnInit() {
    // this.authService.getServiceprovider();
    // this.spSub = this.authService.getServiceprovidertUpdateListener().subscribe (
    //  sprovider => {
    //      this.serviceProvider = sprovider;
    //  });
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
      // const merchant: ServiceProvider = {
      //   user_id: this.serviceProvider.user_id,
      //   user_type: this.serviceProvider.user_type,
      //   nic: editForm.value.nic,
      //   first_name: editForm.value.first_name,
      //   last_name: editForm.value.last_name,
      //   profile_pic: this.serviceProvider.profile_pic,
      //   email: editForm.value.email,
      //   contact_no: editForm.value.contact_no,
      //   address_line1: editForm.value.address_line1,
      //   address_line2: editForm.value.address_line2,
      //   postal_code: editForm.value.postal_code,
      //   gender: editForm.value.gender,
      //   date_of_birth: editForm.value.date_of_birth,
      //   reg_date: this.serviceProvider.reg_date,
      //   id_verification: this.serviceProvider.id_verification,
      //   business: this.serviceProvider.business
      //   };
     // this.authService.updateServiceprovider(merchant, this.image);
      this.custSub = this.authService.getCustomerUpdateListener()
      .subscribe((recievedCust: Customer) => {
        console.log(recievedCust);
        this.customer = recievedCust;
      });
      console.log('Service Provider details updated successfully!');
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
