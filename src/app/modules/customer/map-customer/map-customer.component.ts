import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-customer',
  templateUrl: './map-customer.component.html',
  styleUrls: ['./map-customer.component.scss']
})
export class MapCustomerComponent implements OnInit {

  loaded = false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.loaded = true;
    }, 5000);
  }

}
