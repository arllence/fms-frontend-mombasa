

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { AdministrationService } from '../services/administration.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { bulk_create_user_url, list_staff_url } from '../../app.constants';
import { Subject } from 'rxjs';
import { UserList } from '../interfaces/administration';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SweetalertService } from 'src/app/common-module/shared-service/sweetalerts.service';
@Component({
  selector: 'app-stafflisting',
  templateUrl: './stafflisting.component.html',
  styleUrls: ['./stafflisting.component.css']
})
export class StafflistingComponent implements OnInit {
  public searchForm: FormGroup;
  dtOptions: any = {};
  records: UserList[] = [];
  previous: string | null;
  fileData: File;
  @ViewChild('uploadUsersModal') public uploadUsersModal: ModalDirective;
  constructor(private router: Router, private loadingService: LoadingService,
    public toastService: ToastService, public administrationService: AdministrationService,
    private formBuilder: FormBuilder, public sweetalertService: SweetalertService ) {
    this.searchForm = this.formBuilder.group({
      search_value: new FormControl('', ),
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

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      // pageLength: 5,
      // responsive: true,
      // retrieve:true,

    };
    this.filterusers()

  }
  back_btn(){
    this.router.navigate([this.previous]);
  }
  add_user(){
    this.router.navigate(['administration/staff-registration']);
  }
  handleFileupload(e:any) {
    this.fileData = e.target.files[0];
  }
  filterusers() {
    if (this.searchForm.valid) {
      const search_payload = {
        'username': this.searchForm.value['search_value']
      };
      this.loadingService.showloading();
      this.administrationService.getrecords(list_staff_url, search_payload).subscribe((res) => {
        if (res) {
          this.records = res;
          this.loadingService.hideloading();
        }

      });

    } else {
      this.toastService.showToastNotification('warning',
      'Please correct errors to proceed','');
    }
  }
   viewdetails(request_id:any) {
     this.router.navigate(['administration/staff-details', request_id]);

   }

   upload_users() {
    const formData  =  new FormData();
    formData.append('documents', this.fileData);
    
    this.sweetalertService.showConfirmation('Confirmation',
    'Do you wish to proceed uploading records?').then((res) => {
      if (res) {
        this.loadingService.showloading();
          this.administrationService.postrecord(bulk_create_user_url, formData).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              this.sweetalertService.showAlert('Success', 'Users Created Successfully', 'success');
              // this.fetchRecords();
              this.uploadUsersModal.hide();
              // this.fileData = ;

            } else {
              this.loadingService.hideloading();
            }
          });
        }
      });
  }

}
