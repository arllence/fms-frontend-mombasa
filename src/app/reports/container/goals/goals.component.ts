import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  achievements_url,
  list_notifications_url, rri_goals_url
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
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsReportComponent implements OnInit, OnDestroy {
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
    this.fetchRRiGoals()
  }

  fetchRRiGoals() {
    this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(rri_goals_url, params).subscribe((res) => {
      this.rri_goals = res;
      // this.dtTrigger.next(res);
      this.loadingService.hideloading();

    });
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

  view_result_chain(id:any){
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
