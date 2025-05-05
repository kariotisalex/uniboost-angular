import {CanActivateFn, Router} from '@angular/router';
import {UserService} from './service/user.service';
import {inject} from '@angular/core';

export const homeGuard: CanActivateFn = (route, state) => {


  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.authResponse) {
    return true;
  }

  if (
    localStorage.getItem('access_token') !== null &&
    localStorage.getItem('refresh_token') !== null
  ) {
    return true;
  }

  // 👇 Return a redirection UrlTree
  return router.parseUrl('/login');
};
