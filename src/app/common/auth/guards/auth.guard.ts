import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!authService.authorised) {
    router.navigate(['welcome'], { queryParams: { login: true } }).then();
    return false;
  }
  return true;
};
