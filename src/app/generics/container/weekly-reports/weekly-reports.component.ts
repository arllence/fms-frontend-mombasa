import { Component, OnInit, ViewChild } from '@angular/core';
import {
  achievements_url,
  list_notifications_url, rri_goals_url, serverurl, weekly_reports_url
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
  selector: 'app-weekly-reports',
  templateUrl: './weekly-reports.component.html',
  styleUrls: ['./weekly-reports.component.scss']
})
export class WeeklyReportsComponent implements OnInit {
  all_notices:any;
  public createRecordForm: FormGroup;
  public weeklyReportForm: FormGroup;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  public dtTrigger:any = new Subject<any>();
  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('viewAchievementModal') public viewAchievementModal: ModalDirective;
  @ViewChild('WeeklyModal') public WeeklyModal: ModalDirective;
  
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
  status: any;
  challenges: any;
  recommendations: any;
  steps:any = [];
 
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

    this.weeklyReportForm = this.formBuilder.group({
      start_date: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      end_date: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      milestone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      rri_goal: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      steps: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
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
      this.weeklyReportForm.patchValue({"rri_goal" : this.rri_goal?.id})
      this.loadingService.hideloading();

    });
  }

  // fetch_weekly_reports(request_id:any) {
  //   this.loadingService.showloading();
  //   const params = {
  //     "request_id": request_id
  //   };
  //   this.administrationService.getrecords(rri_goals_url, params).subscribe((res) => {
  //     this.rri_goal = res;
  //     this.loadingService.hideloading();
  //   });
  // }

  set_upload_status(status:any, thematic_area_id:any){
    this.upload_status = status;
    this.createRecordForm.patchValue({'upload_status': status, 'thematic_area_id':thematic_area_id})
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

  handleFileupload(e:any) {
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
  }

  create_steps(){
    const step_obj = {
      "step": this.step,
      "status": this.status,
      "challenges": this.challenges,
      "recommendations": this.recommendations,
    }
    this.steps.push(step_obj)

    this.step = null;
    this.status = null;
    this.challenges = null;
    this.recommendations = null;
  }

  remove_step(index:any){
    this.steps.splice(index, 1);
  }

  save_achievements() {
    this.loadingService.showloading();
    const formData  =  new FormData();
    for (var i = 0; i < this.myFiles.length; i++) { 
      formData.append("documents", this.myFiles[i]);
    }
    formData.append('payload',JSON.stringify(this.createRecordForm.value));
    this.administrationService.postrecord(achievements_url, formData).subscribe((res) => {
      if (res) {
        this.createRecordForm.reset();
        this.createModal.hide();
        this.myFiles = [];
        this.fetchRRiGoal(this.rri_id);
        this.loadingService.hideloading();
        this.toastService.showToastNotification('success', 'Successfully Created', '');
      }
    });
  }

  save_weekly_report() {
    if (this.steps.length == 0){
      this.toastService.showToastNotification('error', 'Add Action Steps!', '');
      this.loadingService.hideloading();
      return
    }
    this.weeklyReportForm.patchValue({"steps":this.steps});
    const payload = this.weeklyReportForm.value;
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed submiting report?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(weekly_reports_url, payload).subscribe((res) => {
            if (res) {
              this.steps = []
              this.weeklyReportForm.reset();
              this.WeeklyModal.hide();
              this.fetchRRiGoal(this.rri_id);
              this.loadingService.hideloading();
              this.toastService.showToastNotification('success', 'Successfully Created', '');
            }
          });
        }
      });
  }

}
