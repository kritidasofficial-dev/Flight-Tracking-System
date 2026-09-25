import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../../models/flight.model';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  flights$: Observable<Flight[]>;
  filteredFlights$: Observable<Flight[]>;
  selectedFlight$: Observable<Flight | null>;
  sidebarOpen = true;

  constructor(private flightService: FlightService) {
    this.flights$ = this.flightService.getFlights();
    this.filteredFlights$ = this.flightService.getFilteredFlights();
    this.selectedFlight$ = this.flightService.getSelectedFlight();
  }

  ngOnInit(): void { }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}