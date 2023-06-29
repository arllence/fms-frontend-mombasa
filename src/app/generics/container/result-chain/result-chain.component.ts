import { Component, OnInit, ViewChild } from '@angular/core';
import {
  achievements_url,
  list_notifications_url, list_staff_url, result_chain_url, rri_goals_url, serverurl, weekly_reports_url, workplan_url
} from '../../../app.constants';
import { AdministrationService } from '../../../administration/services/administration.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/common-module/shared-service/toast.service';
import { SweetalertService } from 'src/app/common-module/shared-service/sweetalerts.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-result-chain',
  templateUrl: './result-chain.component.html',
  styleUrls: ['./result-chain.component.scss']
})
export class ResultChainComponent implements OnInit {
  all_notices:any;
  public createRecordForm: FormGroup;
  public ResultChainForm: FormGroup;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  public dtTrigger:any = new Subject<any>();
  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('viewAchievementModal') public viewAchievementModal: ModalDirective;
  @ViewChild('ResultChainModal') public ResultChainModal: ModalDirective;
  
  fileData: File;
  fileDatas = [];
  myFiles: string[] = [];
  rri_goal: any;
  dtOptions: any = {};
  rri_id: any = '';
  upload_status: any = '';
  file_url: any;
  file_type: any;
  achievement: any;
  is_view_file: boolean = false;
  active = 1;
  activity: any ;
  status: any;
  challenges: any;
  recommendations: any;
  activities:any = [];
  users = [];
  is_add: boolean = false;
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
 
  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public sweetalertService: SweetalertService, private route: ActivatedRoute,) { 

    this.createRecordForm = this.formBuilder.group({
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
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
       pageLength: 10,
      //  destroy: true,
      retrieve: true,
      lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
    };
    const request_id = this.route.snapshot.paramMap.get('id');
    this. fetchRRiGoal(request_id)
    this.rri_id = request_id;
    this.ResultChainForm.patchValue({"rri_goal" : this.rri_id})
    this.filterusers();
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }
  
  fetchRRiGoal(request_id:any) {
    this.loadingService.showloading();
    const params = {
      "request_id": request_id
    };
    this.administrationService.getrecords(rri_goals_url, params).subscribe((res) => {
      this.rri_goal = res;
      // this.dtTrigger.next()
      this.loadingService.hideloading();

    });
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


  handleFileupload(e:any) {
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
  }

  set_is_add(){
    this.is_add = !this.is_add;
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
      'Do you wish to proceed submiting ?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(result_chain_url, payload).subscribe((res) => {
            if (res) {
              this.activities = []
              this.ResultChainForm.reset();
              this.fetchRRiGoal(this.rri_id);
              this.reset_arrays();
              this.loadingService.hideloading();
              this.toastService.showToastNotification('success', 'Successfully Created', '');
            }
          });
        }
      });
  }

}
