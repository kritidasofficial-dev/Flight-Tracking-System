import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private theme$ = new BehaviorSubject<Theme>('dark');

  constructor() {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      this.theme$.next(savedTheme);
      this.applyTheme(savedTheme);
    } else {
      // Set default dark theme
      this.applyTheme('dark');
    }
  }

  getTheme(): Observable<Theme> {
    return this.theme$.asObservable();
  }

  getCurrentTheme(): Theme {
    return this.theme$.value;
  }

  toggleTheme(): void {
    const newTheme = this.theme$.value === 'dark' ? 'light' : 'dark';
    this.theme$.next(newTheme);
    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      root.style.setProperty('--bg-primary', '#0f1419');
      root.style.setProperty('--bg-secondary', '#1b263b');
      root.style.setProperty('--bg-tertiary', '#2d3e50');
      root.style.setProperty('--text-primary', '#ecf0f1');
      root.style.setProperty('--text-secondary', '#bdc3c7');
      root.style.setProperty('--border-color', '#34495e');
      document.body.style.backgroundColor = '#0f1419';
      document.body.style.color = '#ecf0f1';
    } else {
      root.setAttribute('data-theme', 'light');
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f5f5f5');
      root.style.setProperty('--bg-tertiary', '#e8e8e8');
      root.style.setProperty('--text-primary', '#1a1a1a');
      root.style.setProperty('--text-secondary', '#666666');
      root.style.setProperty('--border-color', '#cccccc');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#1a1a1a';
    }
  }
}