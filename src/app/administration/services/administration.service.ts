
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(public http: HttpClient) { }
  getrecords(endpointurl:any, payload:any) {
    const options = {
      params : payload
    };
    return this.http.get<[]>(endpointurl, options);

  }
  postrecord(endpointurl:any, payload:any) {

    return this.http.post<[]>(endpointurl, payload);
  }
  deleterecord(endpointurl:any, params:any) {
    const options = {
      params : params
    };
    const serverurl = endpointurl;

    return this.http.delete<[]>(serverurl, options);

  }
  updaterecord(endpointurl:any, params:any) {
    const serverurl = endpointurl;

    return this.http.put<[]>(serverurl, params);

  }
  patchrecord(endpointurl:any, params:any) {
    const serverurl = endpointurl;

    return this.http.patch<[]>(serverurl, params);

  }

  markFormAsDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control:any = formGroup.get(field);

      // control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }
  getreverseBoolean(value:any) {
    switch (value) {
         case true:
             return 'true';
          case false:
            return 'false';
         default:
             return 'false';
     }
    }
    getBoolean(value:any) {
      switch (value) {
           case 'true':
               return true;
            case 'false':
              return false;
           default:
               return false;
       }
      }

}
