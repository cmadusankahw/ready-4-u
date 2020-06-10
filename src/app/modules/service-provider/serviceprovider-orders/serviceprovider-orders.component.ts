import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Order } from '../../services/service.model';

@Component({
  selector: 'app-serviceprovider-orders',
  templateUrl: './serviceprovider-orders.component.html',
  styleUrls: ['./serviceprovider-orders.component.scss']
})
export class ServiceproviderOrdersComponent implements OnInit {

  displayedColumns: string[] = ['oid', 'sp', 'time', 'category', 'task', 'action'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscritions
  private orderSub: Subscription;

  @Input() orderType = 'ongoing';

  orders: Order[] = [
    {
      order_id: 'order-1',
      ordered_time: '2020-12-21-03:12:23-',
      service_category: 'Electrician',
      description: 'teest',
      image1: './assets/images/noimg.png',
      image2:  './assets/images/noimg.png',
      image3:  './assets/images/noimg.png',
      task: {
        id: '1',
        task: 'Domestic Applience repair',
        rate:500,
        rate_type: 'per Hour',
        rating: 3.5,
      },
      state: 'ongoing',
      total_amount_charged: 775,
      service_provider: {
        user_id: 'SP1',
        service_provider_name: 'Ranjan Ramanayaka',
        email: ''
      }, customer: {
        user_id: 'SP1',
        customer_name: 'Ranjan Ramanayaka',
        email: ''
      }
    },
    {
      order_id: 'order-2',
      ordered_time: '2020-12-21-03:12:23-',
      service_category: 'Electrician',
      description: 'teest',
      image1: './assets/images/noimg.png',
      image2:  './assets/images/noimg.png',
      image3:  './assets/images/noimg.png',
      task: {
        id: '1',
        task: 'Domestic Applience repair',
        rate:500,
        rate_type: 'per Hour',
        rating: 3.5,
      },
      state: 'completed',
      total_amount_charged: 775,
      service_provider: {
        user_id: 'SP1',
        service_provider_name: 'Ranjan Ramanayaka',
        email: ''
      }, customer: {
        user_id: 'SP1',
        customer_name: 'Ranjan Ramanayaka',
        email: ''
      }
    },
    {
      order_id: 'order-3',
      ordered_time: '2020-12-21-03:12:23-',
      service_category: 'Electrician',
      description: 'teest',
      image1: './assets/images/noimg.png',
      image2:  './assets/images/noimg.png',
      image3:  './assets/images/noimg.png',
      task: {
        id: '1',
        task: 'Domestic Applience repair',
        rate:500,
        rate_type: 'per Hour',
        rating: 3.5,
      },
      state: 'cancelled',
      total_amount_charged: 775,
      service_provider: {
        user_id: 'SP1',
        service_provider_name: 'Ranjan Ramanayaka',
        email: ''
      }, customer: {
        user_id: 'SP1',
        customer_name: 'Ranjan Ramanayaka',
        email: ''
      }
    }
  ];

  recievedOrders: Order[];

  currentOrder: Order;

  showOrder: boolean;


  constructor(private router: Router) { }

  ngOnInit() {
    if (this.orders) {
      this.dataSource = new MatTableDataSource(this.addOrder(this.orders, this.orderType));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }
  }

  ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


 // classify recieved bookings
  addOrder(orders: Order[], state: string) {
    const pOrders = [];
    for (const order of orders) {
      if (order.state === state) {
        pOrders.push(Object.assign({}, order));
      }
    }
    this.recievedOrders = [...pOrders];
    return this.recievedOrders;
  }


   // get selected booking details
   showSelectedOrder(orderId: string) {
    for (const order of this.orders) {
      if (order.order_id === orderId) {
        this.currentOrder = order;
        this.showOrder = true;
        return;
      }
    }
  }


}
