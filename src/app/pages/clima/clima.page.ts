import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../../services/weather.service';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
})
export class ClimaPage implements OnInit {

  location = { cityName: 'Santiago', countryCode: 'cl' };
  weather = undefined;


  constructor(private weatherService: WeatherService) { }
  pageTitle = 'Clima';
  isNotHome = true;

  ngOnInit() {
    this.getWeather(this.location.cityName, this.location.countryCode);
  }
  getWeather(cityName: string, countryCode: string) {
    this.weatherService
      .getWeather(cityName, countryCode)
      .subscribe(
        res => {
          console.log(res);
          this.weather = res;
        },
        err => {
          console.log(err);
        }
      );
  }
  submitLocation(cityName: HTMLInputElement, countryCode: HTMLInputElement) {
    if (cityName.value && countryCode.value) {
      this.getWeather(cityName.value, countryCode.value);

      cityName.value = '';
      countryCode.value = '';
    } else {
      alert('Por favor no deje los campos vacios');
    }
    cityName.focus();
    return false;
  }

}
