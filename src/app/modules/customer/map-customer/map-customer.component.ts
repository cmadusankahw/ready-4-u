import { Component, OnInit, ViewChild, ElementRef, NgZone, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { MatDialog } from '@angular/material';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ErrorComponent } from 'src/app/error/error.component';
import { ServiceService } from '../../services/service.service';
import { Subscription } from 'rxjs';
import { Order } from '../../services/service.model';


@Component({
  selector: 'app-map-customer',
  templateUrl: './map-customer.component.html',
  styleUrls: ['./map-customer.component.scss']
})
export class MapCustomerComponent implements OnInit, OnDestroy {


  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  // recieved location
  @Input() recievedLocation = {
    lat: 0,
    lang: 0,
  }

  private orderSub: Subscription;

  zoom: number;
 
  address: string;

  loaded = false;

  orderId: string;

  order: Order;

  private geoCoder;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private location: Location,
               private mapsAPILoader: MapsAPILoader,
               private ngZone: NgZone,
               public dialog: MatDialog,
               private serviceService: ServiceService) {
                let id: string = route.snapshot.params.id;
                this.orderId = id;
                }

  ngOnInit() {
    setTimeout(() => {
      this.loaded = true;
      this.serviceService.getOrder(this.orderId);
      this.serviceService.getOrderUpdateListener().subscribe( (order: Order) => {
        if (order) {
          this.order = order;
          console.log(this.order);
        }
      });
    }, 5000);
    // load Places Autocomplete
    this.setCurrentLocation();
  }

  ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

 // set current location
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.recievedLocation.lat = position.coords.latitude;
        this.recievedLocation.lang = position.coords.longitude;
        this.zoom = 8;
       // this.getAddress(this.recievedLocation.lat, this.recievedLocation.lang);
      });
    }
  }

  // marker dragging is completed
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.recievedLocation.lat = $event.coords.lat;
    this.recievedLocation.lang = $event.coords.lng;
   // this.getAddress(this.recievedLocation.lat, this.recievedLocation.lang);
  }

  // get the ddress of dragged marker
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          this.dialog.open(ErrorComponent, {data: {message: 'No Results Found! Please change marker..'}});
        }
      } else {
        this.dialog.open(ErrorComponent, {data: {message: 'Geocoder failed due to: ' + status}});
      }

    });
  }



}
