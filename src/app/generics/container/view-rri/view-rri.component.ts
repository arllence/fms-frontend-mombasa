import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/common-module/shared-service/toast.service';
import { SweetalertService } from 'src/app/common-module/shared-service/sweetalerts.service';
@Component({
  selector: 'app-view-rri',
  templateUrl: './view-rri.component.html',
  styleUrls: ['./view-rri.component.scss']
})
export class ViewRRIComponent implements OnInit {
all_notices:any;
public createRecordForm: FormGroup;
@ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  public dtTrigger:any = new Subject<any>();
  @ViewChild('createModal') public createModal: ModalDirective;
  fileData: File;
  fileDatas = [];
  myFiles: string[] = [];
  rri_goal: any;
  dtOptions: any = {};
  rri_id: any = '';
  upload_status: any = '';
  file_url: any;
  file_type: any;
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

  set_upload_status(status:any){
    this.upload_status = status;
    this.createRecordForm.patchValue({'upload_status': status})
  }

  view_files(url:any,file_type:any){
    this.file_url = url,
    this.file_type = file_type
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
