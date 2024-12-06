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
  incident_url,
  users_with_role_url,
  sub_departments_url,
  ohc_url,
  generic_ohc_url,
  generic_sub_departments_url,
  generic_departments_url,
  generic_incident_url

} from '../../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { AdministrationService } from 'src/app/administration/services/administration.service';
@Component({
  selector: 'app-view-quote',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class IncidentRequestComponent implements OnInit {
  public createRecordForm: FormGroup;
  public editRecordForm: FormGroup;
  public AssignRecordForm: FormGroup;
  public closeRecordForm: FormGroup;
  public ReplacementForm: FormGroup;

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
      type_of_incident: new FormControl('', Validators.compose([Validators.required])),
      priority: new FormControl('', Validators.compose([Validators.required])),
      department: new FormControl('', Validators.compose([Validators.required])),
      location: new FormControl('', Validators.compose([Validators.required])),
      affected_person_name: new FormControl('', Validators.compose([Validators.required])),
      person_affected: new FormControl('', Validators.compose([Validators.required])),
      date_of_incident: new FormControl('', Validators.compose([Validators.required])),
      time_of_incident: new FormControl('', Validators.compose([Validators.required])),
      type_of_issue: new FormControl('', Validators.compose([Validators.required])),
      subject: new FormControl('', Validators.compose([Validators.required])),
      message: new FormControl('', Validators.compose([Validators.required])),
      ks_number: new FormControl('', ),
      affected_person_phone: new FormControl('',),
      ohc: new FormControl('',),
      name: new FormControl('',),
      email: new FormControl('',),
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
    this.loadingService.hideloading();
    this.fetchDepartments();
    this.fetch_sub_departments();
    this.fetch_ohcs();
  }

  back_btn(){
    this.router.navigate([this.previous]);
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
      this.createRecordForm.patchValue({"ohc":''})
    }
  }



  fetchDepartments() {
    const params = {};
    this.administrationService.getrecords(generic_departments_url, params).subscribe((res) => {
      this.departments = res;
    });
  }

  fetch_sub_departments() {
    const params = {};
    this.administrationService.getrecords(generic_sub_departments_url, params).subscribe((res) => {
      this.sub_departments = res;
    });
  }

  fetch_ohcs() {
    const params = {};
    this.administrationService.getrecords(generic_ohc_url, params).subscribe((res) => {
      this.ohcs = res;
    });
  }

  handleFileupload(e:any) {
    this.fileData = e.target.files[0];
  }


  create_request() {

    if (this.createRecordForm.valid) {

      const payload = this.createRecordForm.value

      this.formData.append('attachments', this.fileData);
      this.formData.append('payload', JSON.stringify(payload));

      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed submitting request?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.processing = true;
            this.administrationService.postrecord(generic_incident_url, this.formData).subscribe((res) => {
              if (res) {
                this.loadingService.hideloading();
                this.createRecordForm.reset();
                this.sweetalertService.showAlert('Success', 'Submitted Successfully', 'success');
                this.router.navigate(['generic/home'])
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
