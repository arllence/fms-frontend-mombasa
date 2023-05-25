import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { AdministrationService } from '../../administration/services/administration.service';
import { change_password_url } from '../../app.constants';
import { AuthenticationService } from '../../authentication/services/authentication.service';
@Component({
  selector: 'app-common-profile',
  templateUrl: './common-profile.component.html',
  styleUrls: ['./common-profile.component.css']
})
export class CommonProfileComponent implements OnInit {
  public ChangePasswordForm: FormGroup;
  action_required_menu = false;
  newpasswordFieldType: boolean;
  current_passwordFieldType: boolean;
  confirm_passwordFieldType: boolean;
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {
    this.ChangePasswordForm = this.formBuilder.group({
      current_password: new FormControl('', Validators.compose([Validators.required])),
      new_password: new FormControl('', Validators.compose([Validators.required])),
      confirm_password: new FormControl('', Validators.compose([Validators.required])),

    });
    this.action_required_menu =  this.authenticationService.requiresPasswordChange();



  }
  togglenewpasswordFieldType() {
    this.newpasswordFieldType = !this.newpasswordFieldType;
  }
  togglecurrent_passwordFieldType() {
    this.current_passwordFieldType = !this.current_passwordFieldType;
  }
  toggleconfirm_passwordFieldType() {
    this.confirm_passwordFieldType = !this.confirm_passwordFieldType;
  }


  changepassword() {

    if (this.ChangePasswordForm.valid) {

      const payload = {
        'current_password': this.ChangePasswordForm.value['current_password'],
        'new_password': this.ChangePasswordForm.value['new_password'],
        'confirm_password': this.ChangePasswordForm.value['confirm_password']
      };
      this.loadingService.showloading();
      this.administrationService.postrecord(change_password_url, payload).subscribe((res) => {
        if (res) {
          this.loadingService.hideloading();
          this.ChangePasswordForm.reset();
          this.sweetalertService.showAlert('Success', 'Password Has been Changed Successfully,Log out to effect', 'success');
          this.authenticationService.logout();

          // this.authenticationService.logout();

        } else {
          this.loadingService.hideloading();
        }
      });


    } else {
      this.toastService.showToastNotification('error', 'KIndly correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.ChangePasswordForm);

    }
  }

  ngOnInit(): void {
  }

}
