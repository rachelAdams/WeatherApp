import { Component, OnInit } from '@angular/core';
import { CurrentWeatherComponent } from './components/current-weather.component'
import { Http, Response } from '@angular/http';
// import './rxjs-operators';

@Component({
    selector: 'app',
    templateUrl: 'app/html/app.html',
    styleUrls: ['app/styles/app.css']
})
export class AppComponent {
    zipCode: string;
 }
