import { Component, OnInit, ViewChild } from '@angular/core';
import {
  achievements_url,
  list_notifications_url, list_staff_url, rri_goals_url, serverurl, weekly_reports_url, workplan_url
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
  selector: 'app-workplan',
  templateUrl: './workplan.component.html',
  styleUrls: ['./workplan.component.scss']
})
export class WorkplanComponent implements OnInit {
  all_notices:any;
  public createRecordForm: FormGroup;
  public workplanForm: FormGroup;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  public dtTrigger:any = new Subject<any>();
  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('viewAchievementModal') public viewAchievementModal: ModalDirective;
  @ViewChild('WorkplanModal') public WorkplanModal: ModalDirective;
  
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

    this.workplanForm = this.formBuilder.group({
      start_date: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      end_date: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      budget: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      milestone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      rri_goal: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      steps: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      // person_incharge: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      status: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      remarks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
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
    this.workplanForm.patchValue({"rri_goal" : this.rri_id})
    this.filterusers();
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

  save_workplan() {
    if (this.steps.length == 0){
      this.toastService.showToastNotification('error', 'Add Action Steps!', '');
      this.loadingService.hideloading();
      return
    }
    this.workplanForm.patchValue({"steps":this.steps});
    const payload = this.workplanForm.value;
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed submiting workplan?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(workplan_url, payload).subscribe((res) => {
            if (res) {
              this.steps = []
              this.workplanForm.reset();
              this.fetchRRiGoal(this.rri_id);
              this.set_is_add()
              this.loadingService.hideloading();
              this.toastService.showToastNotification('success', 'Successfully Created', '');
            }
          });
        }
      });
  }

}
