import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get weather data', (done) => {
    service.getWeather(40.7128, -74.0060).subscribe(weather => {
      expect(weather.temperature).toBeDefined();
      expect(weather.condition).toBeDefined();
      done();
    });
  });

  it('should return weather icon', () => {
    const icon = service.getWeatherIcon('Sunny');
    expect(icon).toBe('☀️');
  });
});