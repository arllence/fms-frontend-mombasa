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
  serverurl,
  incident_url,
  get_user_roles_url,
  list_staff_url,
  assign_url,
  notes_url,
  rca_url

} from '../../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { AdministrationService } from '../../../administration/services/administration.service';
@Component({
  selector: 'app-rca',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class RcaDetailRequestComponent implements OnInit {
  public createRecordForm: FormGroup;
  public rcaForm: FormGroup;
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
  is_editing: boolean = false;


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

    this.rcaForm = this.formBuilder.group({
      request_id: ['', Validators.required],
      generalInformation: this.formBuilder.group({
        whatHappened: this.formBuilder.group({
          details: ['', Validators.required],
          findings: ['', Validators.required],
          cause: ['', Validators.required],
          action: ['', Validators.required]
        }),
        detailsOfWhatHappened: this.formBuilder.group({
          details: ['', Validators.required],
          findings: ['', Validators.required],
          cause: ['', Validators.required],
          action: ['', Validators.required]
        }),
        whenItHappened: this.formBuilder.group({
          details: ['', Validators.required],
          findings: ['', Validators.required],
          cause: ['', Validators.required],
          action: ['', Validators.required]
        }),
        whenIsImpacted: this.formBuilder.group({
          details: ['', Validators.required],
          findings: ['', Validators.required],
          cause: ['', Validators.required],
          action: ['', Validators.required]
        }),
        whyItHappened: this.formBuilder.group({
          details: ['', Validators.required],
          steps: ['', Validators.required],
          findings: ['', Validators.required],
          cause: ['', Validators.required],
          action: ['', Validators.required]
        }),
        proximateFactors: this.formBuilder.group({
          details: ['', Validators.required],
          steps: ['', Validators.required],
          findings: ['', Validators.required],
          cause: ['', Validators.required],
          action: ['', Validators.required]
        }),
        humanFactors: this.formBuilder.group({
          details: ['', Validators.required],
          findings: ['', Validators.required],
          cause: ['', Validators.required],
          action: ['', Validators.required]
        }),
        equipmentFactors: this.formBuilder.group({
          details: ['', Validators.required],
          findings: ['', Validators.required],
          cause: ['', Validators.required],
          action: ['', Validators.required]
        }),
        controllableEnvironmentFactors: this.formBuilder.group({
          details: ['', Validators.required],
          findings: ['', Validators.required],
          cause: ['', Validators.required],
          action: ['', Validators.required]
        }),
        uncontrollableEnvironmentFactors: this.formBuilder.group({
          details: ['', Validators.required],
          findings: ['', Validators.required],
          cause: ['', Validators.required],
          action: ['', Validators.required]
        }),
        otherFactors: this.formBuilder.group({
          details: ['', Validators.required],
          findings: ['', Validators.required],
          cause: ['', Validators.required],
          action: ['', Validators.required]
        }),
        otherAreasImpacted: this.formBuilder.group({
          details: ['', Validators.required],
          findings: ['', Validators.required],
          cause: ['', Validators.required],
          action: ['', Validators.required]
        }),
        humanResourceIssues: this.formBuilder.group({
          staffQualificationsCompetence: ['', Validators.required],
          actualVsIdealStaffing: ['', Validators.required],
          contingencyStaffingPlans: ['', Validators.required],
          staffPerformanceOperantProcesses: ['', Validators.required],
          orientationInServiceTrainingImprovement: ['', Validators.required],
        }),
        informationManagement: this.formBuilder.group({
          informationAvailability: ['', Validators.required],
          communicationAdequacy: ['', Validators.required],
        }),
        environmentalManagementIssues: this.formBuilder.group({
          physicalEnvironmentAppropriateness: ['', Validators.required],
          environmentalRiskIdentificationSystems: ['', Validators.required],
          emergencyFailureModeResponses: ['', Validators.required],
        }),
        leadershipIssues: this.formBuilder.group({
          details: ['', Validators.required],
          findings: ['', Validators.required],
          cause: ['', Validators.required],
          action: ['', Validators.required]
        }),
        encouragementOfCommunication: this.formBuilder.group({
          details: ['', Validators.required],
          findings: ['', Validators.required],
          cause: ['', Validators.required],
          action: ['', Validators.required]
        }),
        clearCommunicationOfPriorities: this.formBuilder.group({
          details: ['', Validators.required],
          findings: ['', Validators.required],
          cause: ['', Validators.required],
          action: ['', Validators.required]
        }),
        uncontrollableFactors: this.formBuilder.group({
          details: ['', Validators.required],
          findings: ['', Validators.required],
          cause: ['', Validators.required],
          action: ['', Validators.required]
        }),
      }),

    });

  

    let request_id = this.route.snapshot.paramMap.get('id');
    if (request_id){
      this.request_id = request_id
      this.fetchRecords(request_id);  
      this.rcaForm.patchValue({"request_id": request_id})
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
    this.administrationService.getrecords(notes_url, payload).subscribe((res) => {
      if (res) {
        this.notes = res;
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

  create_request() {
    if (this.rcaForm.valid) {

      const payload = this.rcaForm.value

      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed submitting data?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(rca_url, payload).subscribe((res) => {
            if (res) {
              this.loadingService.hideloading();
              this.rcaForm.reset();
              this.fetchRecords(this.request_id)
              this.sweetalertService.showAlert('Success', 'Operation Successful', 'success');
            } else {
              this.loadingService.hideloading();
            }
          });
        }
      });

    } else {
      this.toastService.showToastNotification('error', 'Omitted Fields Required ', 'Error');
      this.administrationService.markFormAsDirty(this.noteForm);
      console.log(this.rcaForm.value)
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
