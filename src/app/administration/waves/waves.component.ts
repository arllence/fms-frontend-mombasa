import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import {
  directorate_url,
  overseer_url,
  project_sub_category_url,
  users_with_role_url,
   wards_url,
   wave_url
} from '../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { Department } from '../interfaces/administration';
import { AdministrationService } from '../services/administration.service';
@Component({
  selector: 'app-waves',
  templateUrl: './waves.component.html',
  styleUrls: ['./waves.component.scss']
})

export class WavesComponent implements OnInit {
  public createRecordForm: FormGroup;
  public editRecordForm: FormGroup;
  validation_messages: any;
  formSubmitted = false;
  tenant_tag: string;
  deletereferenceid: any;
  selectedRow: any;
  selectedAll: boolean = false;

  private modalRef: NgbModalRef;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  records: any = [];
  searchString: string;
  users = [];
  previous: string | null;
  wards: any = [];
  ward: string;
  estate: string = 'N/A';
  road: string  = 'N/A';
  directorates: any = [];
  sub_categories: any = [];
  project_type: any;
  main_projects: any = [];
  wave_type: any;
  overseers: any;
  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public sweetalertService: SweetalertService) {
    this.selectedRow = [];
    this.createRecordForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      start_date: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      end_date: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      results_leaders: new FormControl('', Validators.compose([Validators.required, ])),
      technical_leaders: new FormControl('', Validators.compose([Validators.required, ])),
      strategic_leaders: new FormControl('', Validators.compose([Validators.required,])),
      standalone: new FormControl('', Validators.compose([Validators.required,])),
      budget: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      directorate: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      location: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      sub_category: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      type: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      risks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      main_project: new FormControl('', ),
    });
    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      start_date: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      end_date: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      results_leaders: new FormControl('', Validators.compose([Validators.required, ])),
      technical_leaders: new FormControl('', Validators.compose([Validators.required, ])),
      strategic_leaders: new FormControl('', Validators.compose([Validators.required,])),
      standalone: new FormControl('', Validators.compose([Validators.required,])),
      budget: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      directorate: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      location: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      sub_category: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      type: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      risks: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      main_project: new FormControl('', ),
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
       pageLength: 10,
      //  destroy: true,
      retrieve: true,
      lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
    };
    this.fetchRecords();
    this.fetch_users_with_role();
    this.fetch_wards();
    this.fetch_directorates();
    this.fetch_sub_categories();
    this.fetchOverseers();
  }

  back_btn(){
    this.router.navigate([this.previous]);
  }

  destroyTable(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
    });
  }
  
  // rerenderTable(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //   });
  // }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  selectRecord(event:any, recordinstance:any) {
    if (event.currentTarget.checked == true) {
      console.log('changed value' + event.currentTarget.checked);
      if (typeof (recordinstance) == 'undefined') {
        this.selectedAll = !this.selectedAll;
        this.selectedRow = [];
      } else {

        this.selectedRow.push(recordinstance);
      }
    } else {

      const selected_obj = recordinstance.id;
      const matchedIndex = this.selectedRow.map(function (obj:any) { return obj.id; }).indexOf(selected_obj);
      this.selectedRow.splice(matchedIndex, 1);


    }

  }
  assign_role() {
    console.log(this.selectedRow);
  }

  openPopup(content:any, type:any) {

    this.ngbModal.open(content);

  }

  closeAllPopups() {
    this.modalRef.close();

  }
  resetForm() {
    this.createRecordForm.reset();
    this.formSubmitted = false;
  }

  set_project_type(project_type:any){
    this.project_type = project_type;
    if(project_type == "SUB"){
      this.fetch_projects("MAIN")
    }
  }

  fetch_projects(project_type:any) {
    this.loadingService.showloading();
    const params = {
      "project_type" : project_type
    };
    this.administrationService.getrecords(wave_url, params).subscribe((res) => {
      this.main_projects = res;
      this.loadingService.hideloading();

    });
  }

  fetchRecords() {
    this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(wave_url, params).subscribe((res) => {
      this.records = res;
      // this.destroyTable();
      if (res.length > 0){
        this.dtTrigger.next(res)
      } 
      this.loadingService.hideloading();

    });
  }

  fetchOverseers() {
    this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(overseer_url, params).subscribe((res) => {
      this.overseers = res;
      // this.loadingService.hideloading();
    });
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

  fetch_directorates() {
    this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(directorate_url, params).subscribe((res) => {
      this.directorates = res;
      this.loadingService.hideloading();

    });
  }

  fetch_sub_categories() {
    this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(project_sub_category_url, params).subscribe((res) => {
      this.sub_categories = res;
      this.loadingService.hideloading();

    });
  }

  fetch_users_with_role() {
    this.loadingService.showloading();
    const params = {
      "role_name": "LEAD_COACH"
    };
    this.administrationService.getrecords(users_with_role_url, params).subscribe((res) => {
      this.users = res;
      // this.dtTrigger.next()
      this.loadingService.hideloading();

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

  editRecord(index:any) {
    const wave = this.records[index]
    this.wave_type = wave?.type
    this.editRecordForm.patchValue(wave);
    this.editRecordForm.patchValue({
      'lead_coach':wave?.lead_coach?.id, 
      'directorate':wave?.directorate?.id, 
      'sub_category':wave?.sub_category?.id, 
      'main_project':wave?.mother_id, 
    });
    try {
      // if (wave?.type == 'SUB'){
        this.ward = wave['location']['ward']['id']
        this.estate = wave['location']['estate']
        this.road = wave['location']['road']
      // }
    } catch (error) {
      
    }
    this.set_project_type(wave?.type)
    this.editModal.show();
  }
  deleteInstanceRecord(id:any) {
    console.log(id)
    const filter_params = {
      'request_id': id
    };
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting record? This process is irreversible').then((res) => {
        if (res) {
          this.destroyTable();
          this.loadingService.showloading();
          this.administrationService.deleterecord(wave_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');
            this.fetchRecords();
          });
        }
      });

  }


  createRecord() {
    this.createRecordForm.patchValue({"location": this.build_location()});
    if (this.createRecordForm.invalid) {
      this.formSubmitted = true;
      this.toastService.showToastNotification('error',
        'Kindly Correct the errors highlighted to proceed', '');

    } else {
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed creating record?').then((res) => {
        if (res) {
          // this.destroyTable();
          const payload =  this.createRecordForm.value;
          this.loadingService.showloading();
          this.administrationService.postrecord(wave_url, payload).subscribe((data) => {
            if (data) {
              this.fetchRecords();
              this.toastService.showToastNotification('success', 'Successfully Created', '');
              this.createRecordForm.reset();
              this.createModal.hide();
              this.loadingService.hideloading();
            }

          });

        }
      });

    }
  }

  viewDocumentTypes(request_id:any) {
    this.router.navigate(['administration/document-type-listing', request_id]);

  }
  saveEditChanges() {
    this.editRecordForm.patchValue({"location": this.build_location()});
    console.log(this.editRecordForm.value)
    if (this.editRecordForm.invalid) {
      this.formSubmitted = true;
      this.administrationService.markFormAsDirty(this.editRecordForm);
    } else {
      
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating record?').then((res) => {
        if (res) {
          const payload = {
            'request_id': this.editRecordForm.get('id')!.value,
            'name': this.editRecordForm.get('name')!.value,
            'start_date': this.editRecordForm.get('start_date')!.value,
            'end_date': this.editRecordForm.get('end_date')!.value,
            'technical_leaders': this.editRecordForm.get('strategic_leaders')!.value,
            'results_leaders': this.editRecordForm.get('results_leaders')!.value,
            'strategic_leaders': this.editRecordForm.get('strategic_leaders')!.value,
            'budget': this.editRecordForm.get('budget')!.value,
            'sub_category': this.editRecordForm.get('sub_category')!.value,
            'directorate': this.editRecordForm.get('directorate')!.value,
            'location': this.editRecordForm.get('location')!.value,
            'type': this.editRecordForm.get('type')!.value,
            'main_project': this.editRecordForm.get('main_project')!.value,
            'risks': this.editRecordForm.get('risks')!.value,
            'standalone': this.editRecordForm.get('standalone')!.value,
          };
          this.destroyTable();
          this.loadingService.showloading();
          this.administrationService.updaterecord(wave_url, payload).subscribe((data) => {
            if (data) {
              this.fetchRecords();
              this.toastService.showToastNotification('success', 'Successfully Updated', '');
              this.editRecordForm.reset();
              this.editModal.hide();
              this.loadingService.hideloading();
            }

          });
        }
      });

    }
  }


}
