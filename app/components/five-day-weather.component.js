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
var current_weather_component_1 = require('../components/current-weather.component');
var FiveDayWeatherComponent = (function () {
    function FiveDayWeatherComponent(weatherService) {
        this.weatherService = weatherService;
        this.fiveDayWeather = [];
        this.currentLat = 0;
        this.currentLong = 0;
    }
    FiveDayWeatherComponent.prototype.ngOnInit = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        }
        ;
    };
    FiveDayWeatherComponent.prototype.setPosition = function (position) {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
        this.getWeather();
    };
    FiveDayWeatherComponent.prototype.getWeather = function () {
        var _this = this;
        this.weatherService.getCurrentForecast(this.currentLat, this.currentLong)
            .subscribe(function (data) {
            var count = 0;
            for (var _i = 0, _a = data.daily.data; _i < _a.length; _i++) {
                var day = _a[_i];
                if (count < 5) {
                    var forecast = new current_weather_component_1.Weather();
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
        }, function (err) { return console.error(err); });
    };
    FiveDayWeatherComponent = __decorate([
        core_1.Component({
            selector: 'five-day-weather',
            templateUrl: 'app/html/five-day-weather.html',
            styleUrls: ['app/styles/five-day-weather.css'],
            providers: [weather_service_1.WeatherService]
        }), 
        __metadata('design:paramtypes', [weather_service_1.WeatherService])
    ], FiveDayWeatherComponent);
    return FiveDayWeatherComponent;
}());
exports.FiveDayWeatherComponent = FiveDayWeatherComponent;
//# sourceMappingURL=five-day-weather.component.js.map