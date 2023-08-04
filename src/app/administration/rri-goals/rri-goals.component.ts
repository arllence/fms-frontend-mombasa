import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import {
  overseer_url,
  rri_goals_url,
   thematic_area_url,
   wave_url
} from '../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { Department } from '../interfaces/administration';
import { AdministrationService } from '../services/administration.service';
@Component({
  selector: 'app-rri-goals',
  templateUrl: './rri-goals.component.html',
  styleUrls: ['./rri-goals.component.scss']
})

export class RRIGoalsComponent implements OnInit {
  public createRecordForm: FormGroup;
  public editRecordForm: FormGroup;
  validation_messages: any;
  formSubmitted = false;
  tenant_tag: string;
  deletereferenceid: any;
  selectedRow: any;
  selectedAll: boolean = false;

  private modalRef: NgbModalRef;
  // @ViewChild(DataTableDirective, {static: false})
  // dtElement: DataTableDirective;
  // dtOptions: any = {};
  // public dtTrigger:any = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  records: Department[] = [];
  searchString: string;
  thematic_areas: [] = [];
  overseers: [] = [];
  waves: [] = [];
  members:any = [];
  member: any;
  previous: any;
  // is_normal_dt = false

  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public sweetalertService: SweetalertService) {
    this.selectedRow = [];
    this.createRecordForm = this.formBuilder.group({
      wave: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      goal: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      coach: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      results_leader: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      strategic_leader: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      team_leader: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      thematic_area: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      team_members: new FormControl(''),
    });
    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      goal: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      wave: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      coach: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      results_leader: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      strategic_leader: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      team_leader: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      thematic_area: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      team_members: new FormControl(''),
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
      ordering: true,
      searching: true,
      responsive: true,
      data: this.records,
    };

    // Trigger the DataTables rendering
    // this.dtTrigger.next(true);

    this.fetchRecords();
    this.fetchThematicAreas();
    this.fetchOverseers();
    this.fetch_waves();
    // this.rerenderTable()
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
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  selectRecord(event:any, recordinstance:any) {
    if (event.currentTarget.checked == true) {
      console.log('changed value' + event.currentTarget.checked);
      if (typeof (recordinstance) == 'undefined') {
        this.selectedAll = !this.selectedAll;
        this.selectedRow = [];
      } else {

        this.selectedRow.push(recordinstance);
      }
    } else {

      const selected_obj = recordinstance.id;
      const matchedIndex = this.selectedRow.map(function (obj:any) { return obj.id; }).indexOf(selected_obj);
      this.selectedRow.splice(matchedIndex, 1);


    }

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

  create_members(){

    this.members.push(this.member)

    this.member = ''; // Clear the ngModel variable
  }

  remove_member(index:any){
    this.members.splice(index, 1);
  }



  fetchRecords() {
    this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(rri_goals_url, params).subscribe((res) => {
      this.records = res;
      if (res.length > 0){
        this.dtTrigger.next(res)
      }  
      this.loadingService.hideloading();

    });
  }

  fetchThematicAreas() {
    this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(thematic_area_url, params).subscribe((res) => {
      this.thematic_areas = res;
      // this.loadingService.hideloading();
    });
  }

  fetchOverseers() {
    this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(overseer_url, params).subscribe((res) => {
      this.overseers = res;
      // this.loadingService.hideloading();
    });
  }

  fetch_waves() {
    this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(wave_url, params).subscribe((res) => {
      this.waves = res;
      // this.dtTrigger.next()
      // this.loadingService.hideloading();

    });
  }

  editRecord(objectinstance:any) {
    this.members = []
    const filter_params = {
      'request_id': objectinstance
    };
    this.administrationService.getrecords(rri_goals_url, filter_params).subscribe((res:any) => {
      const forminstance = {
        'id': res['id'],
        'goal': res['goal'],
        'coach': res['coach']['id'],
        'thematic_area': '',
        'results_leader': '',
        'strategic_leader':'',
        'team_leader': '',
        'wave': '',
        'team_members': '',
      };
      try {
        const wave = res['wave']['id']
        forminstance.wave = wave;
        forminstance.thematic_area = res['thematic_area']['id'];
        forminstance.results_leader = res['results_leader']['id'];
        forminstance.strategic_leader =  res['strategic_leader']['id'];
        forminstance.team_leader =  res['team_leader']['id'];    
        if ( res['team_members']){
          this.members = res['team_members']
        }
      } catch (error) {
        
      }
      this.editRecordForm.setValue(forminstance);
      this.editModal.show();
    });
  }
  deleteInstanceRecord() {
    const filter_params = {
      'request_id': this.deletereferenceid
    };
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting record? This process is irreversible').then((res) => {
        if (res) {
          this.destroyTable();
          this.administrationService.deleterecord(rri_goals_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');
            this.deleteModal.hide();
            this.fetchRecords();
          });
        }
      });

  }

  deleteRecord(objectinstance:any) {
    this.deletereferenceid = objectinstance;
    this.deleteModal.show();
  }
  createRecord() {
    this.createRecordForm.patchValue({"team_members" : this.members})
    if (this.createRecordForm.invalid) {
      this.formSubmitted = true;
      this.toastService.showToastNotification('error',
        'Marked input(s) are required', '');
      this.administrationService.markFormAsDirty(this.createRecordForm)

    } else {
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed creating record?').then((res) => {
        if (res) {
          this.destroyTable();
          const payload =  this.createRecordForm.value
          this.loadingService.showloading();
          this.administrationService.postrecord(rri_goals_url, payload).subscribe((data) => {
            if (data) {
              this.fetchRecords();
              this.toastService.showToastNotification('success', 'Successfully Created', '');
              this.createRecordForm.reset();
              this.createModal.hide();
              this.members = []
              this.loadingService.hideloading();
            }

          });

        }
      });

    }
  }

  viewDocumentTypes(request_id:any) {
    this.router.navigate(['administration/document-type-listing', request_id]);

  }
  saveEditChanges() {
    this.editRecordForm.patchValue({"team_members" : this.members})
    if (this.editRecordForm.invalid) {
      this.formSubmitted = true;
      this.administrationService.markFormAsDirty(this.editRecordForm);
      this.toastService.showToastNotification('error', 'Marked input(s) are required', '');

    } else {
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating record?').then((res) => {
        if (res) {
          this.destroyTable();
          const payload = {
            'request_id': this.editRecordForm.get('id')!.value,
            'goal': this.editRecordForm.get('goal')!.value,
            'coach': this.editRecordForm.get('coach')!.value,
            'thematic_area': this.editRecordForm.get('thematic_area')!.value,
            'wave': this.editRecordForm.get('wave')!.value,
            'strategic_leader': this.editRecordForm.get('strategic_leader')!.value,
            'results_leader': this.editRecordForm.get('results_leader')!.value,
            'team_leader': this.editRecordForm.get('team_leader')!.value,
            'team_members': this.editRecordForm.get('team_members')!.value,
          };
          this.administrationService.updaterecord(rri_goals_url, payload).subscribe((data) => {
            if (data) {
              this.fetchRecords();
              this.toastService.showToastNotification('success', 'Successfully Updated', '');
              this.editRecordForm.reset();
              this.editModal.hide();
              this.members = []
            }

          });
        }
      });

    }
  }


}
