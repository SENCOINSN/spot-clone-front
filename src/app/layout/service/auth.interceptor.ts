import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable, of, tap } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    authService=inject(AuthService);

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.authService.getToken();
    //const refreshToken = this.tokenStorage.getTokenRefresh();
    if (token != null) {
        console.log("token value "+token)
      const accessTokenExpired = this.authService.tokenExpired(token);
      if(accessTokenExpired){
        this.authService.logout()
        return next.handle(authReq);
      }
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    }
    return next.handle(authReq);
  }
}