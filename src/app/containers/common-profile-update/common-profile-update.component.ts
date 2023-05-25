import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { AdministrationService } from '../../administration/services/administration.service';
import { change_password_url, complete_profile_url } from '../../app.constants';
import { AuthenticationService } from '../../authentication/services/authentication.service';
@Component({
  selector: 'app-common-profile-update',
  templateUrl: './common-profile-update.component.html',
  styleUrls: ['./common-profile-update.component.css']
})
export class CommonProfileUpdateComponent implements OnInit {
  public UpdateProfileForm: FormGroup;
  fileData: File;

  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {
    this.UpdateProfileForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required])),
      phone_number: new FormControl('', Validators.compose([Validators.required])),

    });
  }

  handleFileupload(e:any) {
    this.fileData = e.target.files[0];
  }



  update_profile() {

    if (this.UpdateProfileForm.valid) {

      const payload = this.UpdateProfileForm.value
      const formData  =  new FormData();
      formData.append('document', this.fileData);
      formData.append('payload', JSON.stringify(payload));

      this.loadingService.showloading();
      this.administrationService.postrecord(complete_profile_url, formData).subscribe((res) => {
        if (res) {
          this.loadingService.hideloading();
          this.UpdateProfileForm.reset();
          this.sweetalertService.showAlert('Success', 'Profile Updated Successfully', 'success');

        } else {
          this.loadingService.hideloading();
        }
      });


    } else {
      this.toastService.showToastNotification('error', 'Kindly correct the errors to proceed', '');
      this.administrationService.markFormAsDirty(this.UpdateProfileForm);

    }
  }

  ngOnInit(): void {
  }

}
