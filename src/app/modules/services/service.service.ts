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

  // get methods

  // get service category list
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

  // get serviceprovider after login
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

  // get custmer after login
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

  // listners for subjects

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




}