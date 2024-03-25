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

export class DetailRequestComponent implements OnInit {
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
  request_id: any;
  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public sweetalertService: SweetalertService, private route: ActivatedRoute,) {
    this.selectedRow = [];
    this.createRecordForm = this.formBuilder.group({
      subject: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      department: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      content: new FormControl('',),
    });
    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      employee_no: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      position: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      purpose: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      route: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      departure_date: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      return_date: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      accommodation: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      visa_required_date: new FormControl('',),
    });
    this.AssignRecordForm = this.formBuilder.group({
      quote: new FormControl('', Validators.compose([Validators.required])),
      staff: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    });
    this.closeRecordForm = this.formBuilder.group({
      quote: new FormControl('', Validators.compose([Validators.required])),
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
    this.dtOptions = {
      pagingType: 'full_numbers',
       pageLength: 10,
      //  destroy: true,
      retrieve: true,
      lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
    };
    // this.fetchRecords();
    // this.fetchDepartments();
    // this.fetch_users_with_role();
    // this.fetch_wards();
    // this.fetch_directorates();
    // this.fetch_sub_categories();
    // this.fetchOverseers();
  }

  back_btn(){
    this.router.navigate([this.previous]);
    // this.router.navigate(['quotes/list']);
  }

  destroyTable(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
    });
  }
  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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

  set_request_id(request_id:any){
    this.AssignRecordForm.patchValue({"quote":request_id})
    this.closeRecordForm.patchValue({"quote":request_id})
  }

  



  fetchRecords(request_id:any) {
    this.loadingService.showloading();
    const params = {
      "request_id": request_id
    };
    this.administrationService.getrecords(traveler_url, params).subscribe((res) => {
      this.records = res;
      this.loadingService.hideloading();

    });
  }

  editRecord(index:any) {
    delete this.records?.trip?.id;
    let combined = {...this.records, ...this.records?.trip}
    this.editRecordForm.patchValue(combined);

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
          this.administrationService.deleterecord(traveler_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');
            this.fetchRecords(this.request_id);
          });
        }
      });

  }

  saveEditChanges() {
    // console.log(this.editRecordForm.value)
    if (this.editRecordForm.invalid) {
      this.administrationService.markFormAsDirty(this.editRecordForm);
      this.toastService.showToastNotification('error', 'Invalid form', 'Error')
    } else {
      
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating request?').then((res) => {
        if (res) {
          const payload = this.editRecordForm.value

          // this.destroyTable();
          this.loadingService.showloading();
          this.administrationService.updaterecord(traveler_url, payload).subscribe((data) => {
            if (data) {
              this.fetchRecords(this.request_id);
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
                this.fetchRecords(this.request_id);
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
              this.fetchRecords(this.request_id);
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

  update_request_status(status:any,request_id:any){
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating request?').then((res) => {
        if (res) {
          const payload = {
            "traveler_id": request_id,
            "status": status,
          }
          this.loadingService.showloading();
          this.administrationService.patchrecord(traveler_url, payload).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              // this.AssignRecordForm.reset();
              this.sweetalertService.showAlert('Success', 'Request Updated Successfully', 'success');
              this.fetchRecords(this.request_id);
              // this.assignModal.hide()

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
      // formData.append('comparative_analysis', this.fileData2);
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
                this.fetchRecords(this.request_id);
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
