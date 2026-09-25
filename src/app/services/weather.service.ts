import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  constructor() { }

  getWeather(lat: number, lng: number): Observable<WeatherData> {
    // Mock weather data - replace with real API
    const mockWeather: WeatherData = {
      temperature: 20 + Math.random() * 15,
      condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
      humidity: 40 + Math.random() * 50,
      windSpeed: 5 + Math.random() * 20
    };
    return of(mockWeather);
  }

  getWeatherIcon(condition: string): string {
    const icons: { [key: string]: string } = {
      'Sunny': '☀️',
      'Cloudy': '☁️',
      'Rainy': '🌧️',
      'Stormy': '⛈️',
      'Snowy': '❄️'
    };
    return icons[condition] || '🌤️';
  }
}