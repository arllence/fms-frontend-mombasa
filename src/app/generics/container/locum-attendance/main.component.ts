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
  locum_attendance_url

} from '../../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { AdministrationService } from 'src/app/administration/services/administration.service';
@Component({
  selector: 'app-view-quote',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class LocumAttendanceComponent implements OnInit {
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
  @ViewChild('approveModal') public approveModal: ModalDirective;
  @ViewChild('assignModal') public assignModal: ModalDirective;
  @ViewChild('budgetApprovalModal') public budgetApprovalModal: ModalDirective;
  @ViewChild('approveRequestModal') public approveRequestModal: ModalDirective;
  records: any = [];
  searchString: string;
  previous: string | null;
  departments: any;
  users: any;
  recruit_id: any;
  text: any;
  record_id: any;
  roles: any;

  attendance: any;
  month: any;
  day: any;
  hours: any = 0;
  overtime_hours: any = 0;
  year: any;
  months = [
    {"name": "January", "id": 1},
    {"name": "February", "id": 2},
    {"name": "March", "id": 3},
    {"name": "April", "id": 4},
    {"name": "May", "id": 5},
    {"name": "June", "id": 6},
    {"name": "July", "id": 7},
    {"name": "August", "id": 8},
    {"name": "September", "id": 9},
    {"name": "October", "id": 10},
    {"name": "November", "id": 11},
    {"name": "December", "id": 12}
  ]
  employee_id: string | null;




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
      comments: new FormControl('', Validators.compose([Validators.required])),
    });

    this.hiredForm = this.formBuilder.group({
      recruit_id: new FormControl('', Validators.compose([Validators.required])),
      status: new FormControl('', Validators.compose([Validators.required])),
      reporting_date: new FormControl('', Validators.compose([Validators.required])),
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

    let employee_id = this.route.snapshot.paramMap.get('employee_id');
    this.employee_id = employee_id
    let recruit_id = this.route.snapshot.paramMap.get('recruit_id');
    if (recruit_id){
      this.recruit_id = recruit_id
      this.fetchRecords(recruit_id);  
      this.fetchAttendance(employee_id)
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


  set_request_id(recruit_id:any){
    this.BudgetApprovalForm.patchValue({"recruit_id":recruit_id});
  }
  set_update_hired_status(recruit_id:any){
    this.hiredForm.patchValue({"recruit_id":recruit_id, "status":"HIRED"});
    this.hiredModal.show();
  }


  get_month_name(month_id:number){
    for (let month of this.months){
      if (month?.id == month_id ){
        return month?.name
      }
    }
  }

  fetchRecords(recruit_id:any) {
    this.loadingService.showloading();
    const params = {
      "request_id": recruit_id
    };
    this.administrationService.getrecords(recruit_url + '?slim=true', params).subscribe((res:any) => {
      this.records = res;
      this.loadingService.hideloading();
    });
  }

  fetchAttendance(recruit_id:any, month='', year='') {
    this.loadingService.showloading();
    const params = {
      "request_id": recruit_id,
      "month": month,
      "year": year,
    };
    this.administrationService.getrecords(locum_attendance_url, params).subscribe((res:any) => {
      this.attendance = res;
      this.year = res?.year;
      this.month = res?.month;
      this.day = "";
      // sort attendance by date
      this.attendance?.attendance.forEach((record: { data: any[]; }) => {
          record.data.sort((a:any, b:any) => parseInt(a.day) - parseInt(b.day));
      });
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
      'recruit_id': id
    };
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting record? This process is irreversible').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.deleterecord(recruit_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');
            this.fetchRecords(this.recruit_id);
          });
        }
      });

  }

  // post attendance
  post_attendance() {

    if (!this.year || !this.month || !this.day || !this.hours){
      this.sweetalertService.showAlert('Error', 'Omitted Fields Required', 'error');
      return
    }

    const payload = {
      "request_id": this.employee_id,
      "year" : this.year,
      "month" : this.month,
      "day" : this.day,
      "hours_worked" : this.hours,
      "overtime_hours" : this.overtime_hours
    }

    this.sweetalertService.showConfirmation('Confirmation',
    'Do you wish to proceed updating attendance?').then((res) => {
      if (res) {
        this.loadingService.showloading();
          this.administrationService.postrecord(locum_attendance_url, payload).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              this.sweetalertService.showAlert('Success', 'Updated Successfully', 'success');
              this.fetchAttendance(this.employee_id,this.month);
              this.hours = 0;
              this.day = 0
            } 
          });
        }
      });
  }
 
  // delete attendance
  delete_attendance(record_id:any) {
      let payload = {
        "record_id": record_id,
        "employee_id": this.employee_id
      }

      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting record?\nThis action is irreversible!').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.deleterecord(locum_attendance_url, payload).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              this.sweetalertService.showAlert('Success', 'Deleted Successfully', 'success');
              this.fetchAttendance(this.employee_id,this.month);
            } else {
              this.loadingService.hideloading();
            }
          });
        }
      });

  }


}
