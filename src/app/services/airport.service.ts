import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Airport } from '../models/airport.model';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  private airports$ = new BehaviorSubject<Airport[]>([]);
  private uniqueCodes$ = new BehaviorSubject<string[]>([]);

  constructor() {
    this.loadAirports();
  }

  private loadAirports(): void {
    const airports: Airport[] = [
      { code: 'JFK', name: 'John F. Kennedy', city: 'New York', country: 'USA', coordinates: { lat: 40.6413, lng: -73.7781 } },
      { code: 'LAX', name: 'Los Angeles', city: 'Los Angeles', country: 'USA', coordinates: { lat: 33.9425, lng: -118.4081 } },
      { code: 'ORD', name: 'Chicago O\'Hare', city: 'Chicago', country: 'USA', coordinates: { lat: 41.9742, lng: -87.9073 } },
      { code: 'LHR', name: 'London Heathrow', city: 'London', country: 'UK', coordinates: { lat: 51.4700, lng: -0.4543 } },
      { code: 'ATL', name: 'Hartsfield-Jackson Atlanta', city: 'Atlanta', country: 'USA', coordinates: { lat: 33.6407, lng: -84.4277 } },
      { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'USA', coordinates: { lat: 25.7959, lng: -80.2870 } },
      { code: 'DEN', name: 'Denver International', city: 'Denver', country: 'USA', coordinates: { lat: 39.8561, lng: -104.6737 } },
      { code: 'SFO', name: 'San Francisco', city: 'San Francisco', country: 'USA', coordinates: { lat: 37.6213, lng: -122.3790 } },
      { code: 'CDG', name: 'Paris Charles de Gaulle', city: 'Paris', country: 'France', coordinates: { lat: 49.0097, lng: 2.5479 } },
      { code: 'FCO', name: 'Rome Fiumicino', city: 'Rome', country: 'Italy', coordinates: { lat: 41.8002, lng: 12.2384 } },
      { code: 'FRA', name: 'Frankfurt am Main', city: 'Frankfurt', country: 'Germany', coordinates: { lat: 50.0379, lng: 8.5622 } },
      { code: 'NRT', name: 'Narita', city: 'Tokyo', country: 'Japan', coordinates: { lat: 35.7653, lng: 140.3931 } },
      { code: 'SIN', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore', coordinates: { lat: 1.3521, lng: 103.8198 } },
      { code: 'HND', name: 'Tokyo Haneda', city: 'Tokyo', country: 'Japan', coordinates: { lat: 35.5475, lng: 139.7798 } },
      { code: 'HKG', name: 'Hong Kong', city: 'Hong Kong', country: 'Hong Kong', coordinates: { lat: 22.3193, lng: 113.9150 } },
      { code: 'SYD', name: 'Sydney', city: 'Sydney', country: 'Australia', coordinates: { lat: -33.9461, lng: 151.1772 } },
      { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE', coordinates: { lat: 25.2528, lng: 55.3644 } },
      { code: 'BKK', name: 'Bangkok Suvarnabhumi', city: 'Bangkok', country: 'Thailand', coordinates: { lat: 13.6900, lng: 100.7501 } }
    ];

    this.airports$.next(airports);

    // Extract unique codes
    const codes = airports.map(a => a.code).sort();
    this.uniqueCodes$.next(codes);
  }

  getAirports(): Observable<Airport[]> {
    return this.airports$.asObservable();
  }

  getUniqueCodes(): Observable<string[]> {
    return this.uniqueCodes$.asObservable();
  }
}