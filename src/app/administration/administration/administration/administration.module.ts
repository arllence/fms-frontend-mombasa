import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { StaffregistrationComponent } from '../../staffregistration/staffregistration.component';
import { StafflistingComponent } from '../../stafflisting/stafflisting.component';
import { StaffDetailsComponent } from '../../staff-details/staff-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { CommonSharedModule } from '../../../common-module/common-module/common-module.module';

import { DepartmentListingComponent } from '../../department-management/department-listing/department-listing.component';
import { SltComponent } from '../../slt/listing/listing.component';


@NgModule({
  declarations: [
    StaffregistrationComponent,
    StafflistingComponent,
    StaffDetailsComponent,
    DepartmentListingComponent,
    SltComponent
  
  ],
  imports: [
    CommonSharedModule,
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    ReactiveFormsModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
