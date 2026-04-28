import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { firstValueFrom } from 'rxjs';

describe('ThemeService', () => {
  let service: ThemeService;

  function setupMatchMedia(prefersDark: boolean): void {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jasmine.createSpy('matchMedia').and.returnValue({
        matches: prefersDark,
        addEventListener: () => {},
        removeEventListener: () => {},
      }),
    });
  }

  beforeEach(() => {
    localStorage.clear();
    setupMatchMedia(false);
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => localStorage.clear());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isDark should default to false when matchMedia returns light preference', () => {
    expect(service.isDark).toBeFalse();
  });

  it('isDark should default to true when matchMedia returns dark preference', () => {
    localStorage.clear();
    setupMatchMedia(true);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const darkService = TestBed.inject(ThemeService);
    expect(darkService.isDark).toBeTrue();
  });

  it('isDark should respect localStorage preference over matchMedia', () => {
    localStorage.setItem('theme', 'dark');
    setupMatchMedia(false);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const storedService = TestBed.inject(ThemeService);
    expect(storedService.isDark).toBeTrue();
  });

  it('toggle should switch from light to dark', () => {
    service.toggle();
    expect(service.isDark).toBeTrue();
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('toggle should switch from dark back to light', () => {
    service.toggle();
    service.toggle();
    expect(service.isDark).toBeFalse();
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('toggle should update data-bs-theme attribute on documentElement', () => {
    service.toggle();
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');
    service.toggle();
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light');
  });

  it('init should set data-bs-theme to light when isDark is false', () => {
    service.init();
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light');
  });

  it('isDark$ should emit current theme value', async () => {
    const val = await firstValueFrom(service.isDark$);
    expect(val).toBeFalse();
  });

  it('isDark$ should emit updated value after toggle', async () => {
    service.toggle();
    const val = await firstValueFrom(service.isDark$);
    expect(val).toBeTrue();
  });
});
