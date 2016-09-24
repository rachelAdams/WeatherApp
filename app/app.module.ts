import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { CurrentWeatherComponent }  from './components/current-weather.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
//import './rxjs-operators';
import {Observable} from 'rxjs';


@NgModule({
  imports: [  BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
    ],
  declarations: [ AppComponent, CurrentWeatherComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
