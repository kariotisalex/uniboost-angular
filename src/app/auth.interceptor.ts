// auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError, EMPTY } from 'rxjs';
import {
  catchError,
  filter,
  switchMap,
  take,
  finalize,
  tap
} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  // Flag to prevent multiple simultaneous refresh calls
  private isRefreshing = false;
  // Emits the new access token once it’s retrieved
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1) Skip attaching the access token for the refresh-token endpoint itself
    if (req.url.endsWith('/refresh-token')) {
      return next.handle(req);
    }

    // 2) Read the current access token from sessionStorage
    const accessToken = sessionStorage.getItem('access_token');

    // 3) Clone the request and add the Authorization header if we have a token
    const authReq = accessToken
      ? this.addTokenHeader(req, accessToken)
      : req;

    // 4) Send the request
    return next.handle(authReq).pipe(
      // 5) If we get a 401 Unauthorized, attempt token refresh
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.handle401Error(authReq, next);
        }
        // If it’s some other error, just propagate it
        return throwError(() => err);
      })
    );
  }

  /**
   * Helper: clone the request and set the Authorization header
   */
  private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  /**
   * Called when we receive a 401 response.
   * Tries to get a new access token using the refresh token,
   * then replays the original request.
   */
  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // If a refresh call is already in progress, queue up behind it
    if (this.isRefreshing) {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),   // wait until non-null token is emitted
        take(1),                          // only take the first emission
        switchMap(token =>               // then replay the original request
          next.handle(this.addTokenHeader(request, token!))
        )
      );
    } else {
      // No refresh in progress yet, so start one
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      // Grab the refresh token from storage
      const refreshToken = sessionStorage.getItem('refresh_token');
      if (!refreshToken) {
        // No refresh token → force logout
        return this.logoutAndCancel();
      }

      // Call the refresh-token endpoint
      return this.http.post<{
        access_token: string;
        refresh_token: string;
      }>(
        '/api/refresh-token',
        null,
        { headers: { Authorization: `Bearer ${refreshToken}` } }
      ).pipe(
        tap(tokens => {
          // 1) Save the newly issued tokens
          sessionStorage.setItem('access_token', tokens.access_token);
          sessionStorage.setItem('refresh_token', tokens.refresh_token);
          // 2) Emit the new access token so queued requests can proceed
          this.refreshTokenSubject.next(tokens.access_token);
        }),
        // Replay the original request with the new token
        switchMap(tokens =>
          next.handle(this.addTokenHeader(request, tokens.access_token))
        ),
        // If refresh failed (e.g. refresh token expired), logout
        catchError(() => this.logoutAndCancel()),
        // Cleanup flag once done
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    }
  }

  /**
   * Clears storage, alerts the user and navigates to /login.
   * Returns EMPTY so the original stream completes.
   */
  private logoutAndCancel(): Observable<never> {
    alert('Your session has expired, please login again');
    this.router.navigate(['/login']);
    return EMPTY;
  }
}
