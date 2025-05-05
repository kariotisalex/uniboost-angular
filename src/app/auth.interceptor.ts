import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError, switchMap, catchError, of } from 'rxjs';

let isRefreshing = false;
let retryRequest: HttpRequest<any> | null = null;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);

  // Skip interception for refresh-token endpoint
  if (req.url.includes('/api/user/refresh-token')) {
    return next(req);
  }

  const accessToken = localStorage.getItem('access_token');
  const cloned = accessToken
    ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${accessToken}`) })
    : req;

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isRefreshing) {
        isRefreshing = true;
        retryRequest = req;

        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
          localStorage.clear();
          location.reload();
          return throwError(() => error);
        }

        // Refresh the token with correct header
        return http.post<{ access_token: string; refresh_token: string }>(
          '/api/user/refresh-token',
          null,
          {
            headers: { Authorization: `Bearer ${refreshToken}` }
          }
        ).pipe(
          switchMap((res) => {
            // Store new tokens
            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('refresh_token', res.refresh_token);

            // Retry original request with new access token
            const retryReq = retryRequest!.clone({
              headers: retryRequest!.headers.set('Authorization', `Bearer ${res.access_token}`)
            });

            // Reset state
            isRefreshing = false;
            retryRequest = null;

            return next(retryReq);
          }),
          catchError(refreshErr => {
            // Refresh token invalid — force logout
            localStorage.clear();
            location.reload();
            return throwError(() => refreshErr);
          })
        );
      }

      // Already refreshing or other error
      return throwError(() => error);
    })
  );
};
