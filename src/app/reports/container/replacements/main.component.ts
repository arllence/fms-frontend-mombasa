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
  users_with_role_url,
  replacement_report_url

} from '../../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { AdministrationService } from 'src/app/administration/services/administration.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-transport-report',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class ReplacementsReportComponent implements OnInit {
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
  department: string = '';
  date_from: string = '';
  date_to: string = '';
  status: string = '';
  


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
    this.fetchDepartments();
  }

  back_btn(){
    this.router.navigate([this.previous]);
  }

  view_requests(id:any){
    this.loadingService.showloading();
    this.router.navigate(['requests/view', id])
  }
  

  set_quote_id(quote_id:any){
    this.AssignRecordForm.patchValue({"quote":quote_id})
    this.closeRecordForm.patchValue({"quote":quote_id})
  }

  set_names(user:any, status:any='', closed=false){
    if (user?.first_name){
      return user?.first_name + ' ' + user?.last_name
    } 
    return ""
  }
  set_closed_names(user:any, status:any){
    if (status == 'CLOSED'){
      if (user?.first_name){
        return user?.first_name + ' ' + user?.last_name
      } 
    }
    return ""
  }

  format_date(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        // timeZoneName: 'short'
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  download_report(){

    this.loadingService.showloading();
    let xlsx_data = []
    for(let record of this.records){
      const x = {"QUOTE ID": record?.qid, "DEPARTMENT": record?.department?.name, "SUBJECT": record?.subject, "STATUS": record?.status, "SUBMITTED BY": this.set_names(record?.uploader), "DATE SUBMITTED": this.format_date(record?.date_created), "DATE CLOSED": this.format_date(record?.date_closed), "TAT": record?.tat, "ASSIGNED TO": this.set_names(record?.assignee), "CLOSED BY": this.set_closed_names(record?.assignee, record?.status)};
      xlsx_data.push(x)
    }
    // console.log(xlsx_data);

    let file_name = "SRRS-EXPORT.xlsx";


    this.downloadExcel(xlsx_data, file_name);
    this.loadingService.hideloading();
  }


  downloadExcel(data:any, file_name:any) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, file_name);
  }



  fetchRecords() {
    this.loadingService.showloading();
    const params = {
      "department": this.department,
      "date_from": this.date_from,
      "date_to": this.date_to,
    };
    this.administrationService.getrecords(replacement_report_url, params).subscribe((res) => {
      this.records = res;
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
