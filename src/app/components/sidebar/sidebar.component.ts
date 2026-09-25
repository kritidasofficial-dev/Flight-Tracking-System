import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  @Input() isOpen = true;
  @Input() selectedFlight: Flight | null = null;
  @Output() toggle = new EventEmitter<void>();

  onToggle(): void {
    this.toggle.emit();
  }
}