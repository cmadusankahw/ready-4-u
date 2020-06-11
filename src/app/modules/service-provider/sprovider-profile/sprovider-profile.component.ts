import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';

import { ErrorComponent } from 'src/app/error/error.component';
import { ServiceProvider } from '../../auth/auth.model';
import { Task, ServiceCategory } from '../../services/service.model';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-sprovider-profile',
  templateUrl: './sprovider-profile.component.html',
  styleUrls: ['./sprovider-profile.component.scss'],
})
export class SproviderProfileComponent implements OnInit, OnDestroy {

  // subscription
  private spSub: Subscription;
  private catSub: Subscription;

  @Input() public isowner;

  // edit profile mode
  public editmode = false;

  public serviceProvider: ServiceProvider;

  // image to upload
  public image: File;
  public imageUrl: any = './assets/images/noimg.png';

  // Districts
  public districts = ['Colombo', 'Kaluthara', 'Galle', 'Matara', 'Matale', 'Kandy', 'Gampaha' , 'Hambanthota', 'Negamobo', 'Chiillaw', 'Badulla' , 'Nuwara Eliya'];

  // service categories
  public serviceCategories: ServiceCategory[];

  // rate types
  public rateTypes = ['per Hour', 'per Day'];

  public newTasks: Task[] = [
    {id: '', task: '', rate: 0, rate_type: 'per Day', rating: 0},
  ];

  public spId: string;

  constructor(private authService: AuthService,
              public dialog: MatDialog,
              public datepipe: DatePipe,
              private router: Router,
              private serviceService: ServiceService) { }

   public ngOnInit() {
    this.serviceService.getServiceCategories();
    this.catSub = this.serviceService.getServiceCategoriesUpdateListener().subscribe (
     (cat) => {
         this.serviceCategories = cat;
         console.log(this.serviceCategories);
     });
    if (this.spId) {
      this.authService.getServiceproviderById(this.spId);
     } else {
      this.authService.getServiceprovider();
     }
    this.spSub = this.authService.getServiceprovidertUpdateListener().subscribe (
      (sprovider) => {
          this.serviceProvider = sprovider;
      });
  }

  public ngOnDestroy() {
    if (this.spSub) {
      this.spSub.unsubscribe();
    }
    if (this.catSub) {
      this.catSub.unsubscribe();
    }
    this.imageUrl = './assets/images/noimg.png';
    this.image = null;
  }

  public changePassword(recievedForm: NgForm) {
    if (recievedForm.invalid) {
      console.log('Form invalid');
    }
    if ( recievedForm.value.new_password1 !== recievedForm.value.new_password2) {
      this.dialog.open(ErrorComponent, {data: {message: 'Passwords mismatch! Try again!'}});
    }
   // this.serviceProviderService.changeUserPassword(currentPword, newPword);
  }

  // edit user
  public editUser(editForm: NgForm) {
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
        tasks: this.serviceProvider.tasks,
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
    public onImageUploaded(event: Event) {
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
    public newTask(task: Task) {
      task.id = task.task.trim();
      this.serviceProvider.tasks.push(task);
      this.newTasks.push({
        id: '', task: '', rate: 0, rate_type: '', rating: 0,
      });
    }

}
