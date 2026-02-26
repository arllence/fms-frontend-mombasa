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
  department_url,
  serverurl,
  incident_url,
  users_with_role_url,
  facilities_url

} from '../../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { AdministrationService } from '../../../administration/services/administration.service';
@Component({
  selector: 'app-view-quote',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class ViewRequestsComponent implements OnInit {
  public createRecordForm: FormGroup;
  public editRecordForm: FormGroup;
  public AssignRecordForm: FormGroup;
  public closeRecordForm: FormGroup;
  public ReplacementForm: FormGroup;

  validation_messages: any;
  formSubmitted = false;
  tenant_tag: string;
  deletereferenceid: any;
  selectedRow: any;
  selectedAll: boolean = false;
  fileData: File;
  fileData2: File;
  serverurl = serverurl

  private modalRef: NgbModalRef;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  @ViewChild('assignModal') public assignModal: ModalDirective;
  @ViewChild('closeModal') public closeModal: ModalDirective;
  records: any = [];
  record: any;
  searchString: string;
  previous: string | null;
  departments: any;
  users: any;
  active = 1;
  assigned: any = [];
  reassign: boolean = false;
  count_assigned: number;
  filteredRecords: any[];
  formData  =  new FormData();

  employees:any = [];
  employee_name = '';
  employee_no = '';
  position = '';
  display: boolean = true;
  travel_items: any = [];
  cost: any;
  item: any;

  send_to: any = ''
  advance_requests: any = [];
  processing: boolean = false;
  record_id: any;
  is_editing: boolean;
  activate_ohcs: boolean = false;
  sub_departments: any = [];
  ohcs: any = [];
  activate_hr_partner: boolean;
  facilities: any;
  assigned_records: any;
  page: number = 1;

  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public sweetalertService: SweetalertService) {

    this.createRecordForm = this.formBuilder.group({
      type_of_incident: new FormControl('', Validators.compose([Validators.required])),
      priority: new FormControl('', Validators.compose([Validators.required])),
      department: new FormControl('', Validators.compose([Validators.required])),
      facility: new FormControl('', Validators.compose([Validators.required])),
      affected_person_name: new FormControl('', Validators.compose([Validators.required])),
      person_affected: new FormControl('', Validators.compose([Validators.required])),
      date_of_incident: new FormControl('', Validators.compose([Validators.required])),
      time_of_incident: new FormControl('', Validators.compose([Validators.required])),
      type_of_issue: new FormControl('', Validators.compose([Validators.required])),
      subject: new FormControl('', Validators.compose([Validators.required])),
      message: new FormControl('', Validators.compose([Validators.required])),
      ks_number: new FormControl('', ),
      affected_person_phone: new FormControl('',),
    });

    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      type_of_incident: new FormControl('', Validators.compose([Validators.required])),
      priority: new FormControl('', Validators.compose([Validators.required])),
      department: new FormControl('', Validators.compose([Validators.required])),
      facility: new FormControl('', Validators.compose([Validators.required])),
      affected_person_name: new FormControl('', Validators.compose([Validators.required])),
      ks_number: new FormControl('', Validators.compose([Validators.required])),
      affected_person_phone: new FormControl('',),
      person_affected: new FormControl('', Validators.compose([Validators.required])),
      date_of_incident: new FormControl('', Validators.compose([Validators.required])),
      time_of_incident: new FormControl('', Validators.compose([Validators.required])),
      type_of_issue: new FormControl('', Validators.compose([Validators.required])),
      subject: new FormControl('', Validators.compose([Validators.required])),
      message: new FormControl('', Validators.compose([Validators.required])),
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
    const record_id = localStorage.getItem('record_id');
    if(record_id){
      this.fetchDetailRecord(record_id)
    } else{
      this.fetchRecords();
    }
    this.fetchDepartments();
    this.fetch_facilities();
    this.fetchAssigned()
    // this.fetch_users_with_role();
  }

  reset_page(){
    this.page = 1
  }

  back_btn(){
    this.router.navigate([this.previous]);
  }

  view_request(id:any){
    this.loadingService.showloading();
    this.router.navigate(['requests/view', id])
  }

  closeAllPopups() {
    this.modalRef.close();

  }
  resetForm() {
    this.createRecordForm.reset();
    this.formSubmitted = false;
  }

  // pagination
  getPageFromService(page:number){
    if (!isNaN(page)) {
      this.fetchRecords(page);
    } 
  }
  getAssignedPageFromService(page:number){
    if (!isNaN(page)) {
      this.fetchAssigned(page);
    } 
  }


  set_reassign(status:any){
    this.reassign = status
  }

  toggle_display(){
    this.display = !this.display
    this.is_editing = false;
    this.createRecordForm.reset();
    const record_id = localStorage.getItem('record_id')
    if (record_id){
      localStorage.removeItem('record_id')
      this.view_request(record_id)
    }
  }

  fetchRecords(page:number=1, query='') {
    this.display = true;
    this.is_editing = false
    this.loadingService.showloading();
    const params = {
      "page":page,
      "q":query
    };
    this.administrationService.getrecords(incident_url, params).subscribe((res) => {
      this.records = res;
      this.loadingService.hideloading();
    });
  }
  fetchAssigned(page:number=1, query='assigned') {
    this.display = true;
    this.is_editing = false
    this.loadingService.showloading();
    const params = {
      "page":page,
      "q":query
    };
    this.administrationService.getrecords(incident_url, params).subscribe((res) => {
      this.assigned_records = res;
      this.loadingService.hideloading();
    });
  }
  fetchDetailRecord(request_id:any) {
    this.loadingService.showloading();
    const params = {
      "request_id": request_id
    };
    this.administrationService.getrecords(incident_url, params).subscribe((res:any) => {
      this.record = res;
      // this.ReplacementForm.patchValue(res?.replacement_details)
      this.editDetailRecord()
      this.loadingService.hideloading();
    });
  }


  fetchDepartments() {
    const params = {};
    this.administrationService.getrecords(department_url, params).subscribe((res) => {
      this.departments = res;
    });
  }

  fetch_facilities() {
    const params = {};
    this.administrationService.getrecords(facilities_url, params).subscribe((res) => {
      this.facilities = res;
    });
  }
  

  fetch_users_with_role() {
    this.loadingService.showloading();
    const params = {
      "role_name": "HR"
    };
    this.administrationService.getrecords(users_with_role_url, params).subscribe((res) => {
      this.users = res;
      this.loadingService.hideloading();
    });
  }

  editRecord(index:any) {
    this.display = false;
    this.is_editing = true;
    const record = this.records?.results[index]
    this.record = record;
    this.record_id = record?.id

    this.employees = record?.existing_staff_same_title;

    this.createRecordForm.patchValue(record);
    this.createRecordForm.patchValue(
      {
        "department": record?.department?.id
      }
    );
  }

  editDetailRecord() {
    this.display = false;
    this.is_editing = true;
    this.record_id = this.record?.id

    this.employees = this.record?.existing_staff_same_title;

    this.createRecordForm.patchValue(this.record);
    this.createRecordForm.patchValue(
      {
        "department": this.record?.department?.id,
        "facility": this.record?.facility?.id,
      }
    );
  }


  deleteInstanceRecord(id:any) {
    const filter_params = {
      'request_id': id
    };
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting record? This process is irreversible').then((res) => {
        if (res) {
          // this.destroyTable();
          this.loadingService.showloading();
          this.administrationService.deleterecord(incident_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');
            this.fetchRecords();
          });
        }
      });

  }

  handleFileupload(e:any) {
    this.fileData = e.target.files[0];
  }

  saveEditChanges() {
    if (this.createRecordForm.valid) {

      let payload = this.createRecordForm.value
      payload['request_id'] = this.record_id

      this.formData.append('attachment', this.fileData);
      this.formData.append('payload', JSON.stringify(payload));

      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating incident?').then((res) => {
        if (res) {
          this.loadingService.showloading();
            this.administrationService.updaterecord(incident_url, this.formData).subscribe((res) => {
              if (res) {
                this.is_editing = false;
                localStorage.removeItem('record_id')
                this.loadingService.hideloading();
                this.createRecordForm.reset();
                this.ReplacementForm.reset();
                this.sweetalertService.showAlert('Success', 'Incident Updated Successfully', 'success');
                this.view_request(this.record_id)
                this.toggle_display();
                this.fetchRecords();
              } else {
                this.loadingService.hideloading();
              }
            });
          }
        });
        
    } else {
      // this.toastService.showToastNotification('error', 'Omitted Fields Required ', 'Error');
      this.administrationService.markFormAsDirty(this.createRecordForm);
      this.sweetalertService.showAlert('Error', 'Omitted Fields Required', 'error');
      console.log(this.createRecordForm.value);
      // this.scrollToTop();
    }
  }

  create_request() {

    if (this.createRecordForm.valid) {

      const payload = this.createRecordForm.value

      this.formData.append('attachments', this.fileData);
      this.formData.append('payload', JSON.stringify(payload));

      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed submitting request?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.processing = true;
            this.administrationService.postrecord(incident_url, this.formData).subscribe((res) => {
              if (res) {
                this.loadingService.hideloading();
                this.createRecordForm.reset();
                this.sweetalertService.showAlert('Success', 'Request Submitted Successfully', 'success');
                this.fetchRecords();
                this.toggle_display();
                this.employees = []
              } else {
                this.loadingService.hideloading();
              }
            });
          }
        });
        
    } else {
      this.administrationService.markFormAsDirty(this.createRecordForm);
      this.sweetalertService.showAlert('Error', 'Omitted Fields Required', 'error');
      console.log(this.createRecordForm.value);
    }
  }

  


}
