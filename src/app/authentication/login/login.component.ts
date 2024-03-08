import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationErrorMessages } from '../validators/authentication.messages';
import { NameValidator, PasswordValidator, OtpValidator } from '../validators/authentication.validators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { reset_password_url, reset_user_password_url } from 'src/app/app.constants';
import { SweetalertService } from 'src/app/common-module/shared-service/sweetalerts.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public LoginForm: FormGroup;
  validation_messages: any;
  submitted: false;
  passwordFieldType: boolean;
  loginformstatus: any;
  user_email: any;
  constructor(private toastService: ToastService, private router: Router,
     private formBuilder: FormBuilder, public authservice: AuthenticationService, public sweetalertService: SweetalertService,
     public loadingService: LoadingService) {
    this.LoginForm = this.formBuilder.group({
      email: new FormControl('',),
      password: new FormControl('',),
    });
    this.validation_messages = ValidationErrorMessages.validationMessages;
  }

  ngOnInit(): void {

  }
  showPassword() {
    this.passwordFieldType = !this.passwordFieldType;
  }

  current_year(){
    var date = new Date();  
    return date.getFullYear();
  }

  onSubmit() {
    if (this.LoginForm.valid) {
      this.loadingService.showloading();
      const credentials = {
        'email': this.LoginForm.value['email'],
        'password': this.LoginForm.value['password'],
      };
      this.authservice.login(credentials).subscribe((data) => {
        if (data) {
          this.toastService.showToastNotification('success', 'Login Successful', '');
        } else {
          this.toastService.showToastNotification('error', 'Could Not Authenticate you', '');

        }
        this.loadingService.hideloading();

      });
    } else {
      this.loginformstatus = true;
      this.toastService.showToastNotification('error', 'Fill in the details', '');

    }


  }
  resetpassword() {
    if (!this.user_email){
      this.toastService.showToastNotification('error', 'Email Required', 'Error');
      return
    }
    const payload = {
      'email': this.user_email
    };
    this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed resetting your password?').then((res) => {
      if (res) {
        this.loadingService.showloading();
        this.authservice.postrecord(reset_user_password_url, payload).subscribe((response) => {
          if (response) {
            this.loadingService.hideloading();
            this.sweetalertService.showAlert('Success', 'Password Successfully Reset. Check Your Email For New Password', 'success');
          }
        });
        this.loadingService.hideloading();
      } else {

      }
    });
  }

}
