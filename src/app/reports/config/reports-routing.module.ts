import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { ViewEvaluationComponent } from '../container/view-evaluation/view-evaluation.component';
import { GoalsReportComponent } from '../container/goals/goals.component';
import { ProjectsReportComponent } from '../container/projects/goals.component';
const routes: Routes = [
  {
    path: 'evaluation',
    component: ViewEvaluationComponent,
    data: {
      title: 'Evaluation Report',
      permissions: {
        only: ['USER_MANAGER','VIEWER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'goals',
    component: GoalsReportComponent,
    data: {
      title: 'Goals Report',
      permissions: {
        only: ['USER_MANAGER','VIEWER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'projects',
    component: ProjectsReportComponent,
    data: {
      title: 'Projects Report',
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
export class ReportsRoutingModule { }
