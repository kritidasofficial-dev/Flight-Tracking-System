import { TestBed } from '@angular/core/testing';
import { FlightService } from './flight.service';

describe('FlightService', () => {
  let service: FlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have 20 flights', (done) => {
    service.getFlights().subscribe(flights => {
      expect(flights.length).toBe(20);
      done();
    });
  });

  it('should search flight by callsign', () => {
    const flight = service.searchByCallsign('AAL101');
    expect(flight).toBeTruthy();
    expect(flight?.callsign).toBe('AAL101');
  });

  it('should return null for non-existent callsign', () => {
    const flight = service.searchByCallsign('INVALID');
    expect(flight).toBeNull();
  });

  it('should select flight', (done) => {
    const testFlight = service['flights$'].value[0];
    service.selectFlight(testFlight);
    service.getSelectedFlight().subscribe(flight => {
      expect(flight).toBe(testFlight);
      done();
    });
  });

  it('should calculate KPI metrics correctly', (done) => {
    service.getKPIMetrics().subscribe(metrics => {
      expect(metrics.totalFlights).toBe(20);
      expect(metrics.activeFlights).toBeGreaterThan(0);
      done();
    });
  });

  it('should apply filters correctly', (done) => {
    service.updateFilters({ status: 'delayed' });
    service.getFilteredFlights().subscribe(flights => {
      flights.forEach(flight => {
        expect(flight.status).toBe('delayed');
      });
      done();
    });
  });
});