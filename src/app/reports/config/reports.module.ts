import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModulee } from '../../common-module/common-module/common-module.module';
import { ViewEvaluationComponent } from '../container/view-evaluation/view-evaluation.component';
import { GoalsReportComponent } from '../container/goals/goals.component';
import { ProjectsReportComponent } from '../container/projects/goals.component';
import { GoalReviewComponent } from '../container/goal-review/review.component';
import { ReportsRoutingModule } from './reports-routing.module';


@NgModule({
  declarations: [
    ViewEvaluationComponent,
    GoalsReportComponent,
    ProjectsReportComponent,
    GoalReviewComponent
  ],
  imports: [
    SharedModulee,
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
