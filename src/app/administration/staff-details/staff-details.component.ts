import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import {
  list_departments, list_user_roles,
  swap_user_department_url, suspend_user_url, unsuspend_user_url,
  reset_password_url, get_user_details_url, edit_user_url,
  award_user_role_url, revoke_user_role_url
} from '../../app.constants';
import { AdministrationService } from '../services/administration.service';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.css']
})
export class StaffDetailsComponent implements OnInit {
  doc_url_reference:any;
  user_roles_list: [] = [];
  department_list: [] = [];
  public AccountDetailsForm: FormGroup;
  @ViewChild('createModal') public createModal: ModalDirective;
  public SwapDepartmentForm: FormGroup;
  public AccountActivityForm: FormGroup;
  fileData: File;
  action_list = [
    { 'id': 'suspend', 'name': 'Suspend' },
    { 'id': 'unsuspend', 'name': 'Un-Suspend' },
  ];
  previous: string | null;


  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    public sweetalertService: SweetalertService, private route: ActivatedRoute,
    public toastService: ToastService, public loadingService: LoadingService, private router: Router,) {
    this.AccountDetailsForm = this.formBuilder.group({
      id: new FormControl(''),
      email: new FormControl(''),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      department_id: new FormControl(''),
      role_name: new FormControl(''),
    });
    this.SwapDepartmentForm = this.formBuilder.group({
      swap_department_id: new FormControl('', Validators.compose([Validators.required])),
    });
    this.AccountActivityForm = this.formBuilder.group({
      action: new FormControl('', Validators.compose([Validators.required])),
      remarks: new FormControl('', Validators.compose([Validators.required])),
    });

    // BACK BUTTON
    let current_url = String(window.location.pathname )
    const current = localStorage.getItem('current');
    this.previous = current;
    if (current){
      localStorage.setItem('previous',current)
      localStorage.setItem('current',current_url)
    } else {
      localStorage.setItem('current',current_url)
    }
  }

  ngOnInit() {
    const request_id = this.route.snapshot.paramMap.get('id');
    this.fetch_user_details(request_id);
    this.fetchallroles();
    this.fetchalldepartments();
  }

  back_btn(){
    this.router.navigate([this.previous]);
  }
  handleFileupload(e:any) {
    this.fileData = e.target.files[0];
  }
  fetch_user_details(id:any) {
    const payload = {
      'user_id': id
    };

    this.administrationService.getrecords(get_user_details_url, payload).subscribe((res:any) => {
      // this.doc_url_reference = '';
      const user_groups = res['user_groups'];
      const assigned_groups = [];
      for (const role of user_groups) {
        assigned_groups.push(role['id']);
      }
      // const doc_ref_id = res['id_card'];
      console.log(res)
      // this.doc_url_reference = doc_ref_id;
      const form_payload = {
        'id': res['id'],
        'email': res['email'],
        'first_name': res['first_name'],
        'last_name': res['last_name'],
        'department_id': res['department']['id'],
        'role_name': assigned_groups,
        
      };
      this.AccountDetailsForm.patchValue(form_payload);
      // this.AccountDetailsForm.setValue(form_payload);
    });


  }
