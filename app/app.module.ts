import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { CurrentWeatherComponent }  from './components/current-weather.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {Observable} from 'rxjs';
import {FiveDayWeatherComponent} from './components/five-day-weather.component';


@NgModule({
  imports: [  BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
    ],
  declarations: [ AppComponent, CurrentWeatherComponent, FiveDayWeatherComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
