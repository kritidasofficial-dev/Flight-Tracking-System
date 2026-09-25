import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { ThemeService } from '../../services/theme.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  searchControl = new FormControl('');
  theme$: Observable<string>;

  constructor(
    private flightService: FlightService,
    private themeService: ThemeService
  ) {
    this.theme$ = this.themeService.getTheme();
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(value => {
        if (value && value.length > 0) {
          const flight = this.flightService.searchByCallsign(value);
          if (flight) {
            this.flightService.selectFlight(flight);
          }
        }
      });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  clearSearch(): void {
    this.searchControl.reset();
  }
}