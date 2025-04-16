import {CanActivateFn, Router} from '@angular/router';
import {UserService} from './service/user.service';
import {inject} from '@angular/core';

export const homeGuard: CanActivateFn = (route, state) => {


  return (inject(UserService).authResponse)
    ? true
    : inject(Router).navigateByUrl('/login')


};
