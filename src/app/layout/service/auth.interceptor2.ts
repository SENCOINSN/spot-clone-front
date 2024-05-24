import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { tap } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    let authReq = req;
    const token = authService.getToken();

    if (token != null) {
        //console.log("token value "+token)
      const accessTokenExpired = authService.tokenExpired(token);
      if(accessTokenExpired){
         authService.logout()
        return next(authReq);
      }
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    }
    return next(authReq);

    
  };