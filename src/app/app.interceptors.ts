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
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private errorHandler:ErrorHandler,private route: ActivatedRoute) {}
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