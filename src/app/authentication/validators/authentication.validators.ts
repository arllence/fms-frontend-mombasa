import { FormControl } from '@angular/forms';
export class NameValidator {
  static validName(fc: FormControl){
    if(fc.value === ""){
        return (null);
     
    } 
  }
}
export class PasswordValidator {
    static validPassword(fc: FormControl){
      if(fc.value === ""){
          return (null);
       
      } 
    }
  }

  export class OtpValidator {
    static validOtpCode(fc: FormControl){
      if(fc.value === ""){
          return (null);
       
      } 
    }
  }