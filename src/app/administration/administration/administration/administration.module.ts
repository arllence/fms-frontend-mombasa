import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { StaffregistrationComponent } from '../../staffregistration/staffregistration.component';
import { StafflistingComponent } from '../../stafflisting/stafflisting.component';
import { StaffDetailsComponent } from '../../staff-details/staff-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SharedModulee } from '../../../common-module/common-module/common-module.module';

import { DepartmentListingComponent } from '../../department-management/department-listing/department-listing.component';
import { DocumentTypeListingComponent } from '../../department-management/document-type-listing/document-type-listing.component';
import { DocumentFieldListingComponent } from '../../department-management/document-field-listing/document-field-listing.component';
@NgModule({
  declarations: [

    StaffregistrationComponent,
    StafflistingComponent,
    StaffDetailsComponent,
    DepartmentListingComponent,
    DocumentTypeListingComponent,
    DocumentFieldListingComponent,



  ],
  imports: [
    SharedModulee,
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    ReactiveFormsModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
