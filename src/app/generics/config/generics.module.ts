import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericsRoutingModule } from './generics-routing.module';
import { ViewRRIComponent } from '../container/view-rri/view-rri.component';
import { WeeklyReportsComponent } from '../container/weekly-reports/weekly-reports.component';
import { WorkplanComponent } from '../container/workplan/workplan.component';
import { SharedModulee } from '../../common-module/common-module/common-module.module';


@NgModule({
  declarations: [
    ViewRRIComponent,
    WeeklyReportsComponent,
    WorkplanComponent
  ],
  imports: [
    SharedModulee,
    CommonModule,
    GenericsRoutingModule
  ]
})
export class GenericsModule { }
