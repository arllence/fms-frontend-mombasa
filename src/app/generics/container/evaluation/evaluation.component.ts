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
  assign_evaluate_url,
  overseer_url,
  rri_goals_url,
   thematic_area_url,
   users_with_role_url,
   wave_url
} from '../../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { AdministrationService } from 'src/app/administration/services/administration.service';
import { Department } from 'src/app/administration/interfaces/administration';
@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})

export class EvaluationComponent implements OnInit {
  public createRecordForm: FormGroup;
  public editRecordForm: FormGroup;
  validation_messages: any;
  formSubmitted = false;
  tenant_tag: string;
  deletereferenceid: any;
  selectedRow: any;
  selectedAll: boolean = false;

  private modalRef: NgbModalRef;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  public dtTrigger:any = new Subject<any>();
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
  previous: string | null;
  users: any = [];
  rri_goal: any;
  evaluator: any;
  single_goal = true;
  selected_goal: any;

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
      results_leader: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      strategic_leader: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      team_leader: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      thematic_area: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      team_members: new FormControl(''),
    });
    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      goal: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      wave: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      coach: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      results_leader: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      strategic_leader: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      team_leader: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
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
       pageLength: 20,
      //  destroy: true,
      retrieve: true,
      lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
      dom: 'Bfrtip',
      buttons: [
        'copy',
        'print',
        'excel',
      ]
    };
    this.fetchRecords();
    this.fetch_users_with_role();
  }

  back_btn(){
    this.router.navigate([this.previous]);
  }
  destroyTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
 evaluate(id:any){
    this.router.navigate(['/generics/evaluate', id]);
  }
  view_evaluation(id:any){
    this.router.navigate(['/generics/view-evaluation', id]);
  }

  set_is_single(id:any){
    this.rri_goal = null;
    this.evaluator = null
    this.rri_goal = id;
    this.single_goal = true;
  }
  set_is_multiple(){
    this.rri_goal = null
    this.evaluator = null
    this.single_goal = false;
  }

  selected_obj(i:any){
    this.selected_goal = this.records[i];
  }

  fetchRecords() {
    this.loadingService.showloading();
    const params = {
      "page": "evaluation"
    };
    this.administrationService.getrecords(rri_goals_url, params).subscribe((res) => {
      this.records = res;
      if (res.length > 0){
        this.dtTrigger.next(res)
      }      
      this.loadingService.hideloading();

    });
  }


  fetch_users_with_role() {
    this.loadingService.showloading();
    const params = {
      "role_name": "EVALUATOR"
    };
    this.administrationService.getrecords(users_with_role_url, params).subscribe((res) => {
      this.users = res;
      this.loadingService.hideloading();

    });
  }

  createRecord() {
      
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed assigning?').then((res) => {
        if (res) {
          const payload =  {
            "evaluator": this.evaluator,
            "rri_goal": this.rri_goal
          }
          this.loadingService.showloading();
          this.administrationService.postrecord(assign_evaluate_url, payload).subscribe((data) => {
            if (data) {
              this.fetchRecords();
              this.toastService.showToastNotification('success', 'Successfully Created', '');
              this.evaluator = null;
              this.rri_goal = null;
              this.createModal.hide();
              this.loadingService.hideloading();
            }

          });

        }
      });

  }



}
