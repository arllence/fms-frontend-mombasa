
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldValidationService } from '../../common-module/services/field-validation.service';
 
@Component({
  selector: 'error-message',
  templateUrl: './common-error.component.html',
  styleUrls: ['./common-error.component.css']
})
export class CommonErrorComponent {
  @Input() control: FormControl;
 
  constructor() { }
   
  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)) {
        return FieldValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }    
    return null;
  }
}