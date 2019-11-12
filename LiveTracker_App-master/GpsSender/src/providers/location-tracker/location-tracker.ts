import { Injectable, NgZone } from '@angular/core';

import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class LocationTracker {



  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;

 
  constructor(public zone: NgZone, private backgroundGeolocation: BackgroundGeolocation, private geolocation: Geolocation) {
 
  }
 
 
  stopTracking() {
 
 
  }
 



  startTracking() {
    
     // Background Tracking
    
     let config = {
       desiredAccuracy: 0,
       stationaryRadius: 10,
       distanceFilter: 10,
       debug: true,
       interval: 2000,
       saveBatteryOnBackground: false,
       stopOnTerminate: false,
     };
    
     this.backgroundGeolocation.configure(config).subscribe((location) => {
    
       console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
    
       // Run update inside of Angular's zone
       this.zone.run(() => {
         this.lat = location.latitude;
         this.lng = location.longitude;
       });
    
     }, (err) => {
    
       console.log(err);
    
     });
    
     // Turn ON the background-geolocation system.
     this.backgroundGeolocation.start();
    
    
     // Foreground Tracking
    
   let options = {
     frequency: 3000,
     enableHighAccuracy: true
   };
    
   this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
    
     console.log(position);
    
     // Run update inside of Angular's zone
     this.zone.run(() => {
       this.lat = position.coords.latitude;
       this.lng = position.coords.longitude;
     });
    
   });
    
   }

}
