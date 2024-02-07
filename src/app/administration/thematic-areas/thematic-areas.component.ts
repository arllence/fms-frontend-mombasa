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
  department_url,
  directorate_url,
  overseer_url,
  sector_url,
   thematic_area_url,
   wave_url
} from '../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { Department } from '../interfaces/administration';
import { AdministrationService } from '../services/administration.service';
@Component({
  selector: 'app-thematic-areas',
  templateUrl: './thematic-areas.component.html',
  styleUrls: ['./thematic-areas.component.scss']
})

export class ThematicAreasComponent implements OnInit {
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
  sectors: [] = [];
  departments: [] = [];
  overseers: [] = [];
  previous: string | null;
  waves: any;
  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public sweetalertService: SweetalertService) {
    this.selectedRow = [];

    this.createRecordForm = this.formBuilder.group({
      area: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      sector: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      project: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      department: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    });

    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      area: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      sector: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      project: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      department: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
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
       destroy: true,
       bDestroy: true,
      retrieve: true,
      lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
     


    };
 
    this.fetchRecords();
    this.fetchSectors();
    this.fetchOverseers();
    this.fetchDepartments();
    this.fetch_waves();
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



  fetchRecords() {
    this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(thematic_area_url, params).subscribe((res) => {
      this.records = res;
      if (res.length > 0){
        this.dtTrigger.next(res)
      }
      
      this.loadingService.hideloading();

    });
  }

  fetch_waves() {
    // this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(wave_url, params).subscribe((res) => {
      this.waves = res;

    });
  }

  fetchSectors() {
    // this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(sector_url, params).subscribe((res) => {
      this.sectors = res;
      // this.loadingService.hideloading();
    });
  }

  fetchDepartments() {
    // this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(directorate_url, params).subscribe((res) => {
      this.departments = res;
      // this.loadingService.hideloading();
    });
  }

  fetchOverseers() {
    // this.loadingService.showloading();
    const params = {

    };
    this.administrationService.getrecords(overseer_url, params).subscribe((res) => {
      this.overseers = res;
      // this.loadingService.hideloading();
    });
  }

  editRecord(objectinstance:any) {
    const filter_params = {
      'request_id': objectinstance
    };
    this.administrationService.getrecords(thematic_area_url, filter_params).subscribe((res:any) => {
      let department = ''
      try {
         department =  res['directorate']['id']
      } catch (error) {
        
      }
      const forminstance = {
        'id': res['id'],
        'area': res['area'],
        'project': res['project'],
        'sector': res['sector']['id'],
        'department': department
      };
      this.editRecordForm.setValue(forminstance);
      this.editModal.show();
    });
  }

  deleteInstanceRecord(objectinstance:any) {
    const filter_params = {
      'request_id': objectinstance
    };
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting record? This process is irreversible').then((res) => {
        if (res) {
          this.destroyTable();
          this.loadingService.showloading();
          this.administrationService.deleterecord(thematic_area_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');
            // this.dtTrigger.unsubscribe();
            this.fetchRecords();
            this.loadingService.hideloading();
          });
        }
      });

  }
  createRecord() {
    if (this.createRecordForm.invalid) {
      this.formSubmitted = true;
      this.toastService.showToastNotification('error',
        'Kindly Correct the errors highlighted to proceed', '');

    } else {
      this.destroyTable();
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed creating record?').then((res) => {
        if (res) {
          const payload =  this.createRecordForm.value
          this.loadingService.showloading();
          this.administrationService.postrecord(thematic_area_url, payload).subscribe((data) => {
            if (data) {
              // this.dtTrigger.unsubscribe();
              this.fetchRecords();
              this.toastService.showToastNotification('success', 'Successfully Created', '');
              this.createRecordForm.reset();
              this.createModal.hide();
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
    if (this.editRecordForm.invalid) {
      this.formSubmitted = true;
      this.administrationService.markFormAsDirty(this.editRecordForm)

    } else {
      this.destroyTable();
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating record?').then((res) => {
        if (res) {
          const payload = {
            'request_id': this.editRecordForm.get('id')!.value,
            'area': this.editRecordForm.get('area')!.value,
            'sector': this.editRecordForm.get('sector')!.value,
            'project': this.editRecordForm.get('project')!.value,
            'department': this.editRecordForm.get('department')!.value,
          };
          this.loadingService.showloading();
          this.administrationService.updaterecord(thematic_area_url, payload).subscribe((data) => {
            if (data) {
              // this.dtTrigger.unsubscribe();
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
