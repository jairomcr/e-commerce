import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('logged') === 'true';

  if (!isLoggedIn) {
    // Guardar la ruta bloqueada en localStorage o query param
    localStorage.setItem('redirectAfterLogin', state.url);
    router.navigate(['/login']);
    return false;
  }

  return true;
};
