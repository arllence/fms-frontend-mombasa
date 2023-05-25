import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import {
  edit_document_fields_url, list_document_fields_url, create_document_fields_url,
   list_department_url,
   delete_document_fields_url, detail_document_fields_url, list_input_types_url
} from '../../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { Department } from '../../interfaces/administration';
import { AdministrationService } from '../../services/administration.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-document-field-listing',
  templateUrl: './document-field-listing.component.html',
  styleUrls: ['./document-field-listing.component.scss']
})
export class DocumentFieldListingComponent implements OnInit {
  public createRecordForm: FormGroup;
  public editRecordForm: FormGroup;
  validation_messages: any;
  formSubmitted = false;
  tenant_tag: string;
  deletereferenceid: any;
  selectedRow: any;
  selectedAll: boolean = false;
  department_id: string;
  document_type_id: string;
  input_type_list = [];
  document_type_name: any;
  department_name: any;
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
      label: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      input_type: new FormControl('', Validators.compose([Validators.required])),
      field_type: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      options: new FormControl('', ),
      width: new FormControl('', Validators.compose([Validators.required])),
      field_no: new FormControl('', Validators.compose([Validators.required])),
      is_mandatory: new FormControl('', Validators.compose([Validators.required])),
      is_enforced: new FormControl('', Validators.compose([Validators.required])),
    });
    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      label: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      input_type: new FormControl('', Validators.compose([Validators.required])),
      field_type: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
      options: new FormControl('', ),
      width: new FormControl('', Validators.compose([Validators.required])),
      field_no: new FormControl('', Validators.compose([Validators.required])),
      is_mandatory: new FormControl('', Validators.compose([Validators.required])),
      is_enforced: new FormControl('', Validators.compose([Validators.required])),
    });
    this.department_id = this.active_router.snapshot.paramMap.get('department_id')!;
    this.document_type_id = this.active_router.snapshot.paramMap.get('document_type_id')!;
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
       retrieve: true,
     lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
    


    };
    this.fetchRecords();
    this.fetchinputtypes();


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
  fetchinputtypes() {
    const params = {

    };
    this.administrationService.getrecords(list_input_types_url,
      params).subscribe((res) => {
      this.input_type_list = res;
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
      const matchedIndex = this.selectedRow.map(function (obj:any) {
        return obj.id; }).indexOf(selected_obj);
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
      'document_type_id': this.document_type_id,

    };
    this.administrationService.getrecords(list_document_fields_url,
      params).subscribe((res:any) => {
      this.records = res['fields'];
      this.document_type_name = res['document_type']['name'];
      this.department_name = res['document_type']['department']['name'];

      this.dtTrigger.next();
      this.loadingService.hideloading();

    });
  }

  editRecord(objectinstance:any) {
    const filter_params = {
      'request_id': objectinstance
    };

    this.administrationService.getrecords(detail_document_fields_url,
      filter_params).subscribe((res:any) => {

      const forminstance = {

        'id': res['id'],
        'name': res['name'],
        'label': res['label'],
        'input_type': res['input_type'],
        'field_type': res['field_type'],
        'options': JSON.stringify(res['options']),
        'width': res['width'],
        'field_no': res['field_no'],
        'is_mandatory': this.administrationService.getreverseBoolean(res['is_mandatory']),
        'is_enforced': this.administrationService.getreverseBoolean(res['is_enforced']),

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
          this.administrationService.deleterecord(delete_document_fields_url,
            filter_params).subscribe((res) => {

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
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed creating record?').then((res) => {
        if (res) {
          const payload = {
            'name': this.createRecordForm.get('name')!.value,
            'label': this.createRecordForm.get('label')!.value,
            'input_type': this.createRecordForm.get('input_type')!.value,
            'field_type': this.createRecordForm.get('field_type')!.value,
            'options': this.createRecordForm.get('options')!.value,
            'width': this.createRecordForm.get('width')!.value,
            'field_no': this.createRecordForm.get('field_no')!.value,
            'department': this.department_id,
            'document_type_id': this.document_type_id,
            'is_mandatory':
             this.administrationService.getBoolean(this.createRecordForm.get('is_mandatory')!.value),
            'is_enforced':
            this.administrationService.getBoolean(this.createRecordForm.get('is_enforced')!.value),

          };

          this.administrationService.postrecord(create_document_fields_url,
            payload).subscribe((data) => {
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
    this.router.navigate(['administration/document-field-listing',
     this.department_id , request_id]);

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
            'label': this.editRecordForm.get('label')!.value,
            'input_type': this.editRecordForm.get('input_type')!.value,
            'field_type': this.editRecordForm.get('field_type')!.value,
            'options': this.editRecordForm.get('options')!.value,
            'width': this.editRecordForm.get('width')!.value,
            'field_no': this.editRecordForm.get('field_no')!.value,
            'department': this.department_id,
            'document_type_id': this.document_type_id,
            'is_mandatory':
             this.administrationService.getBoolean(this.editRecordForm.get('is_mandatory')!.value),
            'is_enforced':
            this.administrationService.getBoolean(this.editRecordForm.get('is_enforced')!.value),
          };

          this.administrationService.updaterecord(edit_document_fields_url, payload).subscribe((data) => {
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
