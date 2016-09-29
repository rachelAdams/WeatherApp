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
        this.fiveDayWeather = [];
        this.currentWeather = new Weather();
        this.currentLat = 47.61539; // defaults in case location is not enabled on load
        this.currentLong = -122.1959499; // defaults in case location is not enabled on load
        this.zipCodeSubmitted = false;
        this.useZipCode = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        }
        ;
    };
    AppComponent.prototype.setPosition = function (position) {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
        this.getZipCodeFromLocation();
        this.getWeather();
    };
    AppComponent.prototype.submitZipcode = function () {
        var _this = this;
        if (this.zipCode.length == 0) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
            }
            ;
        }
        if (this.zipCode.length == 5) {
            this.displayZipCode = this.zipCode;
            this.weatherService.getLatLongFromZipCode(this.zipCode)
                .subscribe(function (data) {
                //get latitude and longitude from zipcode
                _this.currentLat = data.results[0].geometry.location.lat,
                    _this.currentLong = data.results[0].geometry.location.lng,
                    _this.zipCodeSubmitted = true;
            }, function (err) {
                console.error(err);
                _this.errorMsg = err;
            }, function () { return _this.getWeather(); });
        }
    };
    AppComponent.prototype.getZipCodeFromLocation = function () {
        var _this = this;
        this.weatherService.getZipCodeFromLatLong(this.currentLat, this.currentLong)
            .subscribe(function (data) {
            //get zipcode from the latitude and longitude
            _this.zipCode = data.results[0].address_components[0].short_name;
        }, function (err) {
            console.error(err);
            _this.errorMsg = err;
        }, function () { return _this.displayZipCode = _this.zipCode; });
    };
    AppComponent.prototype.getWeather = function () {
        var _this = this;
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