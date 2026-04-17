import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user.model';

const STORAGE_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser$ = new BehaviorSubject<User | null>(this.loadUser());

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
    const user: User = { id: crypto.randomUUID(), username, email: `${username}@example.com` };
    this.persist(user);
    this.currentUser$.next(user);
  }

  register(username: string, email: string, _password: string): void {
    const user: User = { id: crypto.randomUUID(), username, email };
    this.persist(user);
    this.currentUser$.next(user);
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.currentUser$.next(null);
  }

  private persist(user: User): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  private loadUser(): User | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }
}
