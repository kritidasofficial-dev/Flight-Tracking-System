import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-kpi-grid',
  templateUrl: './kpi-grid.component.html',
  styleUrls: ['./kpi-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KPIGridComponent implements OnInit {
  metrics$: Observable<any>;

  constructor(private flightService: FlightService) {
    this.metrics$ = this.flightService.getKPIMetrics();
  }

  ngOnInit(): void { }

  onKPIClick(status: string): void {
    if (status === 'total') {
      this.flightService.updateFilters({});
    } else {
      this.flightService.updateFilters({ status: status as any });
    }
  }
}