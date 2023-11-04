

import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
// import { approve_graduand_url, clear_gowns_picked_url, clear_graduand_url, delete_graduand_url, list_departmental_student_gowns_returned_url, list_departmental_student_gowns_url, list_department_graduands_url, list_department_url, list_graduands_url, list_staff_url, return_gowns_picked_url } from '../../../app.constants';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { UserList } from '../../../administration/interfaces/administration';
import { AdministrationService } from '../../../administration/services/administration.service';
import { achievements_url, list_staff_url, result_chain_url, rri_goals_url, serverurl, wards_url, weekly_reports_url, workplan_url,  } from '../../../app.constants';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class GoalReviewComponent implements OnInit {
  public createRecordForm: FormGroup;
  public createPercentageForm: FormGroup;
  public workplanForm: FormGroup;
  public workplanFormEdit: FormGroup;
  public weeklyReportcreateRecordForm: FormGroup;
  public weeklyReportForm: FormGroup;
  public rc_createRecordForm: FormGroup;
  public ResultChainForm: FormGroup;
  applicationForm: FormGroup;
  dtOptions: any = {};
  records = [];
  drecords = [];
  serverurl = serverurl
  payload:any = {}
  @ViewChild('clearanceModal') public clearanceModal: ModalDirective;
  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('viewAchievementModal') public viewAchievementModal: ModalDirective;
  @ViewChild('WorkplanModal') public WorkplanModal: ModalDirective;
  @ViewChild('createPercentageModal') public createPercentageModal: ModalDirective;
  @ViewChild('weeklyReportcreateModal') public weeklyReportcreateModal: ModalDirective;
  @ViewChild('WeeklyModal') public WeeklyModal: ModalDirective;
  fileData: File;
  fileDatas = [];
  myFiles: string[] = [];
  max_Length: any;
  goal_id: any;
  selected_lang: string = 'en';
  active = 1;
  previous: string | null;
  goal: any;
  step: any ;
  person_incharge: any;
  status: any;
  challenges: any;
  recommendations: any;
  steps:any = [];
  users = [];
  is_add: boolean = false;
  workplan_id: any;
  collaborators: any  = [];
  collaborator: any;
  is_workplan_edit: boolean = false;
  is_active_id: any = 'null';
  wards: any  = [];
  estate: any;
  ward: any;
  road: any;
  upload_status: any = '';
  file_url: any;
  file_type: any;
  achievement: any;
  is_view_file: boolean = false;
  explanation: any;
  workplans: any = [];
  milestone_activities: any = null;
  milestone_reports: any = [];
  percentage_completion = 0
  wr_is_add: boolean = false;
  activity: any ;
  rc_is_add: boolean = false;
  inputs: any = [];
  input: any;
  output: any;
  outputs: any = [];
  outcomes: any  = [];
  outcome: any;
  impacts: any = [];
  impact: null;
  description: null;
  metric: null;
  quantity: null;
  activities: any = [];
  viewing_item: any;

 

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 5) {
      changeEvent.preventDefault();
    }
  }
  changer(nav:any,id:any){
    nav.select(id);
  }

  
  constructor(private router: Router, private loadingService: LoadingService,
    public toastService: ToastService, public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    public sweetalertService: SweetalertService, private route: ActivatedRoute,) {

    
    let goal_id = this.route.snapshot.paramMap.get('goal_id');
    if (goal_id){
      this.goal_id = goal_id
      this.fetch_goal();  
       
      
    } 

    this.createRecordForm = this.formBuilder.group({
      thematic_area_id: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      upload_status: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    });

    this.createPercentageForm = this.formBuilder.group({
      request_id: new FormControl('', Validators.compose([Validators.required])),
      percentage: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)])),
    });

    this.workplanForm = this.formBuilder.group({
      start_date: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      end_date: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      budget: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      milestone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      rri_goal: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      steps: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      status: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      remarks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      risks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      collaborators: new FormControl('',),
      location: new FormControl('',),
    });

    this.weeklyReportcreateRecordForm = this.formBuilder.group({
      thematic_area_id: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      upload_status: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    });

    this.weeklyReportForm = this.formBuilder.group({
      workplan: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      activities: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    });

    this.rc_createRecordForm = this.formBuilder.group({
      thematic_area_id: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      upload_status: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    });

    this.ResultChainForm = this.formBuilder.group({
      rri_goal: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      activities: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      impact: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      input: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      outcome: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      output: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    });

    // BACK BUTTON
    let current_url = String(window.location.pathname )
    // console.log(current_url);
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
    this.filterusers();
    this.fetch_wards();
    this.fetch_workplans();
    this.ResultChainForm.patchValue({"rri_goal" : this.goal_id})  
  }

  ngAfterViewInit() {
    // console.log(this.submission.nativeElement.innerHTML);
  }

  back_btn(){
    console.log(this.previous)
      this.router.navigate([this.previous]);
    }


  fetch_goal() {
    const payload = {
      "request_id": this.goal_id
    };

    this.loadingService.showloading();
    this.administrationService.getrecords(rri_goals_url, payload).subscribe((res) => {
      if (res) {
        this.goal = res;
        this.loadingService.hideloading();
      }

    });
  }


  // WORKPLAN

  set_is_add(){
    this.is_add = !this.is_add;
  }
 
  fetch_wards() {
    this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(wards_url, params).subscribe((res) => {
      this.wards = res;
      this.loadingService.hideloading();

    });
  }
  set_is_active_id(id:any,target:any){
    if(id == this.is_active_id){
        this.is_active_id = 'null'
    } else {
      this.is_active_id = id
    }
  }

  filterusers() {
      const search_payload = {
        'username': "all"
      };
      this.loadingService.showloading();
      this.administrationService.getrecords(list_staff_url, search_payload).subscribe((res) => {
        if (res) {
          this.users = res;
          this.loadingService.hideloading();
        }

      });
  }

  set_workplan_id(id:any){
    this.workplan_id = id;
    this.createPercentageForm.patchValue({"request_id":id})
  }


  handleFileupload(e:any) {
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
  }

  create_steps(){
    const data = {
      "step": this.step,
      "person_incharge": this.person_incharge
    }
    this.steps.push(data)

    this.step = null;
    this.person_incharge = null;
  }

  remove_step(index:any){
    this.steps.splice(index, 1);
  }

  create_collaborators(){
    console.log(this.collaborator)
    this.collaborators.push(this.collaborator)
    this.collaborator = null;
  }

  remove_collaborators(index:any){
    this.collaborators.splice(index, 1);
  }

  set_workplan_edit(item:any){
    this.is_workplan_edit = true;
    this.set_workplan_id(item['id']);
    this.steps = item['steps']
    this.workplanForm.patchValue(item);
    if (item['collaborators']) {
      this.collaborators = item['collaborators']
    }

    try {
      this.ward = item['location']['ward']['id']
      this.estate = item['location']['estate']
      this.road = item['location']['road']
    } catch (error) {
      
    }
  }

  createPercentageRecord(){
    const payload = this.createPercentageForm.value;
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed ?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.patchrecord(workplan_url, payload).subscribe((res) => {
            if (res) {
              this.createPercentageForm.reset();
              this.fetch_goal();
              this.createPercentageModal.hide()
              this.loadingService.hideloading();
              this.toastService.showToastNotification('success', 'Successfully Created', '');
            }
          });
        }
      });
  }

  build_location(){
    const location = {
      "ward" : this.ward,
      "estate" : this.estate,
      "road": this.road
    }
    return location
  }

  delete_workplan(id:any) {
    const filter_params = {
      'request_id': id
    };
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting record? This process is irreversible').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.deleterecord(workplan_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');
            this.fetch_goal();
            this.fetch_workplans();
          });
        }
      });

  }

  edit_workplan() {
    if (this.steps.length == 0){
      this.toastService.showToastNotification('error', 'Add Milestone Activities !', '');
      this.loadingService.hideloading();
      return
    }
    this.workplanForm.patchValue({"steps":this.steps, "collaborators":this.collaborators,"rri_goal" : this.goal_id, "location": this.build_location()});
    let payload = this.workplanForm.value;
    payload['request_id'] = this.workplan_id;
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed submitting changes?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.updaterecord(workplan_url, payload).subscribe((res) => {
            if (res) {
              this.steps = []
              this.collaborators = []
              this.workplanForm.reset();
              this.fetch_goal();
              this.set_is_add();
              this.is_workplan_edit = false;
              this.loadingService.hideloading();
              this.toastService.showToastNotification('success', 'Successfully Updated', '');
            }
          });
        }
      });
  }

  save_workplan() {
    if (this.steps.length == 0){
      this.toastService.showToastNotification('error', 'Add Milestone Activities !', '');
      this.loadingService.hideloading();
      return
    }
    this.workplanForm.patchValue({"steps":this.steps, "collaborators":this.collaborators,"rri_goal" : this.goal_id, "location": this.build_location()});
    const payload = this.workplanForm.value;
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed submitting workplan?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(workplan_url, payload).subscribe((res) => {
            if (res) {
              this.steps = []
              this.workplanForm.reset();
              this.fetch_goal();
              this.set_is_add();
              this.fetch_workplans();
              this.loadingService.hideloading();
              this.toastService.showToastNotification('success', 'Successfully Created', '');
            }
          });
        }
      });
  }


  // WEEKLY REPORT

  set_wr_is_add(){
    this.wr_is_add = !this.wr_is_add;
  }
  set_milestone_activity(workplan_id:any){
    if (this.steps.length > 0){
      this.build_report()
    }
    this.weeklyReportForm.patchValue({"workplan": workplan_id});
    for (let workplan of this.workplans){
      if (workplan?.id == workplan_id ){
        this.milestone_activities = workplan?.steps;
        break;
      }
    }
    console.log(this.milestone_activities)
  }


  build_report(){
    if (this.steps.length > 0){
      this.weeklyReportForm.patchValue({"activities":this.steps});
      const payload = this.weeklyReportForm.value;
      this.milestone_reports.push(payload)
      this.weeklyReportForm.reset();
      this.steps = []
    }
    
  }
  

  fetch_workplans() {
    this.loadingService.showloading();
    const params = {
      "rri_goal": this.goal_id
    };
    this.administrationService.getrecords(workplan_url, params).subscribe((res) => {
      this.workplans = res;
      this.loadingService.hideloading();
    });
  }

  set_upload_status(status:any, thematic_area_id:any){
    this.upload_status = status;
    this.weeklyReportcreateRecordForm.patchValue({'upload_status': status, 'thematic_area_id':thematic_area_id})
  }

  view_files(achievement:any, upload_status:any){
    this.achievement = achievement;
    this.viewAchievementModal.show();
    this.is_view_file = false;
    this.upload_status = upload_status;
  }

  set_file_data(url:any, file_type:any){
    this.file_url = serverurl + url,
    this.file_type = file_type;
    this.is_view_file = true;
  }

  set_is_view_file(){
    this.is_view_file = !this.is_view_file
  }

  weeklyReport_create_steps(){
    if (!this.step){
      this.toastService.showToastNotification('error', 'All fields required!', '');
      return;
    }
    if (this.percentage_completion > 100){
      this.toastService.showToastNotification('error', 'Percentage completion cannot be greater than 100 !', '');
      return;
    }
    const step_obj = {
      "activity": this.step,
      "status": this.status,
      "challenges": this.challenges,
      "recommendations": this.recommendations,
      "explanation": this.explanation,
      "percentage_completion": this.percentage_completion,
    }
    this.steps.push(step_obj)

    this.step = null;
    this.status = null;
    this.challenges = null;
    this.recommendations = null;
    this.explanation = null;
    this.percentage_completion = 0;
  }

  weeklyReport_remove_step(index:any){
    this.steps.splice(index, 1);
  }

  save_achievements() {
    this.loadingService.showloading();
    const formData  =  new FormData();
    for (var i = 0; i < this.myFiles.length; i++) { 
      formData.append("documents", this.myFiles[i]);
    }
    formData.append('payload',JSON.stringify(this.weeklyReportcreateRecordForm.value));
    this.administrationService.postrecord(achievements_url, formData).subscribe((res) => {
      if (res) {
        this.weeklyReportcreateRecordForm.reset();
        this.weeklyReportcreateModal.hide();
        this.myFiles = [];
        this.fetch_goal();
        this.loadingService.hideloading();
        this.toastService.showToastNotification('success', 'Successfully Created', '');
      }
    });
  }

  

  save_weekly_report() {
    this.build_report()
    if (this.milestone_reports.length == 0){
      this.toastService.showToastNotification('error', 'No report added!', '');
      this.loadingService.hideloading();
      return
    }
    // this.weeklyReportForm.patchValue({"activities":this.steps});
    const payload = this.milestone_reports;
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed submitting report?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(weekly_reports_url, payload).subscribe((res) => {
            if (res) {
              this.steps = []
              this.weeklyReportForm.reset();
              this.fetch_goal();
              this.fetch_workplans();
              this.set_wr_is_add();
              this.loadingService.hideloading();
              this.toastService.showToastNotification('success', 'Successfully Created', '');
            }
          });
        }
      });
  }

  // RESULTS CHAIN

  set_rc_milestone_activity(workplan_id:any){
    this.ResultChainForm.patchValue({"workplan": workplan_id});
    for (let workplan of this.workplans){
      if (workplan?.id == workplan_id ){
        this.milestone_activities = workplan?.steps;
        break;
      }
    }
    console.log(this.milestone_activities)
  }


  set_rc_is_add(){
    this.rc_is_add = !this.rc_is_add;
  }

  create_activities(){

    this.activities.push(this.activity)

    this.activity = null;
  }

  remove_activity(index:any){
    this.activities.splice(index, 1);
  }

  create_item(item:any){
    if (item == 'input') {
      if(this.input){
        this.inputs.push(this.input)
      }
      this.input = null;
    } else if (item == 'output') {
      if(this.output && this.quantity && this.metric){
        const data = {
          "output": this.output,
          "quantity": this.quantity,
          "metric": this.metric,
          "description": this.description
        }
        this.outputs.push(data)
        this.output = null;
        this.quantity = null;
        this.metric = null;
        this.description = null;
      } else {
        this.toastService.showToastNotification('error', 'All inputs are required', '');
      }
      
    } else if (item == 'outcome') {
      if(this.outcome){
        this.outcomes.push(this.outcome)
      }
      this.outcome = null;
    } else if (item == 'impact') {
      if(this.impact){
        this.impacts.push(this.impact)
      }
      this.impact = null;
    }
  }

  remove_item(item:any,index:any){
    if (item == 'input') {
      this.inputs.splice(index, 1);
    } else if (item == 'output') {
      this.outputs.splice(index, 1);
    } else if (item == 'outcome') {
      this.outcomes.splice(index, 1);
    } else if (item == 'impact') {
      this.impacts.splice(index, 1);
    }
  }

  reset_arrays() {
    this.outcomes = [];
    this.outputs = [];
    this.impacts = [];
    this.inputs = [];
    this.activities = [];
  }

  save_result_chain() {
    if (this.activities.length == 0){
      this.toastService.showToastNotification('error', 'Add Action activities!', '');
      this.sweetalertService.showAlert('Error', 'Add Action activities!', 'error');
      this.loadingService.hideloading();
      return
    }
    this.ResultChainForm.patchValue({
      "activities":this.activities,
      "impact":this.impacts,
      "input":this.inputs,
      "outcome":this.outcomes,
      "output":this.outputs
    });
    const payload = this.ResultChainForm.value;
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed submitting ?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(result_chain_url, payload).subscribe((res) => {
            if (res) {
              this.activities = []
              this.ResultChainForm.reset();
              this.fetch_goal();
              this.reset_arrays();
              this.loadingService.hideloading();
              this.toastService.showToastNotification('success', 'Successfully Created', '');
            }
          });
        }
      });
  }


  // IMPLEMENTATION HISTORY
  set_viewing_item(j:any){
    if (j == this.viewing_item){
      this.viewing_item = 'null'
    } else {
      this.viewing_item = j
    }
  }


  

 












}
