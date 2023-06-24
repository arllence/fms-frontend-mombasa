import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { ViewRRIComponent } from '../container/view-rri/view-rri.component';
import { WeeklyReportsComponent } from '../container/weekly-reports/weekly-reports.component';
import { WorkplanComponent } from '../container/workplan/workplan.component';
import { ResultChainComponent } from '../container/result-chain/result-chain.component';
const routes: Routes = [
  {
    path: 'view-rri/:id',
    component: ViewRRIComponent,
    data: {
      title: 'RRI',
      permissions: {
        only: ['USER_MANAGER'],
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
        only: ['USER_MANAGER'],
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
        only: ['USER_MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'result-chain/:id',
    component: ResultChainComponent,
    data: {
      title: 'result-chain',
      permissions: {
        only: ['USER_MANAGER'],
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
