import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { AirportService } from '../../services/airport.service';
import { Observable } from 'rxjs';
import { Airport } from '../../models/airport.model';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPanelComponent implements OnInit {
  filterForm!: FormGroup;
  airports$: Observable<Airport[]>;
  uniqueAirportCodes$: Observable<string[]>;

  statusOptions = [
    { value: null, label: 'All Statuses' },
    { value: 'on-time', label: 'On-Time' },
    { value: 'delayed', label: 'Delayed' },
    { value: 'boarding', label: 'Boarding' },
    { value: 'arrived', label: 'Arrived' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private airportService: AirportService
  ) {
    this.airports$ = this.airportService.getAirports();
    this.uniqueAirportCodes$ = this.airportService.getUniqueCodes();
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      callsign: [''],
      status: [null],
      originCode: [null],
      destinationCode: [null]
    });

    this.filterForm.valueChanges.subscribe(filters => {
      this.flightService.updateFilters(filters);
    });
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.flightService.updateFilters({});
  }
}