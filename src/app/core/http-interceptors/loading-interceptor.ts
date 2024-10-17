import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/global/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loaderService = this.injector.get(LoadingService);

    loaderService.loadingOn();

    return next.handle(request).pipe(
      finalize(() => loaderService.loadingOff())
    );
  }
}
