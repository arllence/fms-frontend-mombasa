import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonSharedModule } from '../../common-module/common-module/common-module.module';
import { MainReportComponent } from '../container/requests/main.component';
import { ReplacementsReportComponent } from '../container/transport/main.component';
import { FlightReportComponent } from '../container/flights/main.component';
import { JourneyReportComponent } from '../container/journeys/main.component';
import { ReportsRoutingModule } from './reports-routing.module';


@NgModule({
  declarations: [
    MainReportComponent,
    ReplacementsReportComponent,
    FlightReportComponent,
    JourneyReportComponent
  ],
  imports: [
    CommonSharedModule,
    CommonModule,
    ReportsRoutingModule,
    
  ]
})
export class ReportsModule { }
