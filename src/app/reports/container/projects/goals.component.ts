import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  achievements_url,
  boroughs_url,
  list_notifications_url, rri_goals_url, sub_counties_url, wards_url, wave_url
} from '../../../app.constants';
import { AdministrationService } from '../../../administration/services/administration.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
@Component({
  selector: 'app-projects-report',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class ProjectsReportComponent implements OnInit, OnDestroy {
all_notices:any;
public createRecordForm: FormGroup;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild('createModal') public createModal: ModalDirective;
  fileData: File;
  fileDatas = [];
  myFiles: string[] = [];
  rri_goals: [] = [];
  previous: string | null;
  public isCollapsed = false;
  is_active_id = ''
  is_active_progress = ''
  is_active_milestone: any = '';
  filter_by_values: any = [];
  filter_by = ''
  filter_by_value = ''
  location: any = 'all';
  location_values: any = [];
  location_value = ''

  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public sweetalertService: SweetalertService) { 
    this.createRecordForm = this.formBuilder.group({
      thematic_area_id: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
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
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  

  ngOnInit(): void  {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true,
      processing: true,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'copy',
        'print',
        'excel',
      ]
    };
    // this.fetchRRiGoals()
  }

  back_btn(){
    this.router.navigate([this.previous]);
  }

  fetch_filter_by(selection:any){
    this.rri_goals = []
    this.location_value = ''
    let url = '';
    if (selection == "borough"){
      url = boroughs_url
    } else if (selection == "sub-county"){
      url = sub_counties_url
    } else if (selection == "ward"){
      url = wards_url
    }
    this.loadingService.showloading();
    const params = {
    };
    this.administrationService.getrecords(url, params).subscribe((res) => {
      this.location_values = res;
      this.loadingService.hideloading();

    });
  }

  fetch_selector_value(selector:any){
    let url = '';
    this.filter_by_value = ''
    if (selector == "project"){
      url = wave_url
    } else if (selector == "objective"){
      url = rri_goals_url
    }
    this.loadingService.showloading();
    const params = {
      "serializer" : 'slim'
    };
    this.administrationService.getrecords(url, params).subscribe((res) => {
      this.filter_by_values = res;
      this.loadingService.hideloading();
    });
  }

  fetchRRiGoals() {
    if (!this.filter_by || !this.location){
      this.toastService.showToastNotification('error', 'Select filter criteria !', '')
      return
    }
    this.loadingService.showloading();
    const params = {
      "selector" : this.filter_by,
      "location" : this.location,
      "location_value" : this.location_value,
      "selector_value" : this.filter_by_value
    };
    this.administrationService.getrecords(rri_goals_url, params).subscribe((res) => {
      this.rri_goals = res;
      this.loadingService.hideloading();
      if (this.rri_goals.length == 0){
        this.toastService.showToastNotification('warning', 'No records  found !', '')
      }
      this.ngOnDestroy()
      this.dtTrigger.next(res);
      
    });
  }

  set_is_active_id(id:any,target:any){
    if(id == this.is_active_id){
        this.is_active_id = ''
    } else {
      this.is_active_id = id
    }
  }
  set_is_active_progress(id:any){
    if(id == this.is_active_progress){
        this.is_active_progress = ''
    } else {
      this.is_active_progress = id
    }
  }
  set_is_active_milestone(id:any){
    if(id == this.is_active_milestone){
        this.is_active_milestone = ''
    } else {
      this.is_active_milestone = id
    }
  }

  view_goal(goal_id:any){
    this.router.navigate(['reports/goal-review',goal_id]);
  }

  view_rri(id:any){
    this.router.navigate(['/generics/view-rri', id]);
  }

  view_weekly_reports(id:any){
    this.router.navigate(['/generics/weekly-reports', id]);
  }

  view_workplan(id:any){
    this.router.navigate(['/generics/workplan', id]);
  }

  view_results_chain(id:any){
    this.router.navigate(['/generics/result-chain', id]);
  }

  set_thematic_id(thematic_area_id:any){
    this.createRecordForm.patchValue({'thematic_area_id':thematic_area_id})
  }

  handleFileupload(e:any) {
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
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
        this.createRecordForm.reset()
        this.createModal.hide()
        this.loadingService.hideloading();
        this.toastService.showToastNotification('success', 'Successfully Created', '');
      }
    });
  }

}
