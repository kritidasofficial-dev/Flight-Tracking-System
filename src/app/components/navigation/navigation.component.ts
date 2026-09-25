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
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        console.log('🔍 Search value changed:', value);
        
        if (value && value.trim().length > 0) {
          const flight = this.flightService.searchByCallsign(value.trim());
          console.log('✅ Flight found:', flight?.callsign);
          
          if (flight) {
            this.flightService.selectFlight(flight);
            console.log('✅ Flight selected:', flight.callsign);
          } else {
            console.warn('⚠️ Flight not found:', value);
          }
        }
      });
  }

  toggleTheme(): void {
    console.log('🌓 Theme toggle clicked');
    this.themeService.toggleTheme();
  }

  clearSearch(): void {
    console.log('🗑️ Clearing search');
    this.searchControl.reset();
  }

  onSearchEnter(event: any): void {
    const value = event.target.value;
    console.log('🔍 Manual search triggered:', value);
    
    if (value && value.trim().length > 0) {
      const flight = this.flightService.searchByCallsign(value.trim());
      if (flight) {
        this.flightService.selectFlight(flight);
        console.log('✅ Flight selected:', flight.callsign);
      } else {
        console.warn('⚠️ Flight not found:', value);
      }
    }
  }
}