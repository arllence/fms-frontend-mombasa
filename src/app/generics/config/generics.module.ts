import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericsRoutingModule } from './generics-routing.module';
import { ViewRRIComponent } from '../container/view-rri/view-rri.component';
import { WeeklyReportsComponent } from '../container/weekly-reports/weekly-reports.component';
import { WorkplanComponent } from '../container/workplan/workplan.component';
import { EvaluateComponent } from '../container/evaluate/evaluate.component';
import { ResultChainComponent } from '../container/result-chain/result-chain.component';
import { ViewResultsChainComponent } from '../container/view-results-chain/view-results-chain.component';
import { CommonSharedModule } from '../../common-module/common-module/common-module.module';
import { EvaluationComponent } from '../container/evaluation/evaluation.component';
import { ViewEvaluationComponent } from '../container/view-evaluation/view-evaluation.component';


@NgModule({
  declarations: [
    ViewRRIComponent,
    WeeklyReportsComponent,
    WorkplanComponent,
    ResultChainComponent,
    ViewResultsChainComponent,
    EvaluateComponent,
    EvaluationComponent,
    ViewEvaluationComponent
  ],
  imports: [
    CommonSharedModule,
    CommonModule,
    GenericsRoutingModule
  ]
})
export class GenericsModule { }
