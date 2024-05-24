import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimations} from "@angular/platform-browser/animations";

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { AuthInterceptor } from './layout/service/auth.interceptor';
import { authInterceptor } from './layout/service/auth.interceptor2';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),

    provideHttpClient(
      withInterceptors([authInterceptor]),
      withXsrfConfiguration({cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN'})
    ),
    provideAnimations(),
    
  ]
};
