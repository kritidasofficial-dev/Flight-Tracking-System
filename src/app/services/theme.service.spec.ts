import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle theme', (done) => {
    service.toggleTheme();
    service.getTheme().subscribe(theme => {
      expect(theme).toBe('light');
      done();
    });
  });

  it('should persist theme to localStorage', () => {
    service.toggleTheme();
    const savedTheme = localStorage.getItem('theme');
    expect(savedTheme).toBe('light');
  });

  it('should return current theme synchronously', () => {
    const theme = service.getCurrentTheme();
    expect(['dark', 'light']).toContain(theme);
  });
});