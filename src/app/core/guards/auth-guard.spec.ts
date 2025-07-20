import { authGuard } from './auth.guard';
import { Router } from '@angular/router';
import { inject } from '@angular/core';


describe('authGuard', () => {
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    (inject as any) = () => routerSpy;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should allow access when user is logged in', () => {
    localStorage.setItem('logged', 'true');

    const result = authGuard({} as any, { url: '/private' } as any);
    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should block access and redirect to /login when not logged in', () => {
    localStorage.setItem('logged', 'false');

    const result = authGuard({} as any, { url: '/private' } as any);
    expect(result).toBeFalse();
    expect(localStorage.getItem('redirectAfterLogin')).toBe('/private');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should treat missing logged key as not logged in', () => {
    const result = authGuard({} as any, { url: '/secret' } as any);
    expect(result).toBeFalse();
    expect(localStorage.getItem('redirectAfterLogin')).toBe('/secret');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
