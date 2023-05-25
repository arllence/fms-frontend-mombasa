import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationErrorMessages } from '../validators/authentication.messages';
import { NameValidator, PasswordValidator, OtpValidator } from '../validators/authentication.validators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
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
  constructor(private toastService: ToastService, private router: Router,
     private formBuilder: FormBuilder, public authservice: AuthenticationService,
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
      this.toastService.showToastNotification('error', 'No Input Values.Kindly Fill in the details', '');

    }


  }

}
