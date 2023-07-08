import { Component, OnInit, ViewChild } from '@angular/core';
import {
  achievements_url,
  list_notifications_url, list_staff_url, rri_goals_url, serverurl, evaluate_url
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
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.scss']
})
export class EvaluateComponent implements OnInit {
  all_notices:any;
  public createRecordForm: FormGroup;
  public evaluateForm: FormGroup;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  public dtTrigger:any = new Subject<any>();
  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('viewAchievementModal') public viewAchievementModal: ModalDirective;
  @ViewChild('EvaluateModal') public EvaluateModal: ModalDirective;
  
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
  step: any ;
  person_incharge: any;
  status: any;
  challenges: any;
  recommendations: any;
  steps:any = [];
  users = [];
  is_add: boolean = false;
 
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

    this.evaluateForm = this.formBuilder.group({
      // rri_goal: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      understanding_score: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      understanding_remarks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      achievement_score: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      achievement_remarks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      innovation_score: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      innovation_remarks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      paradigm_score: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      paradigm_remarks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      challenges_score: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      challenges_remarks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      sustainability_score: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      sustainability_remarks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      stakeholders_score: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      stakeholders_remarks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      pictorial_score: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      pictorial_remarks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      reporting_score: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      reporting_remarks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      impact_score: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      impact_remarks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      budget_score: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      budget_remarks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      synergy_score: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      synergy_remarks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)]))
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
    this.evaluateForm.patchValue({"rri_goal" : this.rri_id})
    // this.filterusers();
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }
 
  set_is_add(){
    this.is_add = !this.is_add;
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

  // filterusers() {
  //     const search_payload = {
  //       'username': "all"
  //     };
  //     this.loadingService.showloading();
  //     this.administrationService.getrecords(list_staff_url, search_payload).subscribe((res) => {
  //       if (res) {
  //         this.users = res;
  //         this.loadingService.hideloading();
  //       }

  //     });
  // }


  handleFileupload(e:any) {
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
  }

  create_obj(){
    const obj = {
      "achievement": {
        "score": this.evaluateForm.get('achievement_score')!.value,
        "remarks": this.evaluateForm.get('achievement_remarks')!.value,
      },
      "budget": {
        "score": this.evaluateForm.get('budget_score')!.value,
        "remarks": this.evaluateForm.get('budget_remarks')!.value,
      },
      "challenges": {
        "score": this.evaluateForm.get('challenges_score')!.value,
        "remarks": this.evaluateForm.get('challenges_remarks')!.value,
      },
      "impact": {
        "score": this.evaluateForm.get('impact_score')!.value,
        "remarks": this.evaluateForm.get('impact_remarks')!.value,
      },
      "innovation": {
        "score": this.evaluateForm.get('innovation_score')!.value,
        "remarks": this.evaluateForm.get('innovation_remarks')!.value,
      },
      "paradigm": {
        "score": this.evaluateForm.get('paradigm_score')!.value,
        "remarks": this.evaluateForm.get('paradigm_remarks')!.value,
      },
      "pictorial": {
        "score": this.evaluateForm.get('pictorial_score')!.value,
        "remarks": this.evaluateForm.get('pictorial_remarks')!.value,
      },
      "reporting": {
        "score": this.evaluateForm.get('reporting_score')!.value,
        "remarks": this.evaluateForm.get('reporting_remarks')!.value,
      },
      "stakeholders": {
        "score": this.evaluateForm.get('stakeholders_score')!.value,
        "remarks": this.evaluateForm.get('stakeholders_remarks')!.value,
      },
      "sustainability": {
        "score": this.evaluateForm.get('sustainability_score')!.value,
        "remarks": this.evaluateForm.get('sustainability_remarks')!.value,
      },
      "synergy": {
        "score": this.evaluateForm.get('synergy_score')!.value,
        "remarks": this.evaluateForm.get('synergy_remarks')!.value,
      },
      "understanding": {
        "score": this.evaluateForm.get('understanding_score')!.value,
        "remarks": this.evaluateForm.get('understanding_remarks')!.value,
      },
    }
    return obj;
  }

  save_evaluation() {
    const payload = this.create_obj();
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed submiting evaluation?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(evaluate_url, payload).subscribe((res) => {
            if (res) {
              this.steps = []
              this.evaluateForm.reset();
              this.router.navigate(['generics/evaluation'])
              this.loadingService.hideloading();
              this.toastService.showToastNotification('success', 'Successfully Created', '');
            }
          });
        }
      });
  }

}
