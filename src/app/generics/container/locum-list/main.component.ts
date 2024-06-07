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
  }

  back_btn(){
    this.router.navigate([this.previous]);
  }

  view_request(employee_id:any,recruit_id:any){
    this.loadingService.showloading();
    this.router.navigate(['generics/locum-attendance', employee_id,recruit_id])
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

}
