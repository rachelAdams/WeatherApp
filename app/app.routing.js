"use strict";
var router_1 = require('@angular/router');
var current_weather_component_1 = require('./components/current-weather.component');
var five_day_weather_component_1 = require('./components/five-day-weather.component');
var appRoutes = [
    { path: 'five-day', component: five_day_weather_component_1.FiveDayWeatherComponent },
    { path: '', component: current_weather_component_1.CurrentWeatherComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map