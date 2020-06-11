import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessComponent } from 'src/app/success/success.component';

import {
  ServiceCategory,
  Task,
  Order,
} from './service.model';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private serviceCategoriesUpdated = new Subject<ServiceCategory[]>();
  private serviceCategoryUpdated = new Subject<ServiceCategory>();
  private orderUpdated = new Subject<Order>();
  private ordersUpdated = new Subject<Order[]>();

  private serviceCategories: ServiceCategory[] = [];
  private serviceCategory: ServiceCategory;

  private orders: Order[] = [];

  url = 'http://localhost:3000/api/';

  private order: Order;


  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}


  getServiceCategories() {
    this.http
      .get<{ message: string; categories: ServiceCategory[] }>(this.url + 'service/cat')
      .subscribe((recievedData) => {
        this.serviceCategories = recievedData.categories;
        this.serviceCategoriesUpdated.next([...this.serviceCategories]);
      });
  }

  getServiceCategory(id: string) {
    this.http
      .get<{ message: string; categorie: ServiceCategory }>(this.url + 'service/cat' + id)
      .subscribe((recievedData) => {
        this.serviceCategory = recievedData.categorie;
        this.serviceCategoryUpdated.next(this.serviceCategory);
      });
  }

  getOrders() {
    this.http
      .get<{ message: string; orders: Order[] }>(
        this.url + 'service/order/get'
      )
      .subscribe(
        (recievedData) => {
          this.orders = recievedData.orders;
          this.ordersUpdated.next([...this.orders]);
        });
  }

 
  getOrder(orderId: string) {
    this.http
      .get<{ message: string; order: Order }>(
        this.url + 'service/order/get/'+ orderId
      )
      .subscribe(
        (recievedData) => {
          this.order = recievedData.order;
          this.orderUpdated.next(this.order);
        });
  }


  getServiceCategoriesUpdateListener() {
    return this.serviceCategoriesUpdated.asObservable();
  }

  getServiceCategoryUpdateListener() {
    return this.serviceCategoryUpdated.asObservable();
  }

  getOrderUpdateListener() {
    return this.orderUpdated.asObservable();
  }

  getOrdersUpdateListener() {
    return this.ordersUpdated.asObservable();
  }

 
   // add new service
   createOrder(order: Order, images: File[]) {
    const serviceData = new FormData();
    for (const image of images) {
      if (image) {
        serviceData.append('images[]', image, image.name);
      }
    }
    console.log(serviceData);
    this.http.post<{imagePaths: string[]}>(this.url + 'service/order/img', serviceData )
      .subscribe ((recievedImages) => {
        console.log(recievedImages);
        if (recievedImages.imagePaths[0]) {
          order.image1 = recievedImages.imagePaths[0];
        }
        if (recievedImages.imagePaths[1]) {
          order.image2 = recievedImages.imagePaths[1];
        }
        if (recievedImages.imagePaths[2]) {
          order.image3 = recievedImages.imagePaths[2];
        }
        this.http.post<{ message: string, result: Order }>(this.url + 'service/order/add', order)
        .subscribe((recievedData) => {
          console.log(recievedData.message);
          this.order  = recievedData.result;
          this.orderUpdated.next(this.order);
          setTimeout( () => {
            this.router.navigate(['cust/map/' + recievedData.result.order_id]);
          }, 500);
         
      });
    });
  }

}