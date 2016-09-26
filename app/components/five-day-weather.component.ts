import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'five-day-weather',
    templateUrl: 'app/html/five-day-weather.html',
    providers: [WeatherService]
})
export class FiveDayWeatherComponent implements OnInit { 
    fiveDayWeather:DailyWeather[] = [];
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
    getWeather(){
         this.weatherService.getCurrentForecast(this.currentLat,this.currentLong)
            .subscribe( data => { 
                var count = 0;
                for (let day of data.daily.data){
                    if (count < 5){
                        var forecast = new DailyWeather();
                        forecast.temperatureMax = day['temperatureMax'],
                        forecast.temperatureMin = day['temperatureMin'],
                        forecast.summary = day['summary'],
                        forecast.date = day['time'],
                        forecast.icon = day['icon'];
                        
                        this.fiveDayWeather.push(forecast);
                        count ++;
                    }
            }
            },
            err => console.error(err));
    }
}

export class DailyWeather {
  temperatureMin: number;
  temperatureMax: number;
  summary: string;
  date: Date;
  icon: string;
  day: number;
}