showModal(){
  this.createModal.show();
  console.log( this.doc_url_reference )
}
  fetchallroles() {
    const payload = {
    };
    this.administrationService.getrecords(list_user_roles, payload).subscribe((res) => {
      for (const record of res) {
        this.user_roles_list.push(record);
      }

    });

  }
  fetchalldepartments() {
    const payload = {
    };
    this.administrationService.getrecords(list_departments, payload).subscribe((res) => {
      for (const record of res) {
        this.department_list.push(record);
      }

    });

  }
  swapdepartment() {
    if (this.SwapDepartmentForm.valid) {
      const payload = {
        'user_id': this.AccountDetailsForm.value['id'],
        'department_id': this.SwapDepartmentForm.value['swap_department_id'],
      };
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(swap_user_department_url, payload).subscribe((response) => {
            if (response) {
              this.loadingService.hideloading();
              this.sweetalertService.showAlert('Success', 'Department Successfully Swapped', 'success');
              this.SwapDepartmentForm.reset();
            }
          });
          this.loadingService.hideloading();
        } else {

        }
      });
    } else {
      this.administrationService.markFormAsDirty(this.SwapDepartmentForm);
      this.toastService.showToastNotification('error', 'Kindly Correct the errors to proceed', '');
    }
  }
  updatebiodata() {

    if (this.AccountDetailsForm.valid) {
      const payload = {
        'account_id': this.AccountDetailsForm.value['id'],
        'id_number': this.AccountDetailsForm.value['id_number'],
        'first_name': this.AccountDetailsForm.value['first_name'],
        'last_name': this.AccountDetailsForm.value['last_name'],
        'email': this.AccountDetailsForm.value['email'],
        'phone_number': this.AccountDetailsForm.value['phone_number'],

      };
      const formData  =  new FormData();
      formData.append('document', this.fileData);
      formData.append('payload', JSON.stringify(payload));
      const success_message = 'Successfully Updated';
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(edit_user_url, formData).subscribe((response) => {
            if (response) {
              this.sweetalertService.showAlert('Success', success_message, 'success');
              this.AccountActivityForm.reset();
              this.loadingService.hideloading();
              this.fetch_user_details(this.AccountDetailsForm.value['id']);
            }
          });

        }
      });


    }

  }
  awardrole(request_type:any) {
    const assigned_roles = this.AccountDetailsForm.value['role_name'];
    const assigned_length = assigned_roles.length;
    let confirmation_message = '';
    let post_data_url = '';

    if (assigned_length < 1) {
      this.sweetalertService.showAlert('Error', 'Kindly Select Roles', 'error');


    } else {
      if (request_type === 0) {
        confirmation_message = 'Do you wish to proceed revoking Role(s)';
        post_data_url = revoke_user_role_url;

      } else if (request_type === 1) {
        confirmation_message = 'Do you wish to proceed awarding Role(s)';
        post_data_url = award_user_role_url;
      }

    }



    if (this.AccountDetailsForm.valid) {
      const payload = {
        'account_id': this.AccountDetailsForm.value['id'],
        'role_id': assigned_roles,

      };
      const success_message = 'Successfully Updated';
      this.sweetalertService.showConfirmation('Confirmation', confirmation_message).then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(post_data_url, payload).subscribe((response) => {
            if (response) {
              this.sweetalertService.showAlert('Success', success_message, 'success');
              this.AccountActivityForm.reset();
              this.loadingService.hideloading();
              this.fetch_user_details(this.AccountDetailsForm.value['id']);
            }
          });

        }
      });


    }

  }
  actionaccount() {
    if (this.AccountActivityForm.valid) {
      const action = this.AccountActivityForm.value['action'];
      let endpoint_to_post_url = '';
      let success_message = '';
      if (action == 'suspend') {
        endpoint_to_post_url = suspend_user_url;
        success_message = 'Account Suspended Successfully';

      } else if (action == 'unsuspend') {
        endpoint_to_post_url = unsuspend_user_url;
        success_message = 'Account Un Suspended Successfully';
      }

      const payload = {
        'user_id': this.AccountDetailsForm.value['id'],
        'remarks': this.AccountActivityForm.value['remarks'],
      };
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(endpoint_to_post_url, payload).subscribe((response) => {
            if (response) {
              this.loadingService.hideloading();
              this.sweetalertService.showAlert('Success', success_message, 'success');
              this.AccountActivityForm.reset();
            }
          });
          this.loadingService.hideloading();
        } else {

        }
      });
    } else {
      this.administrationService.markFormAsDirty(this.AccountActivityForm);
      this.toastService.showToastNotification('error', 'Kindly Correct the errors to proceed', '');
    }
  }
  resetpassword() {
    const user_id = this.AccountDetailsForm.value['id'];
    if (user_id == '' || user_id == null) {
      this.toastService.showToastNotification('error', 'No User Selected', '');
    } else {
      const payload = {
        'user_id': user_id
      };
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to reset the user password?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(reset_password_url, payload).subscribe((response) => {
            if (response) {
              this.loadingService.hideloading();
              this.sweetalertService.showAlert('Success', 'Password Successfully Reset to Default', 'success');
            }
          });
          this.loadingService.hideloading();
        } else {

        }
      });

    }

  }

}
