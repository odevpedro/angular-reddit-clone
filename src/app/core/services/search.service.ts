import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private query$ = new BehaviorSubject<string>('');

  search$ = this.query$.asObservable();

  setQuery(q: string): void {
    this.query$.next(q.trim().toLowerCase());
  }

  clear(): void {
    this.query$.next('');
  }
}
