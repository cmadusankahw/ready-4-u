import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';


import { ErrorComponent } from 'src/app/error/error.component';
import { ServiceProvider } from '../../auth/auth.model';
import { Task, ServiceCategory } from '../../services/service.model';
import { ServiceService } from '../../services/service.service';


@Component({
  selector: 'app-sprovider-profile',
  templateUrl: './sprovider-profile.component.html',
  styleUrls: ['./sprovider-profile.component.scss']
})
export class SproviderProfileComponent implements OnInit, OnDestroy {

  // subscription
  private spSub: Subscription;
  private catSub: Subscription;

  @Input() isowner;

  // edit profile mode
  editmode = false;

  serviceProvider: ServiceProvider;

  // image to upload
  image: File;
  imageUrl: any = './assets/images/noimg.png';


  // Districts
  districts = ['Colombo', 'Kaluthara', 'Galle', 'Matara', 'Matale', 'Kandy', 'Gampaha' , 'Hambanthota', 'Negamobo', 'Chiillaw', 'Badulla' , 'Nuwara Eliya'];

  // service categories
  serviceCategories : ServiceCategory[];

  // rate types
  rateTypes = ['per Hour', 'per Day'];

  newTasks: Task[]= [
    {id:'', task: '', rate: 0, rate_type: 'per Day', rating: 0}
  ];

  constructor(private authService: AuthService,
              public dialog: MatDialog,
              public datepipe: DatePipe,
              private router: Router,
              private serviceService: ServiceService) { }

   ngOnInit() {
    this.serviceService.getServiceCategories();
    this.catSub = this.serviceService.getServiceCategoriesUpdateListener().subscribe (
     cat => {
         this.serviceCategories = cat;
         console.log(this.serviceCategories);
     });
    this.authService.getServiceprovider();
    this.spSub = this.authService.getServiceprovidertUpdateListener().subscribe (
      sprovider => {
          this.serviceProvider = sprovider;
      });
  }

  ngOnDestroy() {
    if (this.spSub) {
      this.spSub.unsubscribe();
    }
    if (this.catSub) {
      this.catSub.unsubscribe();
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
      const sp: ServiceProvider = {
        user_id: this.serviceProvider.user_id,
        user_type: this.serviceProvider.user_type,
        nic: editForm.value.nic,
        first_name: editForm.value.first_name,
        last_name: editForm.value.last_name,
        profile_pic: this.serviceProvider.profile_pic,
        email: editForm.value.email,
        contact_no: editForm.value.contact_no,
        service_category: editForm.value.service_category,
        address_line1: editForm.value.address_line1,
        address_line2: editForm.value.address_line2,
        district: editForm.value.district,
        gender: editForm.value.gender,
        date_of_birth: editForm.value.date_of_birth,
        reg_date: this.serviceProvider.reg_date,
        isavailable: this.serviceProvider.isavailable,
        location: this.serviceProvider.location,
        firm: this.serviceProvider.firm,
        tasks: this.serviceProvider.tasks
        };
      this.authService.updateServiceprovider(sp, this.image);
      this.spSub = this.authService.getServiceprovidertUpdateListener()
      .subscribe((recievedSp: ServiceProvider) => {
        console.log(recievedSp);
        this.serviceProvider = recievedSp;
      });
      console.log('Service Provider details updated!');
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
    newTask(task: Task) {
      task.id = task.task.trim();
      this.serviceProvider.tasks.push(task);
      this.newTasks.push({
        id: '', task: '', rate: 0, rate_type: '',rating: 0
      });
    }

}
