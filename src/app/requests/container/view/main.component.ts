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
  recruit_url,
  users_with_role_url,
  sub_departments_url,
  ohc_url

} from '../../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { AdministrationService } from 'src/app/administration/services/administration.service';
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

  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public sweetalertService: SweetalertService) {

    this.createRecordForm = this.formBuilder.group({
      department: new FormControl('', Validators.compose([Validators.required])),
      position_title: new FormControl('', Validators.compose([Validators.required])),
      position_type: new FormControl('', Validators.compose([Validators.required])),
      qualifications: new FormControl('', Validators.compose([Validators.required])),
      nature_of_hiring: new FormControl('', Validators.compose([Validators.required])),
      existing_staff_same_title: new FormControl('',),
      reasons_for_not_sharing_tasks: new FormControl('',),
      filling_date: new FormControl('', Validators.compose([Validators.required])),
      period_from: new FormControl('',),
      period_to: new FormControl('',),
      temporary_task_assignment_to: new FormControl('', Validators.compose([Validators.required])),
      sub_department: new FormControl('', Validators.compose([Validators.required])),
      ohc: new FormControl('',),
    });

    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      department: new FormControl('', Validators.compose([Validators.required])),
      position_title: new FormControl('', Validators.compose([Validators.required])),
      position_type: new FormControl('', Validators.compose([Validators.required])),
      qualifications: new FormControl('', Validators.compose([Validators.required])),
      nature_of_hiring: new FormControl('', Validators.compose([Validators.required])),
      existing_staff_same_title: new FormControl('',),
      reasons_for_not_sharing_tasks: new FormControl('',),
      filling_date: new FormControl('', Validators.compose([Validators.required])),
      period_from: new FormControl('',),
      period_to: new FormControl('',),
      temporary_task_assignment_to: new FormControl('', Validators.compose([Validators.required])),
      sub_department: new FormControl('', Validators.compose([Validators.required])),
      ohc: new FormControl('',),
    });
    this.AssignRecordForm = this.formBuilder.group({
      quote: new FormControl('', Validators.compose([Validators.required])),
      staff: new FormControl('', Validators.compose([Validators.required])),
    });
    this.closeRecordForm = this.formBuilder.group({
      quote: new FormControl('', Validators.compose([Validators.required])),
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
    this.fetch_sub_departments();
    this.fetch_ohcs();
  }

  back_btn(){
    this.router.navigate([this.previous]);
  }

  view_request(id:any){
    console.log(id)
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

  set_request_id(quote_id:any){
    this.AssignRecordForm.patchValue({"quote":quote_id})
    this.closeRecordForm.patchValue({"quote":quote_id})
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

  containsOHCOrOutreach(id: string) {
    let target = ''
    for (let item of this.sub_departments){
      if (id == item?.id){
        target = item?.name;
        break;
      }
    }

    const lowercasedInput = target.toLowerCase();
    const state = lowercasedInput.includes("ohc") || lowercasedInput.includes("outreach");

    if (state){
      this.activate_ohcs = true;
    } else {
      this.activate_ohcs = false;
    }
  }

  scrollToTop() {
    window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
    });
  }

  set_send_to(to:any){
    this.send_to = to
    this.createRecordForm.patchValue({"send_to": to})
    this.editRecordForm.patchValue({"send_to": to})
  }

  reset_employee(){
    this.employee_name = ''
    this.employee_no = ''
    this.position = ''
  }

  create_employees(){
    if (!this.employee_name) {
      this.sweetalertService.showAlert('Something Missing', 'Omitted Inputs Required', 'error');
      return
    }
    this.employees.push(this.employee_name);
    this.reset_employee()
  }

  remove_employee(index:any){
    this.employees.splice(index, 1);
  }

  edit_employee(index:any){
    this.employee_name = this.employees[index]
    this.employees.splice(index, 1);
  }

  create_advance_requests(){
    if (this.employee_name === '' || !this.cost ) {
      // this.toastService.showToastNotification('error', 'Omitted Inputs Required', 'Error');
      this.sweetalertService.showAlert('Something Missing', 'Omitted Inputs Required', 'error');
      return
    }
    let employee = this.employees[this.employee_name]
    
    for (let item of this.advance_requests){
      if (item?.employee_no === employee?.employee_no) {
        // this.toastService.showToastNotification('error', 'Employee already added !', 'Error');
        this.sweetalertService.showAlert('Error Somewhere', `Employee ${employee?.employee_name} already added`, 'error');
        return
      }
    }

    employee['amount'] = this.cost

    this.advance_requests.push(employee);
    this.reset_employee()
    this.cost = 0
  }

  remove_advance_requests(index:any){
    this.advance_requests.splice(index, 1);
  }

  calculate_travel_cost(){
    let count = 0
    for(let item of this.travel_items){
      count += Number(item.cost)
    }
    this.createRecordForm.patchValue({"travel_cost": count})
    this.editRecordForm.patchValue({"travel_cost": count})
  }

  reset_travel_item(){
    this.item = ''
    this.cost = 0
  }

  create_travel_items(){
    if (!this.item || !this.cost ) {
      // this.toastService.showToastNotification('error', 'Omitted Inputs Required', 'Error');
      this.sweetalertService.showAlert('Something Missing', 'Omitted Inputs Required', 'error');
      this.scrollToTop();
      return
    }
    const travel_item = {
      "item": this.item,
      "cost": this.cost,
    }
    this.travel_items.push(travel_item);
    this.reset_travel_item();
    this.calculate_travel_cost();
  }

  remove_travel_item(index:any){
    this.travel_items.splice(index, 1);
    this.calculate_travel_cost();
  }

  edit_travel_item(index:any){
    const item = this.travel_items[index];
    this.item = item?.item
    this.cost = item?.cost
    this.travel_items.splice(index, 1);
    this.calculate_travel_cost();
  }


  fetchRecords(page:number=1, query='') {
    this.loadingService.showloading();
    const params = {
      "page":page,
      "q":query
    };
    this.administrationService.getrecords(recruit_url, params).subscribe((res) => {
      this.records = res;
      this.loadingService.hideloading();
    });
  }
  fetchDetailRecord(request_id:any) {
    this.loadingService.showloading();
    const params = {
      "request_id": request_id
    };
    this.administrationService.getrecords(recruit_url, params).subscribe((res) => {
      this.record = res;
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

  fetch_sub_departments() {
    const params = {};
    this.administrationService.getrecords(sub_departments_url, params).subscribe((res) => {
      this.sub_departments = res;
    });
  }

  fetch_ohcs() {
    const params = {};
    this.administrationService.getrecords(ohc_url, params).subscribe((res) => {
      this.ohcs = res;
    });
  }

  

  fetch_users_with_role() {
    this.loadingService.showloading();
    const params = {
      "role_name": "MMD"
    };
    this.administrationService.getrecords(users_with_role_url, params).subscribe((res) => {
      this.users = res;
      // this.dtTrigger.next()
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
        "department": this.record?.department?.id
      }
    );
  }


  deleteInstanceRecord(id:any) {
    console.log(id)
    const filter_params = {
      'request_id': id
    };
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting record? This process is irreversible').then((res) => {
        if (res) {
          // this.destroyTable();
          this.loadingService.showloading();
          this.administrationService.deleterecord(recruit_url, filter_params).subscribe((res) => {

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

    this.createRecordForm.patchValue({"existing_staff_same_title": this.employees})
    if (this.createRecordForm.valid) {

      let payload = this.createRecordForm.value
      payload['record_id'] = this.record_id

      this.formData.append('job_description', this.fileData);
      this.formData.append('payload', JSON.stringify(payload));

      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating request?').then((res) => {
        if (res) {
          this.loadingService.showloading();
            this.administrationService.updaterecord(recruit_url, this.formData).subscribe((res) => {
              if (res) {
                this.is_editing = false;
                localStorage.removeItem('record_id')
                this.loadingService.hideloading();
                this.createRecordForm.reset();
                this.sweetalertService.showAlert('Success', 'Requisition Updated Successfully', 'success');
                this.view_request(this.record_id)
                this.toggle_display();
                this.createModal.hide();
                this.employees = []
                this.createRecordForm.reset();
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

    this.createRecordForm.patchValue({"existing_staff_same_title": this.employees})
    if (this.createRecordForm.valid) {

      const payload = this.createRecordForm.value

      this.formData.append('job_description', this.fileData);
      this.formData.append('payload', JSON.stringify(payload));

      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed submitting request?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.processing = true;
            this.administrationService.postrecord(recruit_url, this.formData).subscribe((res) => {
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
