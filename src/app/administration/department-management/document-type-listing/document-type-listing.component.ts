import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import {
  edit_document_types_url, list_document_types_url, create_document_types_url, list_department_url,
  delete_document_types_url, detail_document_types_url
} from '../../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { Department } from '../../interfaces/administration';
import { AdministrationService } from '../../services/administration.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-document-type-listing',
  templateUrl: './document-type-listing.component.html',
  styleUrls: ['./document-type-listing.component.scss']
})
export class DocumentTypeListingComponent implements OnInit {
  public createRecordForm: FormGroup;
  public editRecordForm: FormGroup;
  validation_messages: any;
  formSubmitted = false;
  tenant_tag: string;
  deletereferenceid: any;
  selectedRow: any;
  selectedAll: boolean = false;
  department_id: string;
  department_list = [];
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
  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public active_router: ActivatedRoute,
    public sweetalertService: SweetalertService) {
    this.selectedRow = [];
    this.createRecordForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      keyword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      model: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      is_visible: new FormControl('', Validators.compose([Validators.required])),
      is_register: new FormControl('', Validators.compose([Validators.required])),
      is_placeholder: new FormControl('', Validators.compose([Validators.required])),
      is_main_document: new FormControl('', Validators.compose([Validators.required])),
      main_document_fields: new FormControl('', ),
    });
    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      keyword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      model: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      is_visible: new FormControl('', Validators.compose([Validators.required])),
      is_register: new FormControl('', Validators.compose([Validators.required])),
      is_placeholder: new FormControl('', Validators.compose([Validators.required])),
      department_id: new FormControl('', Validators.compose([Validators.required])),
      is_main_document: new FormControl('', Validators.compose([Validators.required])),
      main_document_fields: new FormControl('', ),
    });
    this.department_id = this.active_router.snapshot.paramMap.get('department_id')!;
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
       retrieve: true,
     lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
    


    };
    this.fetchRecords();


  }
  rerenderTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  fetchdepartments() {
    const params = {

    };
    this.administrationService.getrecords(list_department_url, params).subscribe((res) => {
      this.department_list = res;
      this.loadingService.hideloading();

    }, (err) => {
      this.loadingService.hideloading();

    });

  }
  selectRecord(event:any, recordinstance:any) {
    if (event.currentTarget.checked == true) {
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
      'request_status': 'active',
      'department_id': this.department_id,

    };
    this.administrationService.getrecords(list_document_types_url, params).subscribe((res) => {
      this.records = res;
      this.dtTrigger.next();
      this.loadingService.hideloading();

    });
  }

  editRecord(objectinstance:any) {
    const filter_params = {
      'request_id': objectinstance
    };
    this.fetchdepartments();
    this.administrationService.getrecords(detail_document_types_url, filter_params).subscribe((res:any) => {

      const forminstance = {
        'id': res['id'],
        'name': res['name'],
        'keyword': res['keyword'],
        'model': res['model'],
        'is_visible': this.administrationService.getreverseBoolean(res['is_visible']),
        'is_register': this.administrationService.getreverseBoolean(res['is_register']),
        'is_placeholder': this.administrationService.getreverseBoolean(res['is_placeholder']),
        'is_main_document': this.administrationService.getreverseBoolean(res['is_main_document']),
        'department_id': res['department']['id'],
        'main_document_fields': JSON.stringify(res['main_document_fields']),
        


      };
      this.editRecordForm.setValue(forminstance);
      this.editModal.show();
    });
  }
  deleteInstanceRecord() {
    const filter_params = {
      'request_id': this.deletereferenceid
    };
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting record? This process is irreversible').then((res) => {
        if (res) {
          this.administrationService.deleterecord(delete_document_types_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');
            this.deleteModal.hide();
            this.fetchRecords();
          });
        }
      });

  }

  deleteRecord(objectinstance:any) {
    this.deletereferenceid = objectinstance;
    this.deleteModal.show();
  }
  createRecord() {
    if (this.createRecordForm.invalid) {
      console.log(this.createRecordForm.value);
      this.formSubmitted = true;
      this.toastService.showToastNotification('error',
        'Kindly Correct the errors highlighted to proceed', '');

    } else {
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed creating record?').then((res) => {
        if (res) {
          const payload = {
            'name': this.createRecordForm.get('name')!.value,
            'keyword': this.createRecordForm.get('keyword')!.value,
            'model': this.createRecordForm.get('model')!.value,
            'department': this.department_id,
            'is_visible': this.administrationService.getBoolean(this.createRecordForm.get('is_visible')!.value),
            'is_register': this.administrationService.getBoolean(this.createRecordForm.get('is_register')!.value),
            'is_placeholder': this.administrationService.getBoolean(this.createRecordForm.get('is_placeholder')!.value),
            'is_main_document': this.administrationService.getBoolean(this.createRecordForm.get('is_main_document')!.value),
            'main_document_fields': this.createRecordForm.get('main_document_fields')!.value,


            
          };

          this.administrationService.postrecord(create_document_types_url, payload).subscribe((data) => {
            if (data) {
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

  viewDocumentFields(request_id:any) {
    this.router.navigate(['administration/document-field-listing', this.department_id , request_id]);

  }
  saveEditChanges() {
    if (this.editRecordForm.invalid) {
      this.formSubmitted = true;

    } else {
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating record?').then((res) => {
        if (res) {

          const payload = {
            'request_id': this.editRecordForm.get('id')!.value,
            'name': this.editRecordForm.get('name')!.value,
            'keyword': this.editRecordForm.get('keyword')!.value,
            'model': this.editRecordForm.get('model')!.value,
            'department': this.editRecordForm.get('department_id')!.value,
            'is_visible': this.administrationService.getBoolean(this.editRecordForm.get('is_visible')!.value),
            'is_register': this.administrationService.getBoolean(this.editRecordForm.get('is_register')!.value),
            'is_placeholder': this.administrationService.getBoolean(this.editRecordForm.get('is_placeholder')!.value),
            'is_main_document': this.administrationService.getBoolean(this.editRecordForm.get('is_main_document')!.value),
            'main_document_fields': this.editRecordForm.get('main_document_fields')!.value,

            
          };

          this.administrationService.updaterecord(edit_document_types_url, payload).subscribe((data) => {
            if (data) {
              this.fetchRecords();
              this.toastService.showToastNotification('success', 'Successfully Updated', '');
              this.editRecordForm.reset();
              this.editModal.hide();
            }

          });
        }
      });

    }
  }

}
