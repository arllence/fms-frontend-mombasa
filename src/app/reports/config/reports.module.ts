import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonSharedModule } from '../../common-module/common-module/common-module.module';
import { GoalReviewComponent } from '../container/goal-review/review.component';
import { ReportsRoutingModule } from './reports-routing.module';


@NgModule({
  declarations: [
    GoalReviewComponent
  ],
  imports: [
    CommonSharedModule,
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
