import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { NgxPermissionsModule } from 'ngx-permissions';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';

import { CommonErrorComponent } from '../../containers/common-error/common-error.component';
import { CommonHeaderComponent } from '../../containers/common-header/common-header.component';
import { CommonLoaderComponent } from '../../containers/common-loader/common-loader.component';
import { CommonFooterComponent } from '../../containers/common-footer/common-footer.component';
import { CommonProfileComponent } from '../../containers/common-profile/common-profile.component';
// import {DataTableModule} from 'angular2-datatable';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

// import { ToastrModule } from 'ngx-toastr';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DatePipe } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxPrintModule } from 'ngx-print';

export const MY_CUSTOM_FORMATS = {
  fullPickerInput: 'YYYY-MM-DD HH:mm:ss',
  parseInput: 'YYYY-MM-DD HH:mm:ss',
  datePickerInput: 'YYYY-MM-DD HH:mm:ss',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'
  };
  import {DataTablesModule} from 'angular-datatables';
  import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
  import { SafePipe } from '../../safepipe';
  import { FilterPipe } from '../shared-pipes/filter.pipe';
  import { CommonProfileUpdateComponent } from 'src/app/containers/common-profile-update/common-profile-update.component';
  import { ChartjsModule } from '@coreui/angular-chartjs';
@NgModule({
  declarations: [CommonErrorComponent, CommonLoaderComponent,
    CommonFooterComponent, CommonHeaderComponent, CommonProfileComponent, CommonProfileUpdateComponent,  SafePipe, FilterPipe],
  imports: [
    AvatarModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FooterModule,
    FormModule,
    GridModule,
    HeaderModule,
    ListGroupModule,
    BsDropdownModule,
    DataTablesModule,
    NavModule,
    ProgressModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    SharedModule,
    SidebarModule,
    PerfectScrollbarModule,
    CollapseModule,
    CommonModule,
    UtilitiesModule,
    TabsModule, 
    NgxPermissionsModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgxSpinnerModule,
    AlertModule,
    ModalModule,
    NgbNavModule,
    NgbModule,
    NgSelectModule,
    NgbCollapseModule,
    ChartjsModule,
    NgxPrintModule
  ],
  exports: [
    AvatarModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FooterModule,
    PerfectScrollbarModule,
    FormModule,
    GridModule,
    HeaderModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    ListGroupModule,
    DataTablesModule,
    NavModule,
    ProgressModule,
    SharedModule,
    SidebarModule,
    BsDropdownModule,
    CollapseModule,
    CommonModule,
    UtilitiesModule,
    CommonModule,
    NgxPermissionsModule,
    TabsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgxSpinnerModule,
    AlertModule,
    ModalModule,
    NgbNavModule,
    NgbModule,
    NgSelectModule,
    CommonErrorComponent,
    CommonLoaderComponent,
    CommonFooterComponent, CommonHeaderComponent,
    CommonProfileComponent,
    NgbCollapseModule,
    ChartjsModule,
    NgxPrintModule,
    SafePipe,
    FilterPipe,
  ],
  providers: [
    DatePipe
  ]

})
export class CommonSharedModule { }

