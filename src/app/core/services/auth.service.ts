import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser$ = new BehaviorSubject<User | null>(null);

  get user$(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.currentUser$.pipe(map(u => u !== null));
  }

  get currentUser(): User | null {
    return this.currentUser$.getValue();
  }

  login(username: string, _password: string): void {
    this.currentUser$.next({ id: crypto.randomUUID(), username, email: `${username}@example.com` });
  }

  register(username: string, email: string, _password: string): void {
    this.currentUser$.next({ id: crypto.randomUUID(), username, email });
  }

  logout(): void {
    this.currentUser$.next(null);
  }
}
