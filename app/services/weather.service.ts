import { Injectable } from '@angular/core';
import { Http, Response, Headers, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs-operators';
import {Weather} from '../app.component';


@Injectable()
export class WeatherService {
    constructor(private http: Http, private jsonp: Jsonp) { }

    getCurrentForecast(currentLat: any, currentLong: any) {
        // get the current forecast for latitude and longitude 
        // TODO: don't hardcode URL here
        var weatherUrl = "https://api.darksky.net/forecast/cf9cd81459a4017710b133ffa3d1bcf8/" + currentLat + "," + currentLong + "?callback=JSONP_CALLBACK";
        return this.jsonp
            .get(weatherUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));;
    }

    getLatLongFromZipCode(zipCode: string) {
        // get the latitude and longitude for a zip code
        // TODO: don't hardcode URL here
        var zipCodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=AIzaSyCE3MMVrk7VNqEZ-KKxeP-RSOxpwDvrQFs";
        return this.http
            .get(zipCodeUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));;
    }

    getZipCodeFromLatLong(currentLat: any, currentLong: any) {
        // get the zip code for a latitude and longitude
        // TODO: don't hardcode URL here
        var latLongUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + currentLat + "," + currentLong + "&result_type=postal_code&key=AIzaSyCE3MMVrk7VNqEZ-KKxeP-RSOxpwDvrQFs";
        return this.http
            .get(latLongUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));;


    }
}
