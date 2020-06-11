import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/modules/services/service.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-serviceprovider-dhome',
  templateUrl: './serviceprovider-dhome.component.html',
  styleUrls: ['./serviceprovider-dhome.component.scss']
})
export class ServiceproviderDhomeComponent implements OnInit, OnDestroy {

  // subscription
  private orderSub: Subscription;

  // recieved current order
  currentOrder: Order = {
    order_id: 'ORDER-1',
    ordered_time: '2020-06-09-22:34:18',
    service_category: 'Electrician',
    description: ' Please complete my order quickly',
    image1: './assets/images/noimg.png',
    image2: './assets/images/noimg.png',
    image3: './assets/images/noimg.png',
    task: {
      id: '1',
      task: 'Domestic Applience Repair',
      rate: 500,
      rate_type: 'per Hour',
      rating:2.3
    },
    state: 'ongoing',
    total_amount_charged: 0,
    service_provider: {
        user_id: 'USER-01',
        service_provider_name: '',
        email: '',
        profile_pic: ''
    },
    customer: {
        user_id: 'USER-01',
        customer_name: '',
        email: '',
        profile_pic: ''
    }
  };

  constructor() { }

  ngOnInit() {
    // get current order code here
  }

  ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

}
