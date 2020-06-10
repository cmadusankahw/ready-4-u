import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';


import { ErrorComponent } from 'src/app/error/error.component';
import { ServiceProvider } from '../../auth/auth.model';
import { Task } from '../../services/service.model';


@Component({
  selector: 'app-sprovider-profile',
  templateUrl: './sprovider-profile.component.html',
  styleUrls: ['./sprovider-profile.component.scss']
})
export class SproviderProfileComponent implements OnInit, OnDestroy {

  // subscription
  private spSub: Subscription;

  @Input() isowner;

  // edit profile mode
  editmode = false;

  serviceProvider: ServiceProvider =  {
    user_id: 'USER-01',
    user_type: 'serviceProvider',
    first_name: 'Jayantha',
    last_name: 'Karunarathna',
    profile_pic: './assets/images/spprofilephoto.jpg',
    nic: '123456789V',
    email: 'saman78@gmail.com',
    contact_no: '0719724335',
    service_category: 'Electrician',
    address_line1: 'Main Street',
    address_line2: 'Dalugama, Kelaniya',
    district:'Gampaha',
    gender: 'male',
    date_of_birth: '1995-05-07',
    reg_date: new Date().toISOString(),
    tasks : [{
      id: '1',
      task: 'Domestic Applience Repair',
      rate: 500,
      rate_type: 'per Hour',
      rating:2.3
    }],
    isavailable: true,
    location: {latitude: 0, longtitude: 0 , town: 'Kelaniya'},
    firm: {
      hasfirm: false,
      firmOwner_id: '',
      firm: ''
    }
  }
  
  // image to upload
  image: File;
  imageUrl: any = './assets/images/merchant/nopic.png';


  // Districts
  districts = ['Colombo', 'Kaluthara', 'Galle', 'Matara', 'Matale', 'Kandy', 'Gampaha' , 'Hambanthota', 'Negamobo', 'Chiillaw', 'Badulla' , 'Nuwara Eliya'];

  // service categories
  serviceCategories = ['Electrician', 'Plumbr'];

  // rate types
  rateTypes = ['per Hour', 'per Day'];

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
    if (this.spSub) {
      this.spSub.unsubscribe();
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
      this.spSub = this.authService.getServiceprovidertUpdateListener()
      .subscribe((recievedSp: ServiceProvider) => {
        console.log(recievedSp);
        this.serviceProvider = recievedSp;
      });
      console.log('Service Provider details updated successfully!');
      editForm.resetForm();
      this.editmode = false;
      setTimeout(() => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/sp/profile']);
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

    // add new task input
    newTask(taskId: string) {
      const tId = (Number(taskId) + 1).toString();
      const task: Task = {
        id: tId,
        task: '',
        rate: 0,
        rate_type: 'per Hour',
        rating: 0
      };
      this.serviceProvider.tasks.push(task);
    }

}
