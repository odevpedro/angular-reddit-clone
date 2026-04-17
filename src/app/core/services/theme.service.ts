import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private dark$ = new BehaviorSubject<boolean>(this.loadPreference());

  isDark$ = this.dark$.asObservable();

  get isDark(): boolean {
    return this.dark$.getValue();
  }

  init(): void {
    document.documentElement.setAttribute('data-bs-theme', this.isDark ? 'dark' : 'light');
  }

  toggle(): void {
    const next = !this.isDark;
    this.dark$.next(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.setAttribute('data-bs-theme', next ? 'dark' : 'light');
  }

  private loadPreference(): boolean {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
