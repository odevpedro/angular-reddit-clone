import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let authService: AuthService;
  let router: Router;

  const runGuard = () =>
    TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ],
    });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => localStorage.clear());

  it('should allow activation when the user is logged in', () => {
    authService.login('testuser', 'pass');
    expect(runGuard()).toBeTrue();
  });

  it('should block activation when the user is not logged in', () => {
    expect(runGuard()).toBeFalse();
  });

  it('should redirect to /login when blocking activation', () => {
    runGuard();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should not redirect when user is logged in', () => {
    authService.login('testuser', 'pass');
    runGuard();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
