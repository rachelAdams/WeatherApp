import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurrentWeatherComponent} from './components/current-weather.component';
import {FiveDayWeatherComponent} from './components/five-day-weather.component';

const appRoutes: Routes = [
  { path: 'five-day', component: FiveDayWeatherComponent },
  { path: '', component: CurrentWeatherComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);