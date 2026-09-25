import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../../models/flight.model';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightListComponent implements OnInit {
  filteredFlights$!: Observable<Flight[]>;

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    // Subscribe to filtered flights
    this.filteredFlights$ = this.flightService.getFilteredFlights();
  }

  selectFlight(flight: Flight): void {
    this.flightService.selectFlight(flight);
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'on-time': 'success',
      'delayed': 'warning',
      'boarding': 'info',
      'arrived': 'success',
      'cancelled': 'danger',
      'scheduled': 'info'
    };
    return colors[status] || 'info';
  }

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'on-time': '✓',
      'delayed': '⏱️',
      'boarding': '🚪',
      'arrived': '✓',
      'cancelled': '✕',
      'scheduled': '📅'
    };
    return icons[status] || '?';
  }
}