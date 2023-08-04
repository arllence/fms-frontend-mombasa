import { Component, OnInit, ViewChild } from '@angular/core';
import {
  achievements_url,
  list_notifications_url, list_staff_url, rri_goals_url, serverurl, evaluate_url, evaluation_report_url
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
  selector: 'app-view-evaluation',
  templateUrl: './view-evaluation.component.html',
  styleUrls: ['./view-evaluation.component.scss']
})
export class ViewEvaluationComponent implements OnInit {
  all_notices:any;
  public createRecordForm: FormGroup;
  public evaluateForm: FormGroup;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  public dtTrigger:any = new Subject<any>();
  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('viewAchievementModal') public viewAchievementModal: ModalDirective;
  @ViewChild('EvaluateModal') public EvaluateModal: ModalDirective;
  

  goals: any = [];
  dtOptions: any = {};
  rri_id: any = '';
  previous: string | null;
  
 
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

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
       pageLength: 10,
      //  destroy: true,
      retrieve: true,
      lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
    };

    this. fetch_evaluation_report()

  }

  back_btn(){
    this.router.navigate([this.previous]);
  }

  view_evaluated(id:any){
    this.router.navigate(['generics/view-evaluation',id]);
  }

  
  fetch_evaluation_report() {
    this.loadingService.showloading();
    const params = {
      "page": "reports"
    };
    this.administrationService.getrecords(evaluation_report_url, params).subscribe((res) => {
      this.goals = res;
      this.dtTrigger.next(res)
      this.loadingService.hideloading();

    });
  }

}
