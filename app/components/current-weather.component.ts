import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'current-weather',
    templateUrl: 'app/html/current-weather.html',
    providers: [WeatherService]
})
export class CurrentWeatherComponent implements OnInit { 
    currentWeather = new CurrentWeather();
    errorMessage: string;
    constructor(private weatherService: WeatherService) { }
    
    ngOnInit(): void {
        this.getWeather();
    }
    
    getWeather():void{
         this.weatherService.getCurrentForecast()
            .subscribe( data => { 
                this.currentWeather.cloudCover = data.currently.cloudCover,
                this.currentWeather.temperature = data.currently.temperature,
                this.currentWeather.summary = data.currently.summary
            },
            err => console.error(err));
    }
}

export class CurrentWeather {
  cloudCover: number;
  temperature: string;
  summary: string;
}
