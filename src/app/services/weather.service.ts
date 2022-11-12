import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey: string = '186b7ab4d6e72bb49d1806d99b77c522';
  URI: string = '';

  constructor(private http: HttpClient) {
    this.URI = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric&q=`;
  }

  getWeather(cityName: string, countryCode: string) {
    return this.http.get(`${this.URI}${cityName},${countryCode}`);
  }
}



// 186b7ab4d6e72bb49d1806d99b77c522
// https://api.openweathermap.org/data/2.5/weather?q=lima,pe&appid=186b7ab4d6e72bb49d1806d99b77c522