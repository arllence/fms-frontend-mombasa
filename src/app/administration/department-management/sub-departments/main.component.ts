import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import {
  edit_department_url, list_department_url, create_department_url,
  delete_department_url, department_detail_url, upload_departments_url, slt_url,
  list_staff_url,
  sub_departments_url
} from '../../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { Department } from '../../interfaces/administration';
import { AdministrationService } from '../../services/administration.service';
@Component({
  selector: 'app-sub-department',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class SubDepartmentComponent implements OnInit {
  public createRecordForm: FormGroup;
  public editRecordForm: FormGroup;
  validation_messages: any;
  formSubmitted = false;
  tenant_tag: string;
  deletereferenceid: any;
  selectedRow: any;
  selectedAll: boolean = false;

  private modalRef: NgbModalRef;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  public dtTrigger:any = new Subject<any>();
  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  @ViewChild('uploadDepartmentModal') public uploadDepartmentModal: ModalDirective;
  records: Department[] = [];
  searchString: string;
  fileData: File;
  slts: any;
  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public sweetalertService: SweetalertService) {
    this.selectedRow = [];
    this.createRecordForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    });
    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    });

  }
  ngOnInit(): void {
    this.fetchRecords();
  }


  resetForm() {
    this.createRecordForm.reset();
    this.formSubmitted = false;
  }

  handleFileupload(e:any) {
    this.fileData = e.target.files[0];
  }

  fetchRecords() {
    this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(sub_departments_url, params).subscribe((res) => {
      this.records = res;
      this.loadingService.hideloading();
    });
  }

  editRecord(index:any) {
    const res:any = this.records[index]

      const forminstance = {
        'id': res['id'],
        'name': res['name'],
      };
      this.editRecordForm.patchValue(forminstance);
      this.editModal.show();
  }
  deleteInstanceRecord() {
    const filter_params = {
      'request_id': this.deletereferenceid
    };
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting record? This process is irreversible').then((res) => {
        if (res) {
          this.administrationService.deleterecord(sub_departments_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');
            this.deleteModal.hide();
            this.fetchRecords();
          });
        }
      });

  }

  deleteRecord(objectinstance:any) {
    this.deletereferenceid = objectinstance;
    this.deleteModal.show();
  }
  createRecord() {
    if (this.createRecordForm.invalid) {
      this.formSubmitted = true;
      this.toastService.showToastNotification('error',
        'Kindly Correct the errors highlighted to proceed', '');

    } else {
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed creating record?').then((res) => {
        if (res) {
          const payload = {
            'name': this.createRecordForm.get('name')!.value,
          };

          this.administrationService.postrecord(sub_departments_url, payload).subscribe((data) => {
            if (data) {
              this.fetchRecords();
              this.toastService.showToastNotification('success', 'Successfully Created', '');
              this.createRecordForm.reset();
              this.createModal.hide();
            }

          });

        }
      });

    }
  }


  saveEditChanges() {
    if (this.editRecordForm.invalid) {
      this.formSubmitted = true;

    } else {
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating record?').then((res) => {
        if (res) {
          const payload = {
            'request_id': this.editRecordForm.get('id')!.value,
            'name': this.editRecordForm.get('name')!.value,
          };
          this.administrationService.updaterecord(sub_departments_url, payload).subscribe((data) => {
            if (data) {
              this.fetchRecords();
              this.toastService.showToastNotification('success', 'Successfully Updated', '');
              this.editRecordForm.reset();
              this.editModal.hide();
            }

          });
        }
      });

    }
  }

  upload_departments() {
    const formData  =  new FormData();
    formData.append('documents', this.fileData);
    
    this.sweetalertService.showConfirmation('Confirmation',
    'Do you wish to proceed uploading records?').then((res) => {
      if (res) {
        this.loadingService.showloading();
          this.administrationService.postrecord(upload_departments_url, formData).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              this.sweetalertService.showAlert('Success', 'Departments Created Successfully', 'success');
              this.fetchRecords();
              this.uploadDepartmentModal.hide();
              // this.fileData = ;

            } else {
              this.loadingService.hideloading();
            }
          });
        }
      });
  }


}
