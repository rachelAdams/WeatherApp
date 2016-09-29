import { Component, OnInit } from '@angular/core';
import { CurrentWeatherComponent } from './components/current-weather.component'
import { FiveDayWeatherComponent } from './components/five-day-weather.component'
import { Http, Response } from '@angular/http';
import { WeatherService } from './services/weather.service';

@Component({
    selector: 'app',
    templateUrl: 'app/html/app.html',
    styleUrls: ['app/styles/app.css'],
    providers: [WeatherService]
})
export class AppComponent implements OnInit{
    zipCode: string;
    displayZipCode: string;
    fiveDayWeather: Weather[] = [];
    currentWeather = new Weather();
    currentLat = 47.61539; // defaults in case location is not enabled on load
    currentLong = -122.1959499; // defaults in case location is not enabled on load
    zipCodeSubmitted = false;
    useZipCode = false;
    errorMsg: string;

    constructor(private weatherService: WeatherService
    ) { }

    ngOnInit(): void {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this)) }; 
    }

    setPosition(position: any) {
        this.currentLat = position.coords.latitude
        this.currentLong = position.coords.longitude;
        this.getZipCodeFromLocation();
        this.getWeather();
    }

    submitZipcode() {
        if (this.zipCode.length == 0){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.setPosition.bind(this))
            };
        }
        if (this.zipCode.length == 5) {
            this.displayZipCode = this.zipCode;
            this.weatherService.getLatLongFromZipCode(this.zipCode)
                .subscribe(data => {

                    //get latitude and longitude from zipcode
                    this.currentLat = data.results[0].geometry.location.lat,
                        this.currentLong = data.results[0].geometry.location.lng,
                        this.zipCodeSubmitted = true;
                },
                err => {
                    console.error(err);
                    this.errorMsg = err
                },
                () => this.getWeather())
            
        }
    }

    getZipCodeFromLocation() {
        this.weatherService.getZipCodeFromLatLong(this.currentLat, this.currentLong)
            .subscribe(data => {

                //get zipcode from the latitude and longitude
                this.zipCode = data.results[0].address_components[0].short_name
            },
            err => {
                console.error(err);
                this.errorMsg = err
            },
            () => this.displayZipCode = this.zipCode)
    }

    getWeather() {
        this.fiveDayWeather = [];
        this.displayZipCode = this.zipCode;
        this.weatherService.getCurrentForecast(this.currentLat, this.currentLong)
            .subscribe(data => {

                //get the current forecast
                this.currentWeather.temperature = data.currently.temperature,
                this.currentWeather.summary = data.currently.summary,
                this.currentWeather.icon = data.currently.icon,
                this.currentWeather.precip = data.currently.precipProbability

                // Get the five day forecast
                var count = 0;
                for (let day of data.daily.data) {
                    if (count < 5) {
                        var forecast = new Weather();
                        forecast.temperatureMax = day['temperatureMax'],
                            forecast.temperatureMin = day['temperatureMin'],
                            forecast.summary = day['summary'],
                            forecast.date = day['time'],
                            forecast.icon = day['icon'],
                            forecast.precip = day['precipProbability']

                        this.fiveDayWeather.push(forecast);
                        count++;
                    }
                }

            },
            err => {
                console.error(err);
                this.errorMsg = err
            });
    }
}

export class Weather {
    temperature: string;
    summary: string;
    icon: string;
    precip: number;
    temperatureMin: number;
    temperatureMax: number;
    date: Date;
    day: number;

}
