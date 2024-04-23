import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { QuoteReportComponent } from '../container/requests/main.component';
import { TransportReportComponent } from '../container/transport/main.component';
const routes: Routes = [

  {
    path: 'requests',
    component: QuoteReportComponent,
    data: {
      title: 'Travel Requests Report',
      permissions: {
        only: ['USER_MANAGER','ADMINISTRATOR','MMD','VIEWER','HOD','SLT', 'CEO', 'HOF'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard]
  },
  {
    path: 'transport',
    component: TransportReportComponent,
    data: {
      title: 'Transport Schedules',
      permissions: {
        only: ['USER_MANAGER','ADMINISTRATOR','MMD','VIEWER','HOD','SLT', 'CEO', 'HOF'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
