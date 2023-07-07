import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericsRoutingModule } from './generics-routing.module';
import { ViewRRIComponent } from '../container/view-rri/view-rri.component';
import { WeeklyReportsComponent } from '../container/weekly-reports/weekly-reports.component';
import { WorkplanComponent } from '../container/workplan/workplan.component';
import { ResultChainComponent } from '../container/result-chain/result-chain.component';
import { ViewResultsChainComponent } from '../container/view-results-chain/view-results-chain.component';
import { SharedModulee } from '../../common-module/common-module/common-module.module';


@NgModule({
  declarations: [
    ViewRRIComponent,
    WeeklyReportsComponent,
    WorkplanComponent,
    ResultChainComponent,
    ViewResultsChainComponent
  ],
  imports: [
    SharedModulee,
    CommonModule,
    GenericsRoutingModule
  ]
})
export class GenericsModule { }
