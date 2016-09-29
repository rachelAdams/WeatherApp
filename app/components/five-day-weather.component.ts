import { Component, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { Weather } from '../app.component';

@Component({
    selector: 'five-day-weather',
    templateUrl: 'app/html/five-day-weather.html',
    styleUrls:['app/styles/five-day-weather.css']
})
export class FiveDayWeatherComponent { 
    @Input() fiveDayWeather: Weather[];
    @Input() displayZipCode: string;
}

