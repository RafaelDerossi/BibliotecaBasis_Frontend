import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from './api-interceptor';
import { EventInterceptor } from './event-interceptors';
import { LoadingInterceptor } from './loading-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },  
  {provide: HTTP_INTERCEPTORS, useClass: EventInterceptor, multi: true},
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
];
