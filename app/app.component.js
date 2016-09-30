"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var weather_service_1 = require('./services/weather.service');
var AppComponent = (function () {
    function AppComponent(weatherService) {
        this.weatherService = weatherService;
        this.zipCode = "98103"; //defaults for page load in case location is disabled 
        this.displayZipCode = "98103";
        this.fiveDayWeather = [];
        this.currentWeather = new Weather();
    }
    AppComponent.prototype.ngOnInit = function () {
        // check if location is enabled on start: if so, get weather for it -- if not, use defaults
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getWeatherForEnabledLocation.bind(this), this.getWeather.bind(this));
        }
    };
    AppComponent.prototype.getZipCodeFromLocation = function () {
        var _this = this;
        // get a zip code from the current latitude and longitude
        this.weatherService.getZipCodeFromLatLong(this.currentLat, this.currentLong)
            .subscribe(function (data) {
            _this.zipCode = data.results[0].address_components[0].short_name;
        }, function (err) {
            console.error(err);
            _this.errorMsg = err;
        }, function () { return _this.displayZipCode = _this.zipCode; });
    };
    AppComponent.prototype.getWeatherForEnabledLocation = function (position) {
        // get user's location when location is enabled
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
        this.getZipCodeFromLocation();
        // get weather for that location
        this.getWeather();
    };
    AppComponent.prototype.getWeatherForInputZipcode = function () {
        // get latitude and longitude for the input zip code
        var _this = this;
        // if zip code field is empty, use user's location if available
        if (this.zipCode.length == 0) {
            if (navigator.geolocation) {
                //if location is not enabled, don't do anything
                navigator.geolocation.getCurrentPosition(this.getWeatherForEnabledLocation.bind(this), null);
            }
            ;
        }
        //if they've entered a valid zip code, get the latitude and longitude for it
        if (this.zipCode.length == 5) {
            this.displayZipCode = this.zipCode;
            this.weatherService.getLatLongFromZipCode(this.zipCode)
                .subscribe(function (data) {
                //get latitude and longitude from zipcode
                _this.currentLat = data.results[0].geometry.location.lat,
                    _this.currentLong = data.results[0].geometry.location.lng;
            }, function (err) {
                console.error(err);
                _this.errorMsg = err;
            }, 
            // get the weather for that latitude and longitude
            function () { return _this.getWeather(); });
        }
    };
    AppComponent.prototype.getWeather = function () {
        // get forecasts for latitude and longitude
        var _this = this;
        // if there's no latitude or longitude defined, get weather by zip code
        if (this.currentLat == undefined || this.currentLong == undefined) {
            this.getWeatherForInputZipcode();
            return;
        }
        // get five day and current weather
        this.fiveDayWeather = [];
        this.displayZipCode = this.zipCode;
        this.weatherService.getCurrentForecast(this.currentLat, this.currentLong)
            .subscribe(function (data) {
            //get the current forecast
            _this.currentWeather.temperature = data.currently.temperature,
                _this.currentWeather.summary = data.currently.summary,
                _this.currentWeather.icon = data.currently.icon,
                _this.currentWeather.precip = data.currently.precipProbability;
            // Get the five day forecast
            var count = 0;
            for (var _i = 0, _a = data.daily.data; _i < _a.length; _i++) {
                var day = _a[_i];
                if (count < 5) {
                    var forecast = new Weather();
                    forecast.temperatureMax = day['temperatureMax'],
                        forecast.temperatureMin = day['temperatureMin'],
                        forecast.summary = day['summary'],
                        forecast.date = day['time'],
                        forecast.icon = day['icon'],
                        forecast.precip = day['precipProbability'];
                    _this.fiveDayWeather.push(forecast);
                    count++;
                }
            }
        }, function (err) {
            console.error(err);
            _this.errorMsg = err;
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: 'app/html/app.html',
            styleUrls: ['app/styles/app.css'],
            providers: [weather_service_1.WeatherService]
        }), 
        __metadata('design:paramtypes', [weather_service_1.WeatherService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
var Weather = (function () {
    function Weather() {
    }
    return Weather;
}());
exports.Weather = Weather;
//# sourceMappingURL=app.component.js.map