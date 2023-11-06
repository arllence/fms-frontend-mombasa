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
  
  technical_leader: string;
  results_leader: any;
  strategic_leader: any;

  results_leaders: any = [];
  technical_leaders: any = [];
  strategic_leaders: any =[];

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
      results_leaders: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      technical_leaders: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      strategic_leaders: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      thematic_area: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      team_members: new FormControl(''),
    });
    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      goal: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      wave: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      results_leaders: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      technical_leaders: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      strategic_leaders: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
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
    if (this.member){
      this.members.push(this.member)

      this.member = ''; // Clear the ngModel variable
    }
    
  }
  remove_member(index:any){
    this.members.splice(index, 1);
  }

  create_results_leader(){

    this.results_leaders.push(this.results_leader)

    this.results_leader = ''; // Clear the ngModel variable
  }
  remove_results_leader(index:any){
    this.results_leaders.splice(index, 1);
  }

  create_technical_leaders(){

    this.technical_leaders.push(this.technical_leader)

    this.technical_leader = ''; // Clear the ngModel variable
  }
  remove_technical_leaders(index:any){
    this.technical_leaders.splice(index, 1);
  }

  create_strategic_leaders(){

    this.strategic_leaders.push(this.strategic_leader)

    this.strategic_leader = ''; // Clear the ngModel variable
  }
  remove_strategic_leaders(index:any){
    this.strategic_leaders.splice(index, 1);
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
    const goal:any = this.records[objectinstance]
    console.log(goal)
    
    if ( goal['team_members']){
      this.members = goal['team_members']
    }
    if ( goal['results_leaders']){
      this.results_leaders = goal['results_leaders']
    }
    if ( goal['technical_leaders']){
      this.technical_leaders = goal['technical_leaders']
    }
    if ( goal['strategic_leaders']){
      this.strategic_leaders = goal['strategic_leaders']
    }
       const forminstance = {
        'id': goal['id'],
        'goal': goal['goal'],
        'thematic_area': '',
        'results_leaders': '',
        'technical_leaders':'',
        'wave': '',
        'team_members': '',
        'strategic_leaders': ''
      };
      try {
        const wave =goal['wave']['id']
        forminstance.wave = wave;
        forminstance.thematic_area =goal['thematic_area']['id'];
        forminstance.results_leaders =goal['results_leaders'];
        forminstance.technical_leaders = goal['technical_leaders']; 
        forminstance.strategic_leaders = goal['strategic_leaders']; 
        forminstance.team_members = goal['team_members']; 
        
      } catch (error) {
        
      }
      if (goal['team_members']){
        this.members =goal['team_members']
      }
      if (goal['results_leaders']){
        this.results_leaders =goal['results_leaders']
      }
      if (goal['technical_leaders']){
        this.technical_leaders =goal['technical_leaders']
      }
      if (goal['strategic_leaders']){
        this.strategic_leaders =goal['strategic_leaders']
      }
      this.editRecordForm.patchValue(forminstance);
      this.editModal.show();
  }
  deleteInstanceRecord(id:any) {
    const filter_params = {
      'request_id': id
    };
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting record? This process is irreversible').then((res) => {
        if (res) {
          this.destroyTable();
          this.loadingService.showloading();
          this.administrationService.deleterecord(rri_goals_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');

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
    this.createRecordForm.patchValue({"technical_leaders" : this.technical_leaders})
    this.createRecordForm.patchValue({"results_leaders" : this.results_leaders})
    this.createRecordForm.patchValue({"strategic_leaders" : this.strategic_leaders})
    if (this.createRecordForm.invalid) {
      this.formSubmitted = true;
      this.toastService.showToastNotification('error',
        'Marked input(s) are required', '');
      this.administrationService.markFormAsDirty(this.createRecordForm)
      console.log(this.createRecordForm.value)

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
              this.technical_leaders = []
              this.results_leaders = []
              this.strategic_leaders = []
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
    this.create_members()
    this.editRecordForm.patchValue({"team_members" : this.members})
    this.editRecordForm.patchValue({"technical_leaders" : this.technical_leaders})
    this.editRecordForm.patchValue({"results_leaders" : this.results_leaders})
    this.editRecordForm.patchValue({"strategic_leaders" : this.strategic_leaders})
    if (false) {
      // this.formSubmitted = true;
      // this.administrationService.markFormAsDirty(this.editRecordForm);
      // this.toastService.showToastNotification('error', 'Marked input(s) are required', '');
      // console.log(this.editRecordForm.value)

    } else {
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating record?').then((res) => {
        if (res) {
          this.destroyTable();
          const payload = {
            'request_id': this.editRecordForm.get('id')!.value,
            'goal': this.editRecordForm.get('goal')!.value,
            'thematic_area': this.editRecordForm.get('thematic_area')!.value,
            'wave': this.editRecordForm.get('wave')!.value,
            'technical_leaders': this.editRecordForm.get('strategic_leaders')!.value,
            'results_leaders': this.editRecordForm.get('results_leaders')!.value,
            'strategic_leaders': this.editRecordForm.get('strategic_leaders')!.value,
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
