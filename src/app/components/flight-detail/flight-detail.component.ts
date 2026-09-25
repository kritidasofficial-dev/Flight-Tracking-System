import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightDetailComponent {
  @Input() flight!: Flight;

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
}