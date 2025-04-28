import {HttpInterceptorFn} from '@angular/common/http';


export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const token = sessionStorage.getItem('access_token')
  if (token !== null){
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(newReq);
    return next(newReq);
  }

  console.log(req.headers);
  return next(req);
};

