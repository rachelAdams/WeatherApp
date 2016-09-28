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
var weather_service_1 = require('../services/weather.service');
var CurrentWeatherComponent = (function () {
    function CurrentWeatherComponent(weatherService) {
        this.weatherService = weatherService;
        this.currentWeather = new Weather();
        this.currentLat = 0;
        this.currentLong = 0;
    }
    CurrentWeatherComponent.prototype.ngOnInit = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        }
        ;
    };
    CurrentWeatherComponent.prototype.setPosition = function (position) {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
        this.getWeather();
    };
    CurrentWeatherComponent.prototype.getWeather = function () {
        var _this = this;
        this.weatherService.getCurrentForecast(this.currentLat, this.currentLong)
            .subscribe(function (data) {
            _this.currentWeather.temperature = data.currently.temperature,
                _this.currentWeather.summary = data.currently.summary,
                _this.currentWeather.icon = data.currently.icon,
                _this.currentWeather.precip = data.currently.precipProbability;
        }, function (err) { return console.error(err); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CurrentWeatherComponent.prototype, "zipCode", void 0);
    CurrentWeatherComponent = __decorate([
        core_1.Component({
            selector: 'current-weather',
            templateUrl: 'app/html/current-weather.html',
            styleUrls: ['app/styles/current-weather.css'],
            providers: [weather_service_1.WeatherService]
        }), 
        __metadata('design:paramtypes', [weather_service_1.WeatherService])
    ], CurrentWeatherComponent);
    return CurrentWeatherComponent;
}());
exports.CurrentWeatherComponent = CurrentWeatherComponent;
var Weather = (function () {
    function Weather() {
    }
    return Weather;
}());
exports.Weather = Weather;
//# sourceMappingURL=current-weather.component.js.map