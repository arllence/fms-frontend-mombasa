import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonSharedModule } from '../../common-module/common-module/common-module.module';
import { MainReportComponent } from '../container/requests/main.component';
import { ReportsRoutingModule } from './reports-routing.module';


@NgModule({
  declarations: [
    MainReportComponent,
  ],
  imports: [
    CommonSharedModule,
    CommonModule,
    ReportsRoutingModule,
    
  ]
})
export class ReportsModule { }
