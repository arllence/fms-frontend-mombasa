import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandler } from './error.interceptors';
import { EMPTY, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SweetalertService } from './common-module/shared-service/sweetalerts.service';
import { LoadingService } from './common-module/shared-service/loading.service';
const READONLY = 'readonly_role';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private errorHandler:ErrorHandler,private route: ActivatedRoute, public sweetalertsService: SweetalertService, private loadingService: LoadingService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const exemptappconfig = '/assets';
    const exemptlogin = 'acl/login';
   
    // exempting the login url from inteception
    if(request.url.search(exemptappconfig) !== -1 || request.url.search(exemptlogin) !== -1){

        // return next.handle(request);
        return next.handle(request)
    .pipe(catchError((err: any) => {
      console.log("logged",err)
        if (err instanceof HttpErrorResponse) {
          this.errorHandler.handleError(err);
        }

      return new Observable<HttpEvent<any>>();
    }));
        
    }
    else{
        request = request.clone({
            setHeaders: {
              Authorization: 'Bearer '+ localStorage.getItem('county47_token'),
            }
          });
          const readonly = localStorage.getItem(READONLY);
          if (readonly && (request.method.toLowerCase() === 'post' || request.method.toLowerCase() === 'put' || request.method.toLowerCase() === 'delete')) {
            this.sweetalertsService.showAlert('Permission Denied', 'You are not allowed to perform this action', 'error');
            this.loadingService.hideloading();
            return EMPTY;          
          } 
          return next.handle(request)
    .pipe(catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.errorHandler.handleError(err);
        }

      return new Observable<HttpEvent<any>>();
    }));
    }
    



  }
}