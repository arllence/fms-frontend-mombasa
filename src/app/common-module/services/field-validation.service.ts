import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class FieldValidationService {

  constructor() { }
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
 
    let config:any = {
        
        'email': 'This Field must contain a valid email address',
        'invalidPassword': 'Password must be at least 6 characters long, and contain a number.',
        'required': 'This field is required',
        'minlength': `Field requires minimum of  ${validatorValue.requiredLength} characters`,
        'maxlength': `Field has a maximum limit of  ${validatorValue.requiredLength} characters`,
        
        'invalidMatch': 'The password and confirm password must match'
 
    };
 
    return config[validatorName];
  }
}
