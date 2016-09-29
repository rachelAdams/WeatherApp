import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { Weather } from '../app.component';

@Component({
    selector: 'current-weather',
    templateUrl: 'app/html/current-weather.html',
    styleUrls:['app/styles/current-weather.css']
})
export class CurrentWeatherComponent{
    @Input() currentWeather: Weather;
    @Input() displayZipCode: string;
}

