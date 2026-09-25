import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Flight, FlightFilter } from '../models/flight.model';

@Injectable({ providedIn: 'root' })
export class FlightService {
  private flights$ = new BehaviorSubject<Flight[]>([]);
  private selectedFlight$ = new BehaviorSubject<Flight | null>(null);
  private filters$ = new BehaviorSubject<FlightFilter>({});

  constructor() {
    this.loadMockFlights();
  }

  private loadMockFlights(): void {
    const mockFlights: Flight[] = [
      { id: '1', flightNumber: 'AA101', callsign: 'AAL101', aircraftType: 'Boeing 777-300ER', origin: { code: 'JFK', name: 'John F. Kennedy', coordinates: { lat: 40.6413, lng: -73.7781 } }, destination: { code: 'LAX', name: 'Los Angeles', coordinates: { lat: 33.9425, lng: -118.4081 } }, status: 'on-time', estimatedDepartureTime: new Date(Date.now() + 30 * 60000), estimatedArrivalTime: new Date(Date.now() + 6 * 3600000), currentPosition: { lat: 39.5, lng: -95.0 }, heading: 280, altitude: 35000, speed: 450 },
      { id: '2', flightNumber: 'UA202', callsign: 'UAL202', aircraftType: 'Airbus A350', origin: { code: 'ORD', name: 'Chicago O\'Hare', coordinates: { lat: 41.9742, lng: -87.9073 } }, destination: { code: 'LHR', name: 'London Heathrow', coordinates: { lat: 51.4700, lng: -0.4543 } }, status: 'delayed', estimatedDepartureTime: new Date(Date.now() + 45 * 60000), estimatedArrivalTime: new Date(Date.now() + 10 * 3600000), delayMinutes: 25, currentPosition: { lat: 41.9742, lng: -87.9073 }, heading: 90, altitude: 0, speed: 0 },
      { id: '3', flightNumber: 'DL303', callsign: 'DAL303', aircraftType: 'Boeing 767-400ER', origin: { code: 'ATL', name: 'Hartsfield-Jackson Atlanta', coordinates: { lat: 33.6407, lng: -84.4277 } }, destination: { code: 'MIA', name: 'Miami International', coordinates: { lat: 25.7959, lng: -80.2870 } }, status: 'arrived', estimatedDepartureTime: new Date(Date.now() - 2 * 3600000), estimatedArrivalTime: new Date(Date.now() - 30 * 60000), actualDepartureTime: new Date(Date.now() - 2 * 3600000), actualArrivalTime: new Date(Date.now() - 25 * 60000), currentPosition: { lat: 25.7959, lng: -80.2870 }, heading: 180, altitude: 0, speed: 0 },
      { id: '4', flightNumber: 'SW404', callsign: 'SWA404', aircraftType: 'Boeing 737 MAX 8', origin: { code: 'DEN', name: 'Denver International', coordinates: { lat: 39.8561, lng: -104.6737 } }, destination: { code: 'SFO', name: 'San Francisco', coordinates: { lat: 37.6213, lng: -122.3790 } }, status: 'boarding', estimatedDepartureTime: new Date(Date.now() + 15 * 60000), estimatedArrivalTime: new Date(Date.now() + 3 * 3600000), currentPosition: { lat: 39.8561, lng: -104.6737 }, heading: 270, altitude: 0, speed: 0 },
      { id: '5', flightNumber: 'BA505', callsign: 'BAW505', aircraftType: 'Airbus A380', origin: { code: 'LHR', name: 'London Heathrow', coordinates: { lat: 51.4700, lng: -0.4543 } }, destination: { code: 'JFK', name: 'John F. Kennedy', coordinates: { lat: 40.6413, lng: -73.7781 } }, status: 'on-time', estimatedDepartureTime: new Date(Date.now() + 2 * 3600000), estimatedArrivalTime: new Date(Date.now() + 8 * 3600000), currentPosition: { lat: 51.4700, lng: -0.4543 }, heading: 270, altitude: 0, speed: 0 },
      { id: '6', flightNumber: 'AF606', callsign: 'AFR606', aircraftType: 'Airbus A320', origin: { code: 'CDG', name: 'Paris Charles de Gaulle', coordinates: { lat: 49.0097, lng: 2.5479 } }, destination: { code: 'FCO', name: 'Rome Fiumicino', coordinates: { lat: 41.8002, lng: 12.2384 } }, status: 'on-time', estimatedDepartureTime: new Date(Date.now() + 1 * 3600000), estimatedArrivalTime: new Date(Date.now() + 3 * 3600000), currentPosition: { lat: 49.0097, lng: 2.5479 }, heading: 180, altitude: 0, speed: 0 },
      { id: '7', flightNumber: 'LH707', callsign: 'DLH707', aircraftType: 'Airbus A350', origin: { code: 'FRA', name: 'Frankfurt am Main', coordinates: { lat: 50.0379, lng: 8.5622 } }, destination: { code: 'NRT', name: 'Narita', coordinates: { lat: 35.7653, lng: 140.3931 } }, status: 'on-time', estimatedDepartureTime: new Date(Date.now() + 4 * 3600000), estimatedArrivalTime: new Date(Date.now() + 14 * 3600000), currentPosition: { lat: 50.0379, lng: 8.5622 }, heading: 90, altitude: 0, speed: 0 },
      { id: '8', flightNumber: 'SQ808', callsign: 'SIA808', aircraftType: 'Boeing 777-300ER', origin: { code: 'SIN', name: 'Singapore Changi', coordinates: { lat: 1.3521, lng: 103.8198 } }, destination: { code: 'HND', name: 'Tokyo Haneda', coordinates: { lat: 35.5475, lng: 139.7798 } }, status: 'delayed', estimatedDepartureTime: new Date(Date.now() + 90 * 60000), estimatedArrivalTime: new Date(Date.now() + 8 * 3600000), delayMinutes: 45, currentPosition: { lat: 1.3521, lng: 103.8198 }, heading: 0, altitude: 0, speed: 0 },
      { id: '9', flightNumber: 'CX909', callsign: 'CPA909', aircraftType: 'Airbus A350', origin: { code: 'HKG', name: 'Hong Kong', coordinates: { lat: 22.3193, lng: 113.9150 } }, destination: { code: 'SYD', name: 'Sydney', coordinates: { lat: -33.9461, lng: 151.1772 } }, status: 'on-time', estimatedDepartureTime: new Date(Date.now() + 5 * 3600000), estimatedArrivalTime: new Date(Date.now() + 11 * 3600000), currentPosition: { lat: 22.3193, lng: 113.9150 }, heading: 180, altitude: 0, speed: 0 },
      { id: '10', flightNumber: 'EK1010', callsign: 'UAE1010', aircraftType: 'Boeing 777X', origin: { code: 'DXB', name: 'Dubai International', coordinates: { lat: 25.2528, lng: 55.3644 } }, destination: { code: 'BKK', name: 'Bangkok Suvarnabhumi', coordinates: { lat: 13.6900, lng: 100.7501 } }, status: 'scheduled', estimatedDepartureTime: new Date(Date.now() + 6 * 3600000), estimatedArrivalTime: new Date(Date.now() + 10 * 3600000), currentPosition: { lat: 25.2528, lng: 55.3644 }, heading: 270, altitude: 0, speed: 0 },
      { id: '11', flightNumber: 'QF1111', callsign: 'QFA1111', aircraftType: 'Boeing 787-9', origin: { code: 'SYD', name: 'Sydney', coordinates: { lat: -33.9461, lng: 151.1772 } }, destination: { code: 'LAX', name: 'Los Angeles', coordinates: { lat: 33.9425, lng: -118.4081 } }, status: 'on-time', estimatedDepartureTime: new Date(Date.now() + 7 * 3600000), estimatedArrivalTime: new Date(Date.now() + 16 * 3600000), currentPosition: { lat: -33.9461, lng: 151.1772 }, heading: 90, altitude: 0, speed: 0 },
      { id: '12', flightNumber: 'AK1212', callsign: 'AKA1212', aircraftType: 'Boeing 737-900ER', origin: { code: 'ANC', name: 'Ted Stevens Anchorage', coordinates: { lat: 61.2181, lng: -149.9003 } }, destination: { code: 'SEA', name: 'Seattle-Tacoma', coordinates: { lat: 47.4502, lng: -122.3088 } }, status: 'on-time', estimatedDepartureTime: new Date(Date.now() + 8 * 3600000), estimatedArrivalTime: new Date(Date.now() + 11 * 3600000), currentPosition: { lat: 61.2181, lng: -149.9003 }, heading: 180, altitude: 0, speed: 0 },
      { id: '13', flightNumber: 'NZ1313', callsign: 'ANZ1313', aircraftType: 'Boeing 777-300ER', origin: { code: 'AKL', name: 'Auckland', coordinates: { lat: -37.0082, lng: 174.7850 } }, destination: { code: 'LAX', name: 'Los Angeles', coordinates: { lat: 33.9425, lng: -118.4081 } }, status: 'delayed', estimatedDepartureTime: new Date(Date.now() + 9 * 3600000), estimatedArrivalTime: new Date(Date.now() + 19 * 3600000), delayMinutes: 15, currentPosition: { lat: -37.0082, lng: 174.7850 }, heading: 90, altitude: 0, speed: 0 },
      { id: '14', flightNumber: 'AC1414', callsign: 'ACA1414', aircraftType: 'Airbus A220-300', origin: { code: 'YYZ', name: 'Toronto Pearson', coordinates: { lat: 43.6777, lng: -79.6248 } }, destination: { code: 'LHR', name: 'London Heathrow', coordinates: { lat: 51.4700, lng: -0.4543 } }, status: 'on-time', estimatedDepartureTime: new Date(Date.now() + 10 * 3600000), estimatedArrivalTime: new Date(Date.now() + 15 * 3600000), currentPosition: { lat: 43.6777, lng: -79.6248 }, heading: 90, altitude: 0, speed: 0 },
      { id: '15', flightNumber: 'JL1515', callsign: 'JAL1515', aircraftType: 'Boeing 787-10', origin: { code: 'NRT', name: 'Narita', coordinates: { lat: 35.7653, lng: 140.3931 } }, destination: { code: 'SFO', name: 'San Francisco', coordinates: { lat: 37.6213, lng: -122.3790 } }, status: 'on-time', estimatedDepartureTime: new Date(Date.now() + 11 * 3600000), estimatedArrivalTime: new Date(Date.now() + 15 * 3600000), currentPosition: { lat: 35.7653, lng: 140.3931 }, heading: 90, altitude: 0, speed: 0 },
      { id: '16', flightNumber: 'VS1616', callsign: 'VIR1616', aircraftType: 'Airbus A350-1000', origin: { code: 'LHR', name: 'London Heathrow', coordinates: { lat: 51.4700, lng: -0.4543 } }, destination: { code: 'HND', name: 'Tokyo Haneda', coordinates: { lat: 35.5475, lng: 139.7798 } }, status: 'on-time', estimatedDepartureTime: new Date(Date.now() + 12 * 3600000), estimatedArrivalTime: new Date(Date.now() + 22 * 3600000), currentPosition: { lat: 51.4700, lng: -0.4543 }, heading: 90, altitude: 0, speed: 0 },
      { id: '17', flightNumber: 'TG1717', callsign: 'THA1717', aircraftType: 'Boeing 777-300ER', origin: { code: 'BKK', name: 'Bangkok Suvarnabhumi', coordinates: { lat: 13.6900, lng: 100.7501 } }, destination: { code: 'HKG', name: 'Hong Kong', coordinates: { lat: 22.3193, lng: 113.9150 } }, status: 'on-time', estimatedDepartureTime: new Date(Date.now() + 13 * 3600000), estimatedArrivalTime: new Date(Date.now() + 15 * 3600000), currentPosition: { lat: 13.6900, lng: 100.7501 }, heading: 90, altitude: 0, speed: 0 },
      { id: '18', flightNumber: 'MH1818', callsign: 'MAS1818', aircraftType: 'Airbus A350-900', origin: { code: 'KUL', name: 'Kuala Lumpur', coordinates: { lat: 2.7258, lng: 101.7103 } }, destination: { code: 'SYD', name: 'Sydney', coordinates: { lat: -33.9461, lng: 151.1772 } }, status: 'on-time', estimatedDepartureTime: new Date(Date.now() + 14 * 3600000), estimatedArrivalTime: new Date(Date.now() + 20 * 3600000), currentPosition: { lat: 2.7258, lng: 101.7103 }, heading: 180, altitude: 0, speed: 0 },
      { id: '19', flightNumber: 'GA1919', callsign: 'GIA1919', aircraftType: 'Airbus A330-300', origin: { code: 'CGK', name: 'Jakarta Soekarno-Hatta', coordinates: { lat: -6.1256, lng: 106.6595 } }, destination: { code: 'SYD', name: 'Sydney', coordinates: { lat: -33.9461, lng: 151.1772 } }, status: 'on-time', estimatedDepartureTime: new Date(Date.now() + 15 * 3600000), estimatedArrivalTime: new Date(Date.now() + 19 * 3600000), currentPosition: { lat: -6.1256, lng: 106.6595 }, heading: 180, altitude: 0, speed: 0 },
      { id: '20', flightNumber: 'OZ2020', callsign: 'AAR2020', aircraftType: 'Airbus A350-900', origin: { code: 'ICN', name: 'Incheon', coordinates: { lat: 37.4602, lng: 126.4407 } }, destination: { code: 'LAX', name: 'Los Angeles', coordinates: { lat: 33.9425, lng: -118.4081 } }, status: 'on-time', estimatedDepartureTime: new Date(Date.now() + 16 * 3600000), estimatedArrivalTime: new Date(Date.now() + 17 * 3600000), currentPosition: { lat: 37.4602, lng: 126.4407 }, heading: 90, altitude: 0, speed: 0 }
    ];
    this.flights$.next(mockFlights);
  }

