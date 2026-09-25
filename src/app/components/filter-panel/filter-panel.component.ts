import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { AirportService } from '../../services/airport.service';
import { Observable } from 'rxjs';
import { Airport } from '../../models/airport.model';
import { debounceTime } from 'rxjs/operators';

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
    { value: '', label: 'All Statuses' },
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
      status: [''],
      originCode: [''],
      destinationCode: ['']
    });

    // Listen to form changes with debounce
    this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.applyFilters();
      });
  }

  private applyFilters(): void {
    const formValues = this.filterForm.value;
    
    const filters: any = {};
    
    // Only add non-empty filters
    if (formValues.status && formValues.status.trim()) {
      filters.status = formValues.status;
    }
    
    if (formValues.originCode && formValues.originCode.trim()) {
      filters.originCode = formValues.originCode;
    }
    
    if (formValues.destinationCode && formValues.destinationCode.trim()) {
      filters.destinationCode = formValues.destinationCode;
    }

    this.flightService.updateFilters(filters);
  }

  resetFilters(): void {
    this.filterForm.reset({
      status: '',
      originCode: '',
      destinationCode: ''
    });
    this.flightService.updateFilters({});
  }
}