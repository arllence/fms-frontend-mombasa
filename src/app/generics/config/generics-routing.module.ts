import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { ViewRRIComponent } from '../container/view-rri/view-rri.component';
import { WeeklyReportsComponent } from '../container/weekly-reports/weekly-reports.component';
import { WorkplanComponent } from '../container/workplan/workplan.component';
import { ResultChainComponent } from '../container/result-chain/result-chain.component';
import { ViewResultsChainComponent } from '../container/view-results-chain/view-results-chain.component';
import { EvaluateComponent } from '../container/evaluate/evaluate.component';
import { EvaluationComponent } from '../container/evaluation/evaluation.component';
import { ViewEvaluationComponent } from '../container/view-evaluation/view-evaluation.component';
const routes: Routes = [
  {
    path: 'view-rri/:id',
    component: ViewRRIComponent,
    data: {
      title: 'Rapid Result Initiative [RRI] / Projects',
      permissions: {
        only: ['USER_MANAGER','VIEWER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'weekly-reports/:id',
    component: WeeklyReportsComponent,
    data: {
      title: 'Weekly Reports',
      permissions: {
        only: ['USER_MANAGER','VIEWER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'workplan/:id',
    component: WorkplanComponent,
    data: {
      title: 'Workplan',
      permissions: {
        only: ['USER_MANAGER','VIEWER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'result-chain/:id',
    component: ResultChainComponent,
    data: {
      title: 'Result Chain',
      permissions: {
        only: ['USER_MANAGER','VIEWER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'view-results-chain',
    component: ViewResultsChainComponent,
    data: {
      title: 'View Result Chain',
      permissions: {
        only: ['USER_MANAGER','VIEWER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'evaluate/:id',
    component: EvaluateComponent,
    data: {
      title: 'Evaluate',
      permissions: {
        only: ['USER_MANAGER','VIEWER','EVALUATOR'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'evaluation',
    component: EvaluationComponent,
    data: {
      title: 'Evaluation',
      permissions: {
        only: ['USER_MANAGER','VIEWER','EVALUATOR'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'view-evaluation/:id',
    component: ViewEvaluationComponent,
    data: {
      title: 'View Evaluation',
      permissions: {
        only: ['USER_MANAGER','VIEWER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericsRoutingModule { }
