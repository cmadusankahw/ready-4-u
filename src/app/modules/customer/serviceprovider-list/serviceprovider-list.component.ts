import { Component, OnInit } from '@angular/core';
import { ServiceProvider } from '../../auth/auth.model';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Task, Order } from '../../services/service.model';
import { ServiceService } from '../../services/service.service';


@Component({
  selector: 'app-serviceprovider-list',
  templateUrl: './serviceprovider-list.component.html',
  styleUrls: ['./serviceprovider-list.component.scss']
})
export class ServiceproviderListComponent implements OnInit {

  private spSub: Subscription;

  serviceProviders: ServiceProvider[] = [];

  task: string;

  sptask: Task;

  category: string;

  hireNow = false;

  // selecte service provider
  selectedServiceProvider: ServiceProvider;

  // images to upload
  image01: File;
  image01Url: any =  './assets/images/noimg.png';
  image02: File;
  image02Url: any = './assets/images/noimg.png';
  image03: File;
  image03Url: any = './assets/images/noimg.png';


  constructor( private route: ActivatedRoute,
               private router: Router,
               private location: Location,
               private authService: AuthService,
               private serviceService: ServiceService) {
    let id: string = route.snapshot.params.category_id;
    this.category = id.split('_')[0];
    this.task = id.split('_')[1];
  }

  ngOnInit( ) {
    console.log(this.task);
    console.log(this.category);
    setTimeout(()=> {
      this.authService.getServiceproviders(this.category);
      this.spSub = this.authService.getServiceproviderstUpdateListener()
          .subscribe((recievedServices: ServiceProvider[]) => {
            if (recievedServices) {
              console.log(recievedServices);
              for (let sp of recievedServices) {
                for (const cat of sp.tasks) {
                  if (cat.id === this.task) {
                    this.sptask = cat;
                    this.serviceProviders.push(sp);
                  }
                }
              }
              console.log(this.serviceProviders);
            }
  
      });
    },500);  
  }


  ngOnDestroy() {
    if (this.spSub) {
      this.spSub.unsubscribe();
    }
    this.clearImages();
  }


  // clear image cache
  clearImages() {
    this.image01Url = './assets/images/noimg.png';
    this.image02Url = './assets/images/noimg.png';
    this.image03Url = './assets/images/noimg.png';
    this.image01 = null;
    this.image02 = null;
    this.image03 = null;
  }


  serviceProviderSelected(userId: string) {
    for (let sp of this.serviceProviders) {
      if (sp.user_id === userId ) {
        this.selectedServiceProvider = sp;
      }
    }
  }

  placeOrder(orderForm: NgForm) {
    if (orderForm.invalid) {
      console.log('form invalid');
      return;
    } else {
      const order: Order = {
        order_id: 'ORDER0',
        ordered_time: new Date().toISOString(),
        service_category:  this.selectedServiceProvider.service_category,
        description: orderForm.value.description,
        image1: './assets/images/noimg.png',
        image2: './assets/images/noimg.png',
        image3: './assets/images/noimg.png',
        state: 'ongoing',
        total_amount_charged: 0,
        task: this.sptask,
        service_provider: {
          user_id: this.selectedServiceProvider.user_id,
          service_provider_name: this.selectedServiceProvider.first_name + ' ' + this.selectedServiceProvider.last_name,
          email: this.selectedServiceProvider.email,
          profile_pic: this.selectedServiceProvider.profile_pic,
      },
      customer: null,
        };
      this.serviceService.createOrder(order, [this.image01, this.image02, this.image03]);
      orderForm.resetForm();
      this.clearImages();
    }

  }

  
// image 01 uploading
onImage01Uploaded(event: Event) {
const file = (event.target as HTMLInputElement).files[0];
const mimeType = file.type;
if (mimeType.match(/image\/*/) == null) {
  return;
}
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
  this.image01 = file;
  this.image01Url = reader.result;
};
}

// image 02 uploading
onImage02Uploaded(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  const mimeType = file.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.image02 = file;
    this.image02Url = reader.result;
  };
}

  // image 03 uploading
onImage03Uploaded(event: Event) {
const file = (event.target as HTMLInputElement).files[0];
const mimeType = file.type;
if (mimeType.match(/image\/*/) == null) {
  return;
}
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
  this.image03 = file;
  this.image03Url = reader.result;
};
}


}
