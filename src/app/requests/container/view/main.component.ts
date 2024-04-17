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
  assign_quote_url,
  close_quote_url,
  department_url,
  quote_url,
  serverurl,
  traveler_url,
  users_with_role_url

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
  searchString: string;
  previous: string | null;
  departments: any;
  users: any;
  active = 1;
  assigned: any = [];
  reassign: boolean = false;
  count_assigned: number;
  filteredRecords: any[];

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

  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public sweetalertService: SweetalertService) {
    this.selectedRow = [];
    this.createRecordForm = this.formBuilder.group({
      employee_no: new FormControl('',),
      position: new FormControl('',),
      purpose: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      route: new FormControl('', Validators.compose([Validators.required])),
      departure_date: new FormControl('', Validators.compose([Validators.required])),
      return_date: new FormControl('', Validators.compose([Validators.required])),
      salary_advance_required: new FormControl('', Validators.compose([Validators.required])),
      salary_amount_required: new FormControl(0,),
      accommodation: new FormControl('', Validators.compose([Validators.required])),
      requesting_for: new FormControl('', Validators.compose([Validators.required])),
      mode_of_transport: new FormControl('', Validators.compose([Validators.required])),
      department: new FormControl('', Validators.compose([Validators.required])),
      visa_required_date: new FormControl('',),
      employees: new FormControl('',),
      send_to: new FormControl('',),
      travel_cost: new FormControl(0,),
      travel_cost_items: new FormControl([],),
    });
    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      employee_no: new FormControl('',),
      position: new FormControl('',),
      purpose: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      route: new FormControl('', Validators.compose([Validators.required])),
      departure_date: new FormControl('', Validators.compose([Validators.required])),
      return_date: new FormControl('', Validators.compose([Validators.required])),
      salary_advance_required: new FormControl('', Validators.compose([Validators.required])),
      salary_amount_required: new FormControl(0,),
      accommodation: new FormControl('', Validators.compose([Validators.required])),
      requesting_for: new FormControl('', Validators.compose([Validators.required])),
      mode_of_transport: new FormControl('', Validators.compose([Validators.required])),
      department: new FormControl('', Validators.compose([Validators.required])),
      visa_required_date: new FormControl('',),
      employees: new FormControl('',),
      send_to: new FormControl('',),
      travel_cost: new FormControl(0,),
      travel_cost_items: new FormControl([],),
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
    this.dtOptions = {
      pagingType: 'full_numbers',
       pageLength: 10,
      //  destroy: true,
      retrieve: true,
      lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
    };
    this.fetchRecords();
    this.fetchDepartments();
  }

  back_btn(){
    this.router.navigate([this.previous]);
  }

  destroyTable(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
    });
  }
  
  // rerenderTable(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //   });
  // }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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
  getPageFromService(page:any){
    this.fetchRecords(page);
  }
  getAssignedPageFromService(page:any){
    this.fetchAssignedRecords(page)
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
    if (!this.employee_name || !this.employee_no || !this.position) {
      this.toastService.showToastNotification('error', 'Omitted Inputs Required', 'Error');
      this.scrollToTop();
      return
    }
    const employee = {
      "employee_name": this.employee_name,
      "employee_no": this.employee_no,
      "position": this.position,
    }
    this.employees.push(employee);
    this.reset_employee()
  }

  remove_employee(index:any){
    this.employees.splice(index, 1);
  }

  create_advance_requests(){
    if (this.employee_name === '' || !this.cost ) {
      this.toastService.showToastNotification('error', 'Omitted Inputs Required', 'Error');
      return
    }
    let employee = this.employees[this.employee_name]
    employee['amount'] = this.cost
    this.advance_requests.push(employee);
    console.log(this.advance_requests)
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
      this.toastService.showToastNotification('error', 'Omitted Inputs Required', 'Error');
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


  fetchRecords(page:number=1) {
    this.loadingService.showloading();
    const params = {
      "page":page
    };
    this.administrationService.getrecords(traveler_url, params).subscribe((res) => {
      this.records = res;
      this.loadingService.hideloading();

    });
  }


  fetchAssignedRecords(page:any=1) {
    this.loadingService.showloading();
    const params = {
      "assigned" : true,
      "page": page
    };
    this.administrationService.getrecords(quote_url, params).subscribe((res:any) => {
      this.assigned = res;
      // this.set_assigned_count(res?.results)
      this.loadingService.hideloading();

    });
  }

  fetchDepartments() {
    const params = {

    };
    this.administrationService.getrecords(department_url, params).subscribe((res) => {
      this.departments = res;
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
    const record = this.records?.results[index]
    delete record?.trip?.id;
    let combined = {...record, ...record?.trip}
    // console.log(combined)
    this.editRecordForm.patchValue(combined);
    if(combined?.salary_advance?.amount){
      this.editRecordForm.patchValue({"salary_amount_required": combined?.salary_advance?.amount});
    }

    this.editModal.show();
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
          this.administrationService.deleterecord(traveler_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');
            this.fetchRecords();
          });
        }
      });

  }


  saveEditChanges() {
    // console.log(this.editRecordForm.value)
    if (this.editRecordForm.invalid) {
      this.administrationService.markFormAsDirty(this.editRecordForm);
      this.toastService.showToastNotification('error', 'Invalid form', 'Error')
      console.log(this.editRecordForm.value);
      this.scrollToTop();
    } else {
      
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating request?').then((res) => {
        if (res) {
          const payload = this.editRecordForm.value

          // this.destroyTable();
          this.loadingService.showloading();
          this.scrollToTop();
          this.administrationService.updaterecord(traveler_url, payload).subscribe((data) => {
            if (data) {
              this.fetchRecords();
              this.toggle_display();
              this.toastService.showToastNotification('success', 'Successfully Updated', '');
              this.editRecordForm.reset();
              // this.editModal.hide();
              this.loadingService.hideloading();
            }

          });
        }
      });

    }
  }

  handleFileupload(e:any) {
    this.fileData = e.target.files[0];
  }

  create_request() {

    if (this.createRecordForm.value?.requesting_for == 'OTHERS'){
      if (this.employees?.length == 0){
        this.toastService.showToastNotification('error', 'Target Employees Required', 'Error');
        this.scrollToTop();
        return
      } else {
        this.createRecordForm.patchValue({"employees": this.employees})
      }
    }
    // return
    this.createRecordForm.patchValue({"travel_cost_items": this.travel_items})
    if (this.createRecordForm.valid) {

      const payload = this.createRecordForm.value
      this.scrollToTop();

      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed submitting request?').then((res) => {
        if (res) {
          this.loadingService.showloading();
            this.administrationService.postrecord(traveler_url, payload).subscribe((res) => {
              if (res) {
                this.loadingService.hideloading();
                this.createRecordForm.reset();
                this.sweetalertService.showAlert('Success', 'Request Created Successfully', 'success');
                this.fetchRecords();
                this.toggle_display();
                this.createModal.hide();
                this.employees = []
                this.travel_items = []
                this.createRecordForm.reset()
              } else {
                this.loadingService.hideloading();
              }
            });
            this.scrollToTop();
          }
        });
        
    } else {
      this.toastService.showToastNotification('error', 'Omitted Fields Required ', 'Error');
      this.administrationService.markFormAsDirty(this.createRecordForm);
      console.log(this.createRecordForm.value);
      this.scrollToTop();
    }
  }

  


}
