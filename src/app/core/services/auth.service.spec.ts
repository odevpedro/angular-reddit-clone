import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  afterEach(() => localStorage.clear());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with no user when localStorage is empty', () => {
    expect(service.currentUser).toBeNull();
  });

  it('login should set currentUser with generated email', () => {
    service.login('testuser', 'pass');
    expect(service.currentUser?.username).toBe('testuser');
    expect(service.currentUser?.email).toBe('testuser@example.com');
  });

  it('login should persist user to localStorage', () => {
    service.login('testuser', 'pass');
    const stored = JSON.parse(localStorage.getItem('auth_user')!);
    expect(stored.username).toBe('testuser');
  });

  it('register should set currentUser with provided email', () => {
    service.register('newuser', 'new@example.com', 'pass');
    expect(service.currentUser?.username).toBe('newuser');
    expect(service.currentUser?.email).toBe('new@example.com');
  });

  it('logout should clear currentUser and localStorage', () => {
    service.login('testuser', 'pass');
    service.logout();
    expect(service.currentUser).toBeNull();
    expect(localStorage.getItem('auth_user')).toBeNull();
  });

  it('isLoggedIn$ should emit false when no user is logged in', async () => {
    const val = await firstValueFrom(service.isLoggedIn$);
    expect(val).toBeFalse();
  });

  it('isLoggedIn$ should emit true after login', async () => {
    service.login('testuser', 'pass');
    const val = await firstValueFrom(service.isLoggedIn$);
    expect(val).toBeTrue();
  });

  it('isLoggedIn$ should emit false after logout', async () => {
    service.login('testuser', 'pass');
    service.logout();
    const val = await firstValueFrom(service.isLoggedIn$);
    expect(val).toBeFalse();
  });

  it('user$ should emit the current user after login', async () => {
    service.login('testuser', 'pass');
    const user = await firstValueFrom(service.user$);
    expect(user?.username).toBe('testuser');
  });

  it('should restore user from localStorage on service instantiation', () => {
    const user = { id: '123', username: 'stored', email: 'stored@example.com' };
    localStorage.setItem('auth_user', JSON.stringify(user));
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const freshService = TestBed.inject(AuthService);
    expect(freshService.currentUser?.username).toBe('stored');
  });
});
