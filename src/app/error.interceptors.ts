import { Injectable } from '@angular/core';
import {
HttpInterceptor, HttpRequest,
HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadingService } from './common-module/shared-service/loading.service';
import { ToastService } from './common-module/shared-service/toast.service';
import { AuthenticationService } from './authentication/services/authentication.service';
import { SweetalertService } from './common-module/shared-service/sweetalerts.service';
@Injectable({
providedIn: 'root'
})
export class ErrorHandler {
    public onlineFlag = navigator.onLine;
 constructor(private toastService: ToastService, private loadingService: LoadingService, public authenticationService: AuthenticationService, public sweetalertService: SweetalertService,) { }
 public handleError(err: any) {
     console.log(err.status);
     if (err.status == 0) {

        this.toastService.showToastNotification('error', 'Connection Refused', '');
        this.loadingService.hideloading();
     } else if (err.status == 401) {
        //  logout user
        this.toastService.showToastNotification('error', 'Session Expired.Logging Out', 'Error');
        this.authenticationService.logout();
        this.loadingService.hideloading();

     } else if (err.status == 404) {
      //  logout user
      this.toastService.showToastNotification('error', 'Reference Not Found', 'Error');
      this.loadingService.hideloading();

   } else if (err.status == 403) {

      //  logout user

      this.toastService.showToastNotification('error', 'You do not have permissions to perform action', 'Error');
      this.authenticationService.logout();
      this.loadingService.hideloading();

   } else if (err.status == 400) {
      const error = err.error;
      const errordetail = error['details'];
      const error_type = typeof(errordetail);
      const objectConstructor = ({}).constructor;
      const isObject = errordetail.constructor === objectConstructor;
      if (error_type == 'string') {
         // this.toastService.showToastNotification('error', errordetail, '');
         this.sweetalertService.showAlert('Error', errordetail, 'error');

      } else if (isObject === true) {
         const error_log:any = [];
         for (const [items, value] of Object.entries(errordetail)) {
            const datapassed: any = value;
            const highlighted_item: any = items;
            for (const passederrors of datapassed) {
               error_log.push({
                  'key': highlighted_item,
                  'error': passederrors
               });
            }
         }
         for (const item of error_log) {
            const arraykey = item.key;
            // this.toastService.showToastNotification('error', item.error, arraykey.toUpperCase());
            this.sweetalertService.showAlert('Error', item.error, 'error');

      }

      } else {
         const error_log:any = [];
         for (const items of Object.keys(errordetail)) {
            const selected_items = errordetail[items];
            for (const [newitems, newvalues] of Object.entries(selected_items)) {

               error_log.push({
                  'key': newitems,
                  'error': newvalues

               });

            }
            //     }

         }
         for (const item of error_log) {
            const arraykey = item.key;
            // this.toastService.showToastNotification('error', item.error, arraykey.toUpperCase());
            this.sweetalertService.showAlert('Error', item.error, 'error');

      }



      }
      // for (let [key, value] of Object.entries(errordetail)) {
      //    console.log(`${key}: ${value}`);
      //  }
      // this.toastService.showToastNotification('error',errordetail,'')
      this.loadingService.hideloading();
   } else {

   //  this.toastService.showToastNotification('error', err.message, '');
    this.sweetalertService.showAlert('Error', err.message, 'error');
    this.loadingService.hideloading();
   }
  }

}
