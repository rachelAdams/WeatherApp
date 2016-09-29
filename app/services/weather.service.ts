import { Injectable } from '@angular/core';
import { Http, Response, Headers, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs-operators';
import {Weather} from '../app.component';


@Injectable()
export class WeatherService {
    //weatherUrl = 'https://api.darksky.net/forecast/cf9cd81459a4017710b133ffa3d1bcf8/42.3601,-71.0589?callback=JSONP_CALLBACK';
    constructor(private http: Http, private jsonp:Jsonp) {}
    
    getCurrentForecast(currentLat: any, currentLong: any){
        var weatherUrl = "https://api.darksky.net/forecast/cf9cd81459a4017710b133ffa3d1bcf8/" + currentLat + "," + currentLong +"?callback=JSONP_CALLBACK";
        return this.jsonp
         .get(weatherUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));;
  }
  
    getLatLongFromZipCode(zipCode:string){
        //https://maps.googleapis.com/maps/api/geocode/json?address={zipcode}
        var zipCodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=AIzaSyCE3MMVrk7VNqEZ-KKxeP-RSOxpwDvrQFs";//?callback=CALLBACK";
        return this.http
            .get(zipCodeUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));;
    
    }

    getZipCodeFromLatLong(currentLat: any, currentLong: any) {
        var latLongUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + currentLat + "," + currentLong + "&result_type=postal_code&key=AIzaSyCE3MMVrk7VNqEZ-KKxeP-RSOxpwDvrQFs";
        return this.http
            .get(latLongUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));;


    }
}