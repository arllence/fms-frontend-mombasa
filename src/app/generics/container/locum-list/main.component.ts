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
  locum_url,
  users_with_role_url

} from '../../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { AdministrationService } from 'src/app/administration/services/administration.service';
@Component({
  selector: 'app-view-quote',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class LocumListComponent implements OnInit {
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
    this.fetchRecords();
    this.fetchDepartments();
  }

  back_btn(){
    this.router.navigate([this.previous]);
  }

  view_request(id:any){
    this.loadingService.showloading();
    this.router.navigate(['generics/locum-attendance', id])
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

  fetchRecords(page:number=1, query='') {
    this.loadingService.showloading();
    const params = {
      "page":page,
      "q":query
    };
    this.administrationService.getrecords(locum_url, params).subscribe((res) => {
      this.records = res;
      this.loadingService.hideloading();
    });
  }

  fetchDetailRecord(request_id:any) {
    this.loadingService.showloading();
    const params = {
      "request_id": request_id
    };
    this.administrationService.getrecords(locum_url, params).subscribe((res) => {
      this.record = res;
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


}
