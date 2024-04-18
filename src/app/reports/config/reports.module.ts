import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonSharedModule } from '../../common-module/common-module/common-module.module';
import { QuoteReportComponent } from '../container/requests/main.component';
import { TransportReportComponent } from '../container/transport/main.component';
import { ReportsRoutingModule } from './reports-routing.module';


@NgModule({
  declarations: [
    QuoteReportComponent,
    TransportReportComponent
  ],
  imports: [
    CommonSharedModule,
    CommonModule,
    ReportsRoutingModule,
    
  ]
})
export class ReportsModule { }