  getFlights(): Observable<Flight[]> {
    return this.flights$.asObservable();
  }

  getFilteredFlights(): Observable<Flight[]> {
    return this.filters$.pipe(
      map(filters => {
        const result = this.applyFilters(this.flights$.value, filters);
        return result;
      })
    );
  }

  getSelectedFlight(): Observable<Flight | null> {
    return this.selectedFlight$.asObservable();
  }

  selectFlight(flight: Flight | null): void {
    this.selectedFlight$.next(flight);
  }

  updateFilters(filters: FlightFilter): void {
    this.filters$.next(filters);
  }

  searchByCallsign(callsign: string): Flight | null {
  const searchTerm = callsign.trim().toUpperCase();
  
  const flight = this.flights$.value.find(f => 
    f.callsign.toUpperCase() === searchTerm || 
    f.flightNumber.toUpperCase() === searchTerm
  );
  
  return flight || null;
}

  private applyFilters(flights: Flight[], filters: FlightFilter): Flight[] {
  let filtered = [...flights];

  // Filter by callsign (case-insensitive, partial match)
  if (filters.callsign) {
    const searchTerm = filters.callsign.trim().toUpperCase();
    filtered = filtered.filter(f => f.callsign.toUpperCase().includes(searchTerm));
  }

  // Filter by status (exact match)
  if (filters.status) {
    filtered = filtered.filter(f => f.status === filters.status);
  }

  // Filter by origin (exact match)
  if (filters.originCode) {
    const origin = filters.originCode.trim().toUpperCase();
    filtered = filtered.filter(f => f.origin.code === origin);
  }

  // Filter by destination (exact match)
  if (filters.destinationCode) {
    const destination = filters.destinationCode.trim().toUpperCase();
    filtered = filtered.filter(f => f.destination.code === destination);
  }

  return filtered;
}

  getKPIMetrics(): Observable<any> {
    return this.flights$.pipe(
      map(flights => ({
        totalFlights: flights.length,
        activeFlights: flights.filter(f => ['on-time', 'boarding', 'delayed'].includes(f.status)).length,
        delayedFlights: flights.filter(f => f.status === 'delayed').length,
        arrivedFlights: flights.filter(f => f.status === 'arrived').length
      }))
    );
  }
}