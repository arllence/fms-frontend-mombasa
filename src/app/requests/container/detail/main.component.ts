import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import {
  approval_url,
  upload_budget_approval_url,
  serverurl,
  recruit_url,
  users_with_role_url,
  get_user_roles_url,
  hired_url

} from '../../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { AdministrationService } from 'src/app/administration/services/administration.service';
@Component({
  selector: 'app-view-quote',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class DetailRequestComponent implements OnInit {
  public createRecordForm: FormGroup;
  public rejectForm: FormGroup;
  public approveForm: FormGroup;
  public hiredForm: FormGroup;
  public ReplacementForm: FormGroup;
  public BudgetApprovalForm: FormGroup;
  validation_messages: any;
  formSubmitted = false;
  tenant_tag: string;

  fileData: File;
  formData  =  new FormData();
  serverurl = serverurl

  private modalRef: NgbModalRef;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('rejectModal') public rejectModal: ModalDirective;
  @ViewChild('hiredModal') public hiredModal: ModalDirective;
  @ViewChild('EditHiredModal') public EditHiredModal: ModalDirective;
  @ViewChild('approveModal') public approveModal: ModalDirective;
  @ViewChild('assignModal') public assignModal: ModalDirective;
  @ViewChild('budgetApprovalModal') public budgetApprovalModal: ModalDirective;
  @ViewChild('approveRequestModal') public approveRequestModal: ModalDirective;
  records: any = [];
  searchString: string;
  previous: string | null;
  departments: any;
  users: any;
  request_id: any;
  text: any;
  record_id: any;
  roles: any;
  employees: any = [];
  employee_id: any;


  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public sweetalertService: SweetalertService, private route: ActivatedRoute,) {

    this.createRecordForm = this.formBuilder.group({
      subject: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      department: new FormControl('', Validators.compose([Validators.required])),
      content: new FormControl('',),
    });

    this.approveForm = this.formBuilder.group({
      recruit_id: new FormControl('', Validators.compose([Validators.required])),
      comments: new FormControl('', ),
    });

    this.hiredForm = this.formBuilder.group({
      // recruit_id: new FormControl('', Validators.compose([Validators.required])),
      // status: new FormControl('', Validators.compose([Validators.required])),
      name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      employee_no: new FormControl('', Validators.compose([Validators.required])),
      reporting_date: new FormControl('', Validators.compose([Validators.required])),
      reporting_station: new FormControl('', Validators.compose([Validators.required])),
      working_station: new FormControl('',),
    });

    this.rejectForm = this.formBuilder.group({
      recruit_id: new FormControl('', Validators.compose([Validators.required])),
      status: new FormControl('', Validators.compose([Validators.required])),
      comments: new FormControl(''),
    });

    this.BudgetApprovalForm = this.formBuilder.group({
      recruit_id: new FormControl('', Validators.compose([Validators.required]))
    });

    this.ReplacementForm = this.formBuilder.group({
      recruit_id: new FormControl('', Validators.compose([Validators.required])),
      name: new FormControl('', Validators.compose([Validators.required])),
      position_number: new FormControl('', Validators.compose([Validators.required])),
      date_of_leaving: new FormControl('', Validators.compose([Validators.required])),
    });

    let request_id = this.route.snapshot.paramMap.get('id');
    if (request_id){
      this.request_id = request_id
      this.fetchRecords(request_id);  
    }

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
    this.fetchRoles();
  }

  back_btn(){
    this.router.navigate([this.previous]);
  }

  resetForm() {
    this.createRecordForm.reset();
    this.formSubmitted = false;
  }

  set_request_id(request_id:any){
    this.BudgetApprovalForm.patchValue({"recruit_id":request_id});
  }
  approve_as(request_id:any){
    this.ReplacementForm.patchValue({"recruit_id":request_id});
    this.approveForm.patchValue({"recruit_id":request_id});
    this.approveModal.show()
  }
  set_update_request_status(status:any,request_id:any){
    this.rejectForm.patchValue({"recruit_id":request_id, "status":status});
    this.rejectModal.show();
  }
  set_update_hired_status(request_id:any){
    this.hiredForm.patchValue({"recruit_id":request_id, "status":"HIRED"});
    this.hiredModal.show();
  }
  set_employee_id(index:any){
    const employee = this.records?.employees[index]
    this.employee_id = employee?.id;
    this.hiredForm.patchValue(employee)
    this.EditHiredModal.show();
  }

  add_employees(){
    if (this.hiredForm.valid){
      const employee = this.hiredForm.value;
      this.employees.push(employee);
      this.hiredForm.reset()
    } else {
      this.administrationService.markFormAsDirty(this.hiredForm);
    }
  }

  remove_employee(index:any){
    this.employees.splice(index, 1);
  }

  edit_employee(index:any){
    const employee = this.employees[index];
    this.hiredForm.patchValue(employee)
    this.employees.splice(index, 1);
  }



  fetchRecords(request_id:any) {
    this.loadingService.showloading();
    const params = {
      "request_id": request_id
    };
    this.administrationService.getrecords(recruit_url, params).subscribe((res:any) => {
      this.records = res;
      this.loadingService.hideloading();
    });
  }

  fetchRoles() {
    this.loadingService.showloading();
    const params = {
    };
    this.administrationService.getrecords(get_user_roles_url, params).subscribe((res:any) => {
      this.roles = res?.group_name;
      this.loadingService.hideloading();
    });
  }

  editRecord(record_id:any) {
    localStorage.setItem('record_id',record_id)
    this.router.navigate(['requests/list'])
  }


  deleteInstanceRecord(id:any) {
    const filter_params = {
      'request_id': id
    };
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting record? This process is irreversible').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.deleterecord(recruit_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');
            this.fetchRecords(this.request_id);
          });
        }
      });

  }

  handleFileupload(e:any) {
    this.fileData = e.target.files[0];
  }
 
  approve_request() {

    if (this.approveForm.valid) {

      let payload = this.approveForm.value

      if (this.roles.includes('HR')){
        if (this.records?.nature_of_hiring == 'Replacement') {
          if (!this.ReplacementForm.valid) {
            this.sweetalertService.showAlert('Error', 'Staff Replacement Details Required', 'error');
            this.administrationService.markFormAsDirty(this.ReplacementForm);
            return
          }
          payload['replacement'] = this.ReplacementForm.value
        }
      }

      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed approving request?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(approval_url, payload).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              this.approveForm.reset();
              this.sweetalertService.showAlert('Success', 'Requisition Approved Successfully', 'success');
              this.fetchRecords(this.request_id);
              this.approveModal.hide()
            } else {
              this.loadingService.hideloading();
            }
          });
        }
      });

    } else {
      this.toastService.showToastNotification('error', 'Omitted Fields Required ', 'Error');
      this.administrationService.markFormAsDirty(this.approveForm);
      console.log(this.approveForm.value)
    }
  }

  update_request_status() {

    if (this.rejectForm.valid) {

      const payload = this.rejectForm.value

      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating requisition?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.patchrecord(recruit_url, payload).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              this.rejectForm.reset();
              this.sweetalertService.showAlert('Success', 'Requisition Updated Successfully', 'success');
              this.fetchRecords(this.request_id);
              this.rejectModal.hide()
            } else {
              this.loadingService.hideloading();
            }
          });
        }
      });

    } else {
      this.toastService.showToastNotification('error', 'Omitted Fields Required ', 'Error');
      this.administrationService.markFormAsDirty(this.rejectForm);
      console.log(this.rejectForm.value)
    }
  }

  update_hired_status() {

    if (this.hiredForm.valid) {
      this.add_employees()
    }

    const payload = {
      'recruit_id' : this.request_id,
      'employees' : this.employees,
    }

    this.sweetalertService.showConfirmation('Confirmation',
    'Do you wish to proceed marking requisition as Hired?').then((res) => {
      if (res) {
        this.loadingService.showloading();
        this.administrationService.postrecord(hired_url, payload).subscribe((res) => {
          if (res) {
            this.loadingService.hideloading();
            this.hiredForm.reset();
            this.sweetalertService.showAlert('Success', 'Requisition Updated Successfully', 'success');
            this.fetchRecords(this.request_id);
            this.hiredModal.hide()
          } else {
            this.loadingService.hideloading();
          }
        });
      }
    });
  }

  edit_hired_status() {

    if (!this.hiredForm.valid) {
      this.administrationService.markFormAsDirty(this.hiredForm);
      return
    }

    let payload = this.hiredForm.value

    payload['request_id'] = this.employee_id

    this.sweetalertService.showConfirmation('Confirmation',
    'Do you wish to proceed editing record?').then((res) => {
      if (res) {
        this.loadingService.showloading();
        this.administrationService.updaterecord(hired_url, payload).subscribe((res) => {
          if (res) {
            this.loadingService.hideloading();
            this.hiredForm.reset();
            this.sweetalertService.showAlert('Success', 'Requisition Updated Successfully', 'success');
            this.fetchRecords(this.request_id);
            this.EditHiredModal.hide()
          } else {
            this.loadingService.hideloading();
          }
        });
      }
    });
  }

  upload_budget_approval() {

    if (this.BudgetApprovalForm.valid) {

      const payload = this.BudgetApprovalForm.value

      this.formData.append('budget_approval', this.fileData);
      this.formData.append('payload', JSON.stringify(payload));
     
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed uploading budget?').then((res) => {
        if (res) {
          this.loadingService.showloading();
            this.administrationService.postrecord(upload_budget_approval_url, this.formData).subscribe((res) => {
              if (res) {
                this.loadingService.hideloading();
                this.BudgetApprovalForm.reset();
                this.sweetalertService.showAlert('Success', 'Uploaded Successfully', 'success');
                this.fetchRecords(this.request_id);
                this.budgetApprovalModal.hide()

              } else {
                this.loadingService.hideloading();
              }
            });
          }
        });

    } else {
      this.toastService.showToastNotification('error', 'Omitted Fields Required ', 'Error');
      this.administrationService.markFormAsDirty(this.BudgetApprovalForm);

    }
  }


}
