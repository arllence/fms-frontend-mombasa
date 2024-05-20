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
  forward_travel_request_url,
  upload_budget_approval_url,
  quote_url,
  serverurl,
  recruit_url,
  update_budget_code_url,
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
  public rejectForm: FormGroup;
  public approveForm: FormGroup;
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
  formData  =  new FormData();
  serverurl = serverurl

  private modalRef: NgbModalRef;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('rejectModal') public rejectModal: ModalDirective;
  @ViewChild('approveModal') public approveModal: ModalDirective;
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
  send_to: any = '';
  is_ceo_forwarded: boolean = false;
  is_hof_forwarded: boolean = false;
  is_hod_forwarded: boolean = false;
  is_slt_forwarded: boolean = false;
  is_transport_forwarded: boolean = false;
  is_cash_office_forwarded: boolean = false;
  is_administrator_forwarded: boolean = false;

  transaction_code:any = '';
  amount:any = 0;
  disbursement_type:any = '';

  date_of_travel:any = ''
  vehicle_number_plate:any = ''



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

    this.approveForm = this.formBuilder.group({
      request_id: new FormControl('', Validators.compose([Validators.required])),
      comments: new FormControl('', Validators.compose([Validators.required])),
    });

    this.processRecordForm = this.formBuilder.group({
      traveler: new FormControl('', Validators.compose([Validators.required])),
      bill_settlement: new FormControl('', Validators.compose([Validators.required])),
      ticket_cost: new FormControl('',),
      airline: new FormControl('',),
      travel_agent: new FormControl('',),
      hotel_name: new FormControl('',),
      charge_per_day: new FormControl(0,),
      number_of_days: new FormControl(0,),
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

  }

  back_btn(){
    this.router.navigate([this.previous]);
    // this.router.navigate(['quotes/list']);
  }


  resetForm() {
    this.createRecordForm.reset();
    this.formSubmitted = false;
  }

  set_send_to(to:any){
    this.send_to = to
  }

  set_request_id(request_id:any){
    // this.AssignRecordForm.patchValue({"request_id":request_id});
    this.processRecordForm.patchValue({"traveler":request_id});
  }
  approve_as(request_id:any){
    this.approveForm.patchValue({"request_id":request_id});
    this.approveModal.show()
  }



  fetchRecords(request_id:any) {
    this.loadingService.showloading();
    const params = {
      "request_id": request_id
    };
    this.administrationService.getrecords(recruit_url, params).subscribe((res:any) => {
      this.records = res;
      this.loadingService.hideloading();
    });
  }

  editRecord(record_id:any) {
    localStorage.setItem('record_id',record_id)
    this.router.navigate(['requests/list'])
  }


  deleteInstanceRecord(id:any) {
    const filter_params = {
      'request_id': id
    };
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting record? This process is irreversible').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.deleterecord(recruit_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');
            this.fetchRecords(this.request_id);
          });
        }
      });

  }


  handleFileupload(e:any) {
    this.fileData = e.target.files[0];
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

    if (this.approveForm.valid) {

      const payload = this.approveForm.value

      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed approving request?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(approval_url, payload).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              this.approveForm.reset();
              this.sweetalertService.showAlert('Success', 'Requisition Approved Successfully', 'success');
              this.fetchRecords(this.request_id);
              this.approveModal.hide()
            } else {
              this.loadingService.hideloading();
            }
          });
        }
      });

    } else {
      this.toastService.showToastNotification('error', 'Omitted Fields Required ', 'Error');
      this.administrationService.markFormAsDirty(this.approveForm);
      console.log(this.approveForm.value)
    }
  }

  update_budget_code() {

    if (this.AssignRecordForm.valid) {

      const payload = this.AssignRecordForm.value

      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating budget code?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(update_budget_code_url, payload).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              this.AssignRecordForm.reset();
              this.sweetalertService.showAlert('Success', 'Budget Code Updated Successfully', 'success');
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
          this.administrationService.patchrecord(recruit_url, payload).subscribe((res) => {
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

  

  forward_travel_request(send_to:any,request_id:any){
    this.send_to = send_to;
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed forwarding request?').then((res) => {
        if (res) {
          const payload = {
            "traveler": request_id,
            "send_to": send_to,
          }
          this.loadingService.showloading();
          this.administrationService.postrecord(forward_travel_request_url, payload).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              // this.AssignRecordForm.reset();
              this.sweetalertService.showAlert('Success', 'Request Forwarded Successfully', 'success');
              this.fetchRecords(this.request_id);
              // this.assignModal.hide()

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
        "number_of_days": form?.number_of_days,
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

      this.formData.append('ticket', this.fileData);
      this.formData.append('payload', JSON.stringify(payload));
     
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed processing record?').then((res) => {
        if (res) {
          this.loadingService.showloading();
            this.administrationService.postrecord(upload_budget_approval_url, this.formData).subscribe((res) => {
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
