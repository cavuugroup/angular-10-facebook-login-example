import {Component, OnInit} from '@angular/core';

import {AccountService} from './_services';
import {Account} from './_models';
import LatLng = google.maps.LatLng;
import Animation = google.maps.Animation;
import {browser} from 'protractor';

@Component({selector: 'app', templateUrl: 'app.component.html'})
export class AppComponent implements OnInit {
  account: Account;
  latitude = 51.678418;
  longitude = 7.809007;

  // center: google.maps.LatLng;

  markerPositions: google.maps.LatLng[] = [new LatLng(this.latitude.valueOf(), this.longitude.valueOf())];


  markerPosition: google.maps.LatLngLiteral;
  markerOptions: google.maps.MarkerOptions = {draggable: false, title: 'asas', animation: Animation.BOUNCE};
  mapOptions: google.maps.MapOptions = {};

  constructor(private accountService: AccountService) {
    this.accountService.account.subscribe(x => this.account = x);
    navigator.geolocation.getCurrentPosition(position => {
      this.mapOptions.center = new LatLng(position.coords.latitude, position.coords.longitude);
    });
  }

  logout() {
    this.accountService.logout();
  }

  onChooseLocation(event) {
    console.log(event);
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions = [];
    this.markerPositions.push(new LatLng(event.latLng.lat(), event.latLng.lng()));
  }

  ngOnInit(): void {
  }
}
