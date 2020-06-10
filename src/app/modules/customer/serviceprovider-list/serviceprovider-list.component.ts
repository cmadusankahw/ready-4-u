import { Component, OnInit } from '@angular/core';
import { ServiceProvider } from '../../auth/auth.model';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Task } from '../../services/service.model';


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

  // imageUrls
  imageUrls = [] ;


  images: File[] = [];

  constructor( private route: ActivatedRoute,
               private router: Router,
               private location: Location,
               private authService: AuthService) {
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
