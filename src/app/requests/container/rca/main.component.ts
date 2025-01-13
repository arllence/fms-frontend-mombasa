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
  upload_budget_approval_url,
  serverurl,
  incident_url,
  get_user_roles_url,
  hired_url,
  list_staff_url,
  assign_url,
  notes_url

} from '../../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { AdministrationService } from '../../../administration/services/administration.service';
@Component({
  selector: 'app-view-quote',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class RcaDetailRequestComponent implements OnInit {
  public createRecordForm: FormGroup;
  public noteForm: FormGroup;
  public assignForm: FormGroup;
  public closeForm: FormGroup;
  public ReplacementForm: FormGroup;
  public BudgetApprovalForm: FormGroup;
  validation_messages: any;
  formSubmitted = false;
  tenant_tag: string;

  fileData: File;
  formData  =  new FormData();
  serverurl = serverurl

  private modalRef: NgbModalRef;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('noteModal') public noteModal: ModalDirective;
  @ViewChild('closeModal') public closeModal: ModalDirective;
  @ViewChild('assignModal') public assignModal: ModalDirective;
  records: any = [];
  searchString: string;
  previous: string | null;
  departments: any;
  users: any;
  request_id: any;
  text: any;
  record_id: any;
  roles: any;
  employees: any = [];
  employee_id: any;
  notes: any;


  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public sweetalertService: SweetalertService, private route: ActivatedRoute,) {

    this.createRecordForm = this.formBuilder.group({
      subject: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      department: new FormControl('', Validators.compose([Validators.required])),
      content: new FormControl('',),
    });

    this.assignForm = this.formBuilder.group({
      request_id: new FormControl('', Validators.compose([Validators.required])),
      assign_to: new FormControl('', Validators.compose([Validators.required])),
      comment: new FormControl('', ),
    });

    this.noteForm = this.formBuilder.group({
      request_id: new FormControl('', Validators.compose([Validators.required])),
      comments: new FormControl('', Validators.compose([Validators.required]))
    });

    this.closeForm = this.formBuilder.group({
      request_id: new FormControl('', Validators.compose([Validators.required])),
      comments: new FormControl('', ),
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
    this.fetchRoles();
    this.fetchNotes();
  }

  back_btn(){
    this.router.navigate([this.previous]);
  }

  resetForm() {
    this.createRecordForm.reset();
    this.formSubmitted = false;
  }

  assign_incident(request_id:any){
    this.assignForm.patchValue({"request_id":request_id});
    this.assignModal.show();
    this.fetchUsers();
  }

  set_add_note(request_id:any){
    this.noteForm.patchValue({"request_id":request_id});
    this.noteModal.show()
  }

  // set_update_request_status(status:any,request_id:any){
  //   this.noteForm.patchValue({"recruit_id":request_id, "status":status});
  //   this.noteModal.show();
  // }

  set_close_request_status(request_id:any){
    this.closeForm.patchValue({"request_id":request_id});
    this.closeModal.show();
  }


  fetchRecords(request_id:any) {
    this.loadingService.showloading();
    const params = {
      "request_id": request_id
    };
    this.administrationService.getrecords(incident_url, params).subscribe((res:any) => {
      this.records = res;
      this.loadingService.hideloading();
    });
  }

  fetchUsers() {
    const search_payload = {
      'username': ''
    };
    this.loadingService.showloading();
    this.administrationService.getrecords(list_staff_url, search_payload).subscribe((res) => {
      if (res) {
        this.users = res;
        this.loadingService.hideloading();
      }

    });
  }

  fetchNotes() {
    const payload = {
      "request_id": this.request_id
    };
    // this.loadingService.showloading();
    this.administrationService.getrecords(notes_url, payload).subscribe((res) => {
      if (res) {
        this.notes = res;
        // this.loadingService.hideloading();
      }

    });
  }


  fetchRoles() {
    this.loadingService.showloading();
    const params = {
    };
    this.administrationService.getrecords(get_user_roles_url, params).subscribe((res:any) => {
      this.roles = res?.group_name;
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
          this.administrationService.deleterecord(incident_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');
            this.fetchRecords(this.request_id);
          });
        }
      });

  }

  handleFileupload(e:any) {
    this.fileData = e.target.files[0];
  }
 
  assign() {
    if (this.assignForm.valid) {

      let payload = this.assignForm.value

      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed assigning incident?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(assign_url, payload).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              this.assignForm.reset();
              this.sweetalertService.showAlert('Success', 'Operation Successful', 'success');
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
      this.administrationService.markFormAsDirty(this.assignForm);
      console.log(this.assignForm.value)
    }
  }

  add_note() {
    if (this.noteForm.valid) {

      const payload = this.noteForm.value

      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed adding note?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(notes_url, payload).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              this.noteForm.reset();
              this.fetchNotes();
              this.sweetalertService.showAlert('Success', 'Operation Successful', 'success');
              this.noteModal.hide()
            } else {
              this.loadingService.hideloading();
            }
          });
        }
      });

    } else {
      this.toastService.showToastNotification('error', 'Omitted Fields Required ', 'Error');
      this.administrationService.markFormAsDirty(this.noteForm);
      console.log(this.noteForm.value)
    }
  }

  close_incident() {

    const payload = this.closeForm.value

    this.sweetalertService.showConfirmation('Confirmation',
    'Do you wish to proceed marking incident as Closed?').then((res) => {
      if (res) {
        this.loadingService.showloading();
        this.administrationService.patchrecord(incident_url, payload).subscribe((res) => {
          if (res) {
            this.loadingService.hideloading();
            this.sweetalertService.showAlert('Success', 'Closed Successfully', 'success');
            this.fetchRecords(this.request_id);
            this.fetchNotes();
            this.closeForm.reset();
            this.closeModal.hide();
          } else {
            this.loadingService.hideloading();
          }
        });
      }
    });
  }



}
