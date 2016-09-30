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


export class AppComponent implements OnInit {

    zipCode = "98103"; //defaults for page load in case location is disabled 
    displayZipCode = "98103";

    fiveDayWeather: Weather[] = [];
    currentWeather = new Weather();
    currentLat: number;
    currentLong: number;
    errorMsg: string;

    constructor(private weatherService: WeatherService
    ) { }

    ngOnInit(): void {
        // check if location is enabled on start: if so, get weather for it -- if not, use defaults
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getWeatherForEnabledLocation.bind(this), this.getWeather.bind(this))
        }
    }

    getZipCodeFromLocation() {
        // get a zip code from the current latitude and longitude
        this.weatherService.getZipCodeFromLatLong(this.currentLat, this.currentLong)
            .subscribe(data => {
                this.zipCode = data.results[0].address_components[0].short_name
            },
            err => {
                console.error(err);
                this.errorMsg = err
            },
            () => this.displayZipCode = this.zipCode)
    }

    getWeatherForEnabledLocation(position: any) {
        // get user's location when location is enabled
        this.currentLat = position.coords.latitude
        this.currentLong = position.coords.longitude;
        this.getZipCodeFromLocation();

        // get weather for that location
        this.getWeather();
    }

    getWeatherForInputZipcode() {
        // get latitude and longitude for the input zip code

        // if zip code field is empty, use user's location if available
        if (this.zipCode.length == 0) {
            if (navigator.geolocation) {
                //if location is not enabled, don't do anything
                navigator.geolocation.getCurrentPosition(this.getWeatherForEnabledLocation.bind(this), null)
            };
        }

        //if they've entered a valid zip code, get the latitude and longitude for it
        if (this.zipCode.length == 5) {
            this.displayZipCode = this.zipCode;
            this.weatherService.getLatLongFromZipCode(this.zipCode)
                .subscribe(data => {

                    //get latitude and longitude from zipcode
                    this.currentLat = data.results[0].geometry.location.lat,
                        this.currentLong = data.results[0].geometry.location.lng
                },
                err => {
                    console.error(err);
                    this.errorMsg = err
                },

                // get the weather for that latitude and longitude
                () => this.getWeather())

        }
    }

    getWeather() {
        // get forecasts for latitude and longitude

        // if there's no latitude or longitude defined, get weather by zip code
        if (this.currentLat == undefined || this.currentLong == undefined) {
            this.getWeatherForInputZipcode();
            return;
        }

        // get five day and current weather
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
