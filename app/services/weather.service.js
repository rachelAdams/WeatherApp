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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('../rxjs-operators');
var WeatherService = (function () {
    //weatherUrl = 'https://api.darksky.net/forecast/cf9cd81459a4017710b133ffa3d1bcf8/42.3601,-71.0589?callback=JSONP_CALLBACK';
    function WeatherService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
    }
    WeatherService.prototype.getCurrentForecast = function (currentLat, currentLong) {
        var weatherUrl = "https://api.darksky.net/forecast/cf9cd81459a4017710b133ffa3d1bcf8/" + currentLat + "," + currentLong + "?callback=JSONP_CALLBACK";
        return this.jsonp
            .get(weatherUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json() || 'Server error'); });
        ;
    };
    WeatherService.prototype.getLatLongFromZipCode = function (zipCode) {
        //https://maps.googleapis.com/maps/api/geocode/json?address={zipcode}
        var zipCodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=AIzaSyCE3MMVrk7VNqEZ-KKxeP-RSOxpwDvrQFs"; //?callback=CALLBACK";
        return this.http
            .get(zipCodeUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json() || 'Server error'); });
        ;
    };
    WeatherService.prototype.getZipCodeFromLatLong = function (currentLat, currentLong) {
        var latLongUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + currentLat + "," + currentLong + "&result_type=postal_code&key=AIzaSyCE3MMVrk7VNqEZ-KKxeP-RSOxpwDvrQFs";
        return this.http
            .get(latLongUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json() || 'Server error'); });
        ;
    };
    WeatherService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_1.Jsonp])
    ], WeatherService);
    return WeatherService;
}());
exports.WeatherService = WeatherService;
//# sourceMappingURL=weather.service.js.map