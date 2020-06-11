import { Component, OnInit, ViewChild, ElementRef, NgZone, Input, EventEmitter, Output } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { MatDialog } from '@angular/material';

import { ErrorComponent } from 'src/app/error/error.component';


@Component({
  selector: 'app-map-service-provider',
  templateUrl: './map-service-provider.component.html',
  styleUrls: ['./map-service-provider.component.scss']
})
export class MapServiceProviderComponent implements OnInit {


  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  // recieved location
  @Input() recievedLocation = {
    lat: 0,
    lang: 0,
  }

  zoom: number;
 
  address: string;


  loaded = false;

  private geoCoder;


  constructor( private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public dialog: MatDialog) { }

ngOnInit() {
// load Places Autocomplete
this.setCurrentLocation();
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
