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
  requests_report_url,
  quote_url,
  serverurl,
  users_with_role_url

} from '../../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { AdministrationService } from 'src/app/administration/services/administration.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-view-quote',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class QuoteReportComponent implements OnInit {
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
    this.selectedRow = [];
    this.createRecordForm = this.formBuilder.group({
      subject: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      department: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      content: new FormControl('',),
    });
    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      subject: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      department: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      content: new FormControl('',),
    });
    this.AssignRecordForm = this.formBuilder.group({
      quote: new FormControl('', Validators.compose([Validators.required])),
      staff: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
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
    // this.fetch_users_with_role();
    // this.fetch_wards();
    // this.fetch_directorates();
    // this.fetch_sub_categories();
    // this.fetchOverseers();
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

  view_requests(id:any){
    this.loadingService.showloading();
    this.router.navigate(['requests/view', id])
  }
  
  assign_role() {
    console.log(this.selectedRow);
  }

  openPopup(content:any, type:any) {

    this.ngbModal.open(content);

  }

  closeAllPopups() {
    this.modalRef.close();

  }
  resetForm() {
    this.createRecordForm.reset();
    this.formSubmitted = false;
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
      const x = {"TRAVEL ID": record?.tid, "DEPARTMENT": record?.department?.name, "TYPE": record?.type_of_travel, "PURPOSE": record?.purpose, "TRANSPORT": record?.mode_of_transport, "STATUS": record?.status, "DEPARTURE": record?.trip?.departure_date,"RETURN": record?.trip?.return_date, "SUBMITTED BY": this.set_names(record?.created_by), "DATE SUBMITTED": this.format_date(record?.date_created), "DATE CLOSED": this.format_date(record?.date_closed), "CLOSED BY": this.set_closed_names(record?.assignee, record?.status)};
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
      "status": this.status,
    };
    this.administrationService.getrecords(requests_report_url, params).subscribe((res) => {
      this.records = res;
      // this.destroyTable();
      // if (res.length > 0){
      //   this.dtTrigger.next(res)
      // } 
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
    const record = this.records[index]
    this.editRecordForm.patchValue(record);
    this.editRecordForm.patchValue({
      'department':record?.department?.id,  
    });

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
          this.destroyTable();
          this.loadingService.showloading();
          this.administrationService.deleterecord(quote_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');
            this.fetchRecords();
          });
        }
      });

  }


  viewDocumentTypes(request_id:any) {
    this.router.navigate(['administration/document-type-listing', request_id]);

  }
  saveEditChanges() {
    console.log(this.editRecordForm.value)
    if (this.editRecordForm.invalid) {
      this.administrationService.markFormAsDirty(this.editRecordForm);
    } else {
      
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating record?').then((res) => {
        if (res) {
          const payload = this.editRecordForm.value
          const formData  =  new FormData();
          formData.append('documents', this.fileData);
          formData.append('payload', JSON.stringify(payload));

          this.destroyTable();
          this.loadingService.showloading();
          this.administrationService.updaterecord(quote_url, formData).subscribe((data) => {
            if (data) {
              this.fetchRecords();
              this.toastService.showToastNotification('success', 'Successfully Updated', '');
              this.editRecordForm.reset();
              this.editModal.hide();
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
  handleFileupload2(e:any) {
    this.fileData2 = e.target.files[0];
  }

  create_quote() {

    if (this.createRecordForm.valid) {

      const payload = this.createRecordForm.value
      const formData  =  new FormData();
      formData.append('documents', this.fileData);
      formData.append('payload', JSON.stringify(payload));

      
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed creating record?').then((res) => {
        if (res) {
          this.loadingService.showloading();
            this.administrationService.postrecord(quote_url, formData).subscribe((res) => {
              if (res) {
                this.loadingService.hideloading();
                this.createRecordForm.reset();
                this.sweetalertService.showAlert('Success', 'Quote Created Successfully', 'success');
                this.fetchRecords();
                this.createModal.hide()

              } else {
                this.loadingService.hideloading();
              }
            });
          }
        });

    } else {
      this.toastService.showToastNotification('error', 'Omitted Fields Required ', 'Error');
      this.administrationService.markFormAsDirty(this.createRecordForm);

    }
  }

  assign_quote() {

    if (this.AssignRecordForm.valid) {

      const payload = this.AssignRecordForm.value

      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed assigning quote?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(assign_quote_url, payload).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              this.AssignRecordForm.reset();
              this.sweetalertService.showAlert('Success', 'Quote Assigned Successfully', 'success');
              this.fetchRecords();
              this.assignModal.hide()

            } else {
              this.loadingService.hideloading();
            }
          });
        }
      });


    } else {
      this.toastService.showToastNotification('error', 'Omitted Fields Required ', 'Error');
      this.administrationService.markFormAsDirty(this.AssignRecordForm);
    }
  }

  update_quote_status(status:any,quote_id:any){
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating quote?').then((res) => {
        if (res) {
          const payload = {
            "quote_id": quote_id,
            "status": status,
          }
          this.loadingService.showloading();
          this.administrationService.patchrecord(quote_url, payload).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              this.AssignRecordForm.reset();
              this.sweetalertService.showAlert('Success', 'Quote Updated Successfully', 'success');
              this.fetchRecords();
              this.assignModal.hide()

            } else {
              this.loadingService.hideloading();
            }
          });
        }
      });
  }

  close_quote() {

    if (this.closeRecordForm.valid) {

      const payload = this.closeRecordForm.value
      const formData  =  new FormData();
      formData.append('quote', this.fileData);
      formData.append('comparative_analysis', this.fileData2);
      formData.append('payload', JSON.stringify(payload));

      
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed closing record?').then((res) => {
        if (res) {
          this.loadingService.showloading();
            this.administrationService.postrecord(close_quote_url, formData).subscribe((res) => {
              if (res) {
                this.loadingService.hideloading();
                this.closeRecordForm.reset();
                this.sweetalertService.showAlert('Success', 'Quote Closed Successfully', 'success');
                this.fetchRecords();
                this.closeModal.hide()

              } else {
                this.loadingService.hideloading();
              }
            });
          }
        });

    } else {
      this.toastService.showToastNotification('error', 'Omitted Fields Required ', 'Error');
      this.administrationService.markFormAsDirty(this.closeRecordForm);

    }
  }


}
