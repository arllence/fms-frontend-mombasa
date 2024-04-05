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
  assign_quote_url,
  close_quote_url,
  department_url,
  process_travel_request_url,
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
  public processRecordForm: FormGroup;
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
  @ViewChild('processModal') public processModal: ModalDirective;
  @ViewChild('approveRequestModal') public approveRequestModal: ModalDirective;
  records: any = [];
  searchString: string;
  previous: string | null;
  departments: any;
  users: any;
  request_id: any;
  text: any;
  record_id: any;
  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public sweetalertService: SweetalertService, private route: ActivatedRoute,) {
    this.selectedRow = [];
    this.createRecordForm = this.formBuilder.group({
      subject: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      department: new FormControl('', Validators.compose([Validators.required])),
      content: new FormControl('',),
    });
    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      employee_no: new FormControl('', Validators.compose([Validators.required])),
      position: new FormControl('', Validators.compose([Validators.required])),
      purpose: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      route: new FormControl('', Validators.compose([Validators.required])),
      departure_date: new FormControl('', Validators.compose([Validators.required])),
      return_date: new FormControl('', Validators.compose([Validators.required])),
      accommodation: new FormControl('', Validators.compose([Validators.required])),
      salary_advance_required: new FormControl('', Validators.compose([Validators.required])),
      salary_amount_required: new FormControl(0, ),
      visa_required_date: new FormControl('',),
    });
    this.AssignRecordForm = this.formBuilder.group({
      traveler: new FormControl('', Validators.compose([Validators.required])),
      budget_code: new FormControl('', Validators.compose([Validators.required])),
    });
    this.processRecordForm = this.formBuilder.group({
      traveler: new FormControl('', Validators.compose([Validators.required])),
      travel_order_no: new FormControl('', Validators.compose([Validators.required])),
      bill_settlement: new FormControl('', Validators.compose([Validators.required])),
      ticket_cost: new FormControl('',),
      airline: new FormControl('',),
      travel_agent: new FormControl('',),
      hotel_name: new FormControl('',),
      charge_per_day: new FormControl('',),
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
    this.AssignRecordForm.patchValue({"traveler":request_id})
    this.processRecordForm.patchValue({"traveler":request_id})
  }

  set_cash_office(status:any,record_id:any){
    this.record_id = record_id
  }
  send_cash_office(){
    this.approve_as("CASH_OFFICE",this.record_id)
  }


  fetchRecords(request_id:any) {
    this.loadingService.showloading();
    const params = {
      "request_id": request_id
    };
    this.administrationService.getrecords(traveler_url, params).subscribe((res:any) => {
      this.records = res;
      this.AssignRecordForm.patchValue({"budget_code":res?.budget_code, "traveler":res?.id})
      this.loadingService.hideloading();
    });
  }

  editRecord(index:any='') {
    delete this.records?.trip?.id;
    let combined = {...this.records, ...this.records?.trip}
    this.editRecordForm.patchValue(combined);
    this.editRecordForm.patchValue({"salary_amount_required": combined?.salary_advance?.amount});

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

  approve_request() {

    if (this.AssignRecordForm.valid) {

      const payload = this.AssignRecordForm.value

      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed approving request?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(approval_url, payload).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              this.AssignRecordForm.reset();
              this.sweetalertService.showAlert('Success', 'Request Approved Successfully', 'success');
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
      console.log(this.AssignRecordForm.value)
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

  approve_as(status:any,request_id:any){
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating request?').then((res) => {
        if (res) {
          const payload = {
            "traveler": request_id,
            "status": status,
            "text": this.text,
          }
          this.loadingService.showloading();
          this.administrationService.postrecord(approval_url, payload).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              this.sweetalertService.showAlert('Success', 'Request Updated Successfully', 'success');
              this.fetchRecords(this.request_id);
              this.approveRequestModal.hide()

            } else {
              this.loadingService.hideloading();
            }
          });
        }
      });
  }

  process_request() {

    if (this.processRecordForm.valid) {

      const form = this.processRecordForm.value
      const accommodation = {
        "hotel_name": form?.hotel_name,
        "charge_per_day": form?.charge_per_day,
      }
      const cost = {
        "ticket_cost": form?.ticket_cost,
        "airline": form?.airline,
        "travel_agent": form?.travel_agent,
      }
      const payload = {
        "cost": cost,
        "accommodation": accommodation,
        "travel_order_no": form?.travel_order_no,
        "bill_settlement_by": form?.bill_settlement,
        "traveler": form?.traveler,
      }
     
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed processing record?').then((res) => {
        if (res) {
          this.loadingService.showloading();
            this.administrationService.postrecord(process_travel_request_url, payload).subscribe((res) => {
              if (res) {
                this.loadingService.hideloading();
                this.processRecordForm.reset();
                this.sweetalertService.showAlert('Success', 'Processed Successfully', 'success');
                this.fetchRecords(this.request_id);
                this.processModal.hide()

              } else {
                this.loadingService.hideloading();
              }
            });
          }
        });

    } else {
      this.toastService.showToastNotification('error', 'Omitted Fields Required ', 'Error');
      this.administrationService.markFormAsDirty(this.processRecordForm);

    }
  }


}
