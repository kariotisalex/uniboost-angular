import { HttpClient, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError, EMPTY } from 'rxjs';
import { inject } from '@angular/core';
import { AuthenticationResponse } from './service/models/authentication-response';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const resetToken = sessionStorage.getItem('reset_token');

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && resetToken) {
        return http.post<AuthenticationResponse>(
          "http://localhost:9080/user/reset-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${resetToken}`
            }
          }
        ).pipe(
          switchMap((authResponse: AuthenticationResponse) => {
            sessionStorage.clear();
            sessionStorage.setItem("access_token", authResponse.access_token);
            sessionStorage.setItem("refresh_token", authResponse.refresh_token);

            // Clone the original request with the new token
            const clonedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${authResponse.access_token}`
              }
            });

            // Retry the original request with new token
            return next(clonedReq);
          }),
          catchError(() => {
            // On refresh failure: clear storage + reload
            sessionStorage.clear();
            window.location.reload();
            return EMPTY;
          })
        );
      }

      return throwError(() => error);
    })
  );
};
