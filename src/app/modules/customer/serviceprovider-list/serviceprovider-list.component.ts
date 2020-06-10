import { Component, OnInit } from '@angular/core';
import { ServiceProvider } from '../../auth/auth.model';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-serviceprovider-list',
  templateUrl: './serviceprovider-list.component.html',
  styleUrls: ['./serviceprovider-list.component.scss']
})
export class ServiceproviderListComponent implements OnInit {

  serviceProviders: ServiceProvider[] = [
   { user_id: 'USER-01',
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
     hasfirm: false, firm: '', firmOwner_id: ''
   }}, {
   user_id: 'USER-02',
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
    hasfirm: false, firm: '', firmOwner_id: ''
  }},
  ];

  taskId: number;

  hireNow = false;

  // selecte service provider
  selectedServiceProvider: ServiceProvider;

  // imageUrls
  imageUrls = [] ;


  images: File[] = [];

  constructor( private route: ActivatedRoute,
               private router: Router,
               private location: Location) {
    let id: string = route.snapshot.params.category_id;
    this.taskId = Number(id.split('_')[1]) - 1;
  }

  ngOnInit( ) {
    console.log(this.taskId);
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
      console.log('fom invalid');
      return;
    }
    this.router.navigate(['/cust/map']);
  }

  // image uploading
  onImagesUploaded(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.images.push(file);
        this.imageUrls.push(reader.result.toString());
      };
  }

}
