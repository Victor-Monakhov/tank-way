import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.authToken ?? '';
  const isApiRequest = req.url.startsWith(environment.apiUrl);

  const handledReq = isApiRequest ? req.clone({
    setHeaders: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${token}`,
    },
  }) : req;

  return next(handledReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        authService.logOut();
        router.navigate(['welcome'], { queryParams: { login: true } }).then();
      }
      return throwError(() => error);
    }),
  );
};
