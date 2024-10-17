import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AppService } from '../services/global/app.service';
import { LoadingService } from '../services/global/loading.service';

@Injectable()
export class EventInterceptor implements HttpInterceptor {

  isLoginOut = false;

  constructor(    
    protected app: AppService,
    protected router: Router,
    protected loadingService: LoadingService,    
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = next.handle(req);

    this.loadingService.loadingOn();

    return request.pipe(catchError(error => {

      if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {              
              this.app.toast("Sua Sessão expirou, faça login novamente!", 'warning');
              this.router.navigate(['/auth'], { queryParams: { returnUrl: this.router.url }});
          }          
      }

      return throwError(() => error);
  }));
   
  }
}
