import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'current-weather',
    templateUrl: 'app/html/current-weather.html',
    styleUrls:['app/styles/current-weather.css'],
    providers: [WeatherService]
})
export class CurrentWeatherComponent implements OnInit { 
    @Input() zipCode:string;
    currentWeather = new Weather();
    errorMessage: string;
    currentLat = 0;
    currentLong = 0;
    constructor(private weatherService: WeatherService   
    ) { }
    
    ngOnInit(): void {
       
        
        if(navigator.geolocation){
           navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        };
        
    }
    
    setPosition(position:any){
        this.currentLat = position.coords.latitude
        this.currentLong = position.coords.longitude;
        this.getWeather();
      }
    getWeather():void{
         this.weatherService.getCurrentForecast(this.currentLat,this.currentLong)
            .subscribe( data => { 
                this.currentWeather.temperature = data.currently.temperature,
                this.currentWeather.summary = data.currently.summary,
                this.currentWeather.icon = data.currently.icon,
                this.currentWeather.precip = data.currently.precipProbability
            },
            err => console.error(err));
    }
}

export class Weather {
  temperature: string;
  summary: string;
  icon:string;
  precip : number;
  temperatureMin: number;
  temperatureMax: number;
  date: Date;
  day: number;
 
}
