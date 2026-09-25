import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KPICardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() status: 'success' | 'warning' | 'danger' | 'info' = 'info';
  @Input() icon: string = '';
  @Output() clickEvent = new EventEmitter<void>();

  onClick(): void {
    this.clickEvent.emit();
  }
}