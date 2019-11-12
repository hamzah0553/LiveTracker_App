import { HttpClient } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
import { Observable } from 'rxjs/Observable'
import { interval } from 'rxjs/observable/interval';
import { MyLocation } from './myLocation'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  private apiRoot = 'http://185.134.28.181/~rest/api/v1/';
  public test;

  public constructor(public navCtrl: NavController, public locationTracker : LocationTracker, public http: HttpClient) 
  {
    

      
  }
    
  startGPS() 
  {

    this.locationTracker.startTracking();
    interval(10000).subscribe(x => {
      this.postLocation();
    });
  }

  postLocation()
  {
    let url = this.apiRoot+'location';
    let lat = this.locationTracker.lat;
    let lng = this.locationTracker.lng;

    const location : MyLocation = {
      token: "qKYXDuMUKXplpoW3hSIPOMffz",
      driver_id : 1,
      order_id : 2,
      latitude :  lat,
      longtitude : lng
    }

    this.test = this.http.post(url, location);
    this.test.subscribe((data : any) => console.log(data));
    console.log(location.latitude);
    
  }



    
    

}
